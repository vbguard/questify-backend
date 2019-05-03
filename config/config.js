module.exports = {
  MondoDB: {
    url: "mongodb://fusion:fusion34GH@vbguard.dev:50023/questify"
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
