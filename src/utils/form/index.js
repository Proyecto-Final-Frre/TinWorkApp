export const generateFormSchema = (sections, aptitudes) =>
  sections.map(section => ({
    ...section,
    aptitudes: aptitudes.filter(aptitude => aptitude.sectionId === section.id),
  }));
