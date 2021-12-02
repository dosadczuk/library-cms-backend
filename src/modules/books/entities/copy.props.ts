export const METADATA = {
  id: { title: 'Identyfikator rekordu' },
  number: { title: 'Numer' },
  createdAt: { title: 'Moment utworzenia rekordu' },
  modifiedAt: { title: 'Moment modyfikacji rekordu' },
  removedAt: { title: 'Moment usunięcie rekordu' },
};

export const CONSTRAINTS = {
  number: {
    maxLength: 50,
    nullable: false,
  },
};
