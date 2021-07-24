const axios = require("axios");

const HttpClient = (logger) => {
  const post = async ({ url, headers, body }) =>
    new Promise((resolve, reject) => {
      axios
        .post(url, body, { headers })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(convertException(err));
        });
    });

  return { post };
};

const convertException = (err) => {
  return err && err.response && err.response.data ? err.response.data : err;
};

export { HttpClient };
