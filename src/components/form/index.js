import React, {useCallback, useMemo, useState} from 'react';
import {FormSection, FormSubmitButton} from '../index';
import sections from '../../data/sections.json';
import aptitudes from '../../data/aptitudes.json';
import {generateFormSchema} from '../../utils/form';
import {findUserAuthenticated} from '../../../AuthService';
import {create} from '../../services/UserService';

const Form = () => {
  const [formData, setFormData] = useState([]);

  const formSections = useMemo(
    () => generateFormSchema(sections, aptitudes),
    [],
  );

  const onAptitudePress = useCallback(
    aptitudeId => {
      const exists = formData.includes(aptitudeId);
      setFormData(
        exists
          ? formData.filter(element => element !== aptitudeId)
          : [...formData, aptitudeId],
      );
    },
    [formData],
  );

  const onSubmit = useCallback(() => {
    const userAuthenticated = findUserAuthenticated();

    console.log('user', userAuthenticated);

    console.log('hola formData', formData);
    const user = {
      name: userAuthenticated.displayName,
      email: userAuthenticated.email,
      abilities: formData,
    };

    create(user);
  }, [formData]);

  return (
    <>
      {formSections.map(section => (
        <FormSection
          title={section.title}
          aptitudes={section.aptitudes}
          key={section.id}
          onAptitudePress={onAptitudePress}
        />
      ))}
      <FormSubmitButton onSubmit={onSubmit} />
    </>
  );
};

export default Form;
