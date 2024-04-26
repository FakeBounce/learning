export const defaultConnectedUser = {
  id: 3,
  login: 'thomascarrillo',
  email: 'tom@market-academy.com',
  firstname: 'Tomme',
  lastname: 'LAPOMME',
  isSuperAdmin: false,
  isClientAdmin: true,
  currentOrganization: {
    id: 3,
    logo: '/assets/shape_avatar.svg',
    name: 'Organisation de test',
    isActive: true,
    address: '14 Rue des Tadornes 34750 Villeneuve-lès-Maguelone France',
    city: 'Villeneuve-lès-Maguelone',
    useDoubleAuth: false,
    isMain: false
  },
  permissions: [
    {
      id: 3,
      name: 'see_groups'
    }
  ]
};
