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
    logo: 'http://myprolms.tom.madev3.ovh/storage/organizations/logo/9b659b3c-f2a9-4538-b45c-06c5894bb34e.png',
    name: 'Organisation de test',
    isActive: true,
    address: '14 Rue des Tadornes 34750 Villeneuve-l\u00e8s-Maguelone France',
    city: 'Villeneuve-l\u00e8s-Maguelone',
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
