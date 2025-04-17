import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {FormSection, FormSubmitButton} from '../index';
import {generateFormSchema} from '../../utils/form';
import {findAll} from '../../services/AbilityService';
import {findAllCategories} from '../../services/CategoryService';
import {findUserAuthenticated} from '../../../AuthService';
import {findByUid, updateUser} from '../../services/UserService';
import {showMessage} from 'react-native-flash-message';
import { TextInput,View,ActivityIndicator } from 'react-native';
import { colors } from '../../constants/colors';
import ButtonMoreAbilities from '../buttonMoreAbilities';

const Form = ({navigation}) => {
  const [formData, setFormData] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userAbilities, setUserAbilities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    findAll().then(abilities => setAbilities(abilities));
    findAllCategories().then(categories => setCategories(categories));
  }, []);

  useEffect(() => {
    const userAbilitiesFunc = async () => {
      let userAuthenticated = await findUserAuthenticated();
      let user = await findByUid(userAuthenticated.uid);
      setUserAbilities(user.abilities);
      setFormData(user.abilities);
    };
    userAbilitiesFunc();
  }, []);

  const formSections = useMemo(
    () => generateFormSchema(categories, abilities),
    [categories, abilities],
  );

  const onAptitudePress = useCallback(
    aptitudeName => {
      const exists = formData.includes(aptitudeName);
      setFormData(
        exists
          ? formData.filter(element => element !== aptitudeName)
          : [...formData, aptitudeName],
      );
    },
    [formData],
  );

  const onSubmit = useCallback(() => {
    const userAuthenticated = findUserAuthenticated();
    const user = {
      uid: userAuthenticated.uid,
      abilities: formData,
    };
    updateUser(user);
    showMessage({
      message: 'Usuario cargado correctamente',
      description: 'Tus datos se cargaron con éxito.',
      type: 'success',
      icon: 'auto',
    });
    navigation.navigate('Home');
  }, [formData]);

  return (
    <>
      {abilities.length === 0 || categories.length === 0 ? (
        <ActivityIndicator color={colors.tinworkBlue} size='large'/>
      ) : (
        <>
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <TextInput
              placeholder="Buscar habilidad o categoría..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 10,
                borderColor: '#ccc',
                borderWidth: 1,
                marginBottom: 10,
              }}
            />
          </View>
  
          {formSections.map(section => {
            const matchesCategory = section.name
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
  
            const filteredAbilities = section.abilities.filter(a =>
              a.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
  
            if (
              matchesCategory ||
              filteredAbilities.length > 0 ||
              searchTerm.trim() === ''
            ) {
              return (
                <FormSection
                  title={section.name}
                  aptitudes={
                    matchesCategory ? section.abilities : filteredAbilities
                  }
                  key={section.id}
                  onAptitudePress={onAptitudePress}
                  userAbilities={userAbilities}
                />
              );
            }
  
            return null;
          })}
  
          <View style={{width:'90%', alignSelf:'center'}} >
           <ButtonMoreAbilities
                    buttonStyle={true}
                    titleStyle={true}
                    title={/*`+${minAbilities}`*/"Guardar habilidades"}
                    onPress={()=>onSubmit()}
                  />
          </View>
        </>
      )}
    </>
  )};

export default Form;
