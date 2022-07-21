export const generateFormSchema = (categories, abilities) => {
  return categories.map(category => ({
    ...category,
    abilities: abilities.filter(ability => ability.category === category.name),
  }));
};
