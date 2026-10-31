const helmet = require('helmet');

const setupSecurity = (app) => {
  app.use(helmet());
};

module.exports = setupSecurity;
