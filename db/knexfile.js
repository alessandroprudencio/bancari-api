module.exports = {

  production: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'bancari',
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
  },

  production: {
    client: 'mysql',
    connection: {
      host:'us-cdbr-iron-east-02.cleardb.net',
      database: 'heroku_7bc1b53f7100315',
      user: 'badc4d7ee11162',
      password: 'eec6ebc1'
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};
