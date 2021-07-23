export const tokenExtracter = (req) => {
  const token = req.header.authorization;
  return token;
};

export const getPagination = (req) => {
  const { page = 0, size = 20 } = req.query;

  return { page: parseInt(page), size: parseInt(size) };
};
