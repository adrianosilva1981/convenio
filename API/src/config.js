const env = require('../environments');

global.SALT_KEY = 'ft45l1ny-sifv-tk54-h4r6-fg54v7r8ds9c';

module.exports = {
  production: env.production,
  connectionString: env.db_connection,
  emailString: {
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
      user: 'AKIAJKTUK4E6NZ3ZPLKQ',
      pass: 'AtH3So9No7BuLs88JuSSsGiihByGNoQYcKIojcb2kyaw'
    }
  }
};
