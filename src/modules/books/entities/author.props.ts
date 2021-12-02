export const METADATA = {
  id: { title: 'Identyfikator rekordu' },
  firstName: { title: 'Imię' },
  lastName: { title: 'Nazwisko' },
  createdAt: { title: 'Moment utworzenia rekordu' },
  modifiedAt: { title: 'Moment modyfikacji rekordu' },
};

export const CONSTRAINTS = {
  firstName: {
    maxLength: 50,
    nullable: false,
  },
  lastName: {
    maxLength: 50,
    nullable: false,
  },
};
