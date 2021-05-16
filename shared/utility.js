export const tokenExtracter = (req) => {
  const token = req.header.authorization;
  return token;
};
