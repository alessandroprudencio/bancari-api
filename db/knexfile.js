module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'bancari',
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'us-cdbr-iron-east-02.cleardb.net',
      database: 'heroku_7bc1b53f7100315',
      user: 'badc4d7ee11162',
      password: 'eec6ebc1'
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
  }

};
