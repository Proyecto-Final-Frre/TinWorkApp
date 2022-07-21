import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {FormSection, FormSubmitButton} from '../index';
import {generateFormSchema} from '../../utils/form';
import {findAll} from '../../services/AbilityService';
import {findAllCategories} from '../../services/CategoryService';

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
  console.log(formSections);

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
    console.log('hola formData', formData);
    // Aca haces lo que necesites con la data
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
      <FormSubmitButton onSubmit={onSubmit} />
    </>
  );
};

export default Form;
