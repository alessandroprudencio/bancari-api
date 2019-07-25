
module.exports = {
  
  development:{
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'root',
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



  production:{
    client: 'pg',
    connection: {
      host: 'ec2-174-129-29-101.compute-1.amazonaws.com',
      database: 'd69bc587hlphpp',
      user: 'guscabrjqkgezj',
      password: '2860cbf4f11497d69e011e4c37e9fb6432c64ff295ffb593307a69434e7c273b'
    },
    pool: {
      afterCreate: function(connection, callback) {
        connection.query('SET time_zone = "America/Sao_Paulo"', function(err) {
          callback(err, connection);
        });
      }
   },
    migrations: {
      directory: __dirname + '/migrations',
    }
  }
  
}

