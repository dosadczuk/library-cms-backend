export const METADATA = {
  id: { title: 'Identyfikator rekordu' },
  name: { title: 'Nazwa' },
  path: { title: 'Ścieżka na dysku' },
  size: { title: 'Rozmiar' },
  mime: { title: 'Typ MIME' },
};

export const CONSTRAINTS = {
  name: {
    nullable: false,
    maxLength: 150,
  },
  path: {
    nullable: false,
    maxLength: 250,
  },
  size: { nullable: false },
  mime: {
    nullable: false,
    maxLength: 50,
  },
};
