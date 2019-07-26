
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '',
      database: 'bancari',
    },
    migrations: {
      directory: __dirname + '/migrations',
    },
  },
  //   development: {
  //   client: 'mysql',
  //   connection: {
  //     host: '127.0.0.1',
  //     user: 'root',
  //     password: '',
  //     database: 'bancari',
  //   },
  //   migrations: {
  //     directory: __dirname + '/migrations',
  //   },
  // },

  //   production: {
  //   client: 'mysql',
  //   connection: {
  //     host: 'us-cdbr-iron-east-02.cleardb.net',
  //     database: 'heroku_7bc1b53f7100315',
  //     user: 'badc4d7ee11162',
  //     password: 'eec6ebc1'
  //   },
  //   migrations: {
  //     directory: __dirname + '/migrations',
  //   },
  // }



  production: {
    client: 'pg',
    connection: {
      host: 'bancari.c9tznxtz79mr.us-east-1.rds.amazonaws.com',
      database: 'bancari',
      user: 'postgres',
      port: 5432,
      password: 'QDJwdIhN8cC1MOsDLHv7'
    },
    migrations: {
      directory: __dirname + '/migrations',
    }
  }

}

