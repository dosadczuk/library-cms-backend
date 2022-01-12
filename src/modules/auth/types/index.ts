export type JwtPayload = {
  username: string;
  sub: number; // userId
  role: string;
  firstName: string;
  lastName: string;
};
