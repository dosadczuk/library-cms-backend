export const METADATA = {
  id: { title: 'Identyfikator rekordu' },
  name: { title: 'Nazwa' },
  createdAt: { title: 'Moment utworzenia rekordu' },
  modifiedAt: { title: 'Moment modyfikacji rekordu' },
};

export const CONSTRAINTS = {
  name: {
    maxLength: 250,
    nullable: false,
  },
};
