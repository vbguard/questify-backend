module.exports = {
  MondoDB: {
    // url: "mongodb://questify:goit34GH@127.0.0.1:27017/questify"
    url: "mongodb://questify:goit34GH@goit.co.ua:27017/questify"
  },
  client: {
    development: {
      url: "http://localhost",
      port: "3000"
    }
  },
  jwt_encryption: process.env.JWT_ENCRYPTION || "jwt_please_change",
  jwt_expiration: process.env.JWT_EXPIRATION || 10000
};
