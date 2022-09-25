import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {FormSection, FormSubmitButton} from '../index';
import {generateFormSchema} from '../../utils/form';
import {findAll} from '../../services/AbilityService';
import {findAllCategories} from '../../services/CategoryService';
import {findUserAuthenticated} from '../../../AuthService';
import {create, findByUid, updateUser} from '../../services/UserService';
import {showMessage, hideMessage} from 'react-native-flash-message';

const Form = () => {
  const [formData, setFormData] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userAbilities, setUserAbilities] = useState([]);
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
      message: 'Habilidades Actualizadas',
      type: 'success',
    });
  }, [formData]);

  return (
    <>
      {formSections.map(section => (
        <FormSection
          title={section.name}
          aptitudes={section.abilities}
          key={section.id}
          onAptitudePress={onAptitudePress}
          userAbilities={userAbilities}
        />
      ))}
      <FormSubmitButton
        onSubmit={onSubmit}
        disabled={formData.length > 0 ? false : true}
      />
    </>
  );
};

export default Form;
