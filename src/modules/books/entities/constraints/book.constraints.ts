export const CONSTRAINTS = {
  isbn: {
    minLength: 10,
    maxLength: 13,
    nullable: false,
  },
  title: {
    maxLength: 255,
    nullable: false,
  },
  issueDate: { nullable: false },
  publisher: { nullable: false },
  authors: { nullable: false },
  type: { nullable: false },
  genre: { nullable: false },
  language: { nullable: false },
  pages: { nullable: false },
  tags: { nullable: false },
  details: { nullable: false },
  copies: { nullable: true },
  ratings: { nullable: true },
};
