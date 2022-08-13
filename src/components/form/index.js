import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {FormSection, FormSubmitButton} from '../index';
import {generateFormSchema} from '../../utils/form';
import {findAll} from '../../services/AbilityService';
import {findAllCategories} from '../../services/CategoryService';
import {findUserAuthenticated} from '../../../AuthService';
import {create} from '../../services/UserService';
import {showMessage, hideMessage} from 'react-native-flash-message';

const Form = () => {
  const [formData, setFormData] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    findAll().then(abilities => setAbilities(abilities));
    findAllCategories().then(categories => setCategories(categories));
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
      name: userAuthenticated.displayName,
      email: userAuthenticated.email,
      uid: userAuthenticated.uid,
      abilities: formData,
    };
    showMessage({
      message: 'Aptitudes Actualizadas',
      type: 'success',
    });
    create(user);
  }, [formData]);

  return (
    <>
      {formSections.map(section => (
        <FormSection
          title={section.name}
          aptitudes={section.abilities}
          key={section.id}
          onAptitudePress={onAptitudePress}
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
