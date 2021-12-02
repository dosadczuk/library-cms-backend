export const METADATA = {
  id: { title: 'Identyfikator rekordu' },
  value: { title: 'Wartość' },
  comment: { title: 'Komentarz' },
  createdAt: { title: 'Moment utworzenia rekordu' },
  modifiedAt: { title: 'Moment modyfikacji rekordu' },
};

export const CONSTRAINTS = {
  value: { nullable: false },
  comment: { nullable: false },
};
