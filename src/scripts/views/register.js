var tplRegister = require('../templates/register.string');
SPA.defineView('register', {
  html:tplRegister,
  plugins: ['delegated'],
})