
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
      host: 'ec2-54-227-251-33.compute-1.amazonaws.com',
      database: 'd8re6jq1vrl7en',
      user: 'zgvqqwtoynkrxw',
      password: '1e986a87621920c87539ed752bff3ef8ce4124f16beecc3ff8f488fab0c1a8a7'
    },
    migrations: {
      directory: __dirname + '/migrations',
    }
  }
  
}

