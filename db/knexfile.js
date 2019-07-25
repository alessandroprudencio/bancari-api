
module.exports = {
  
  development:{
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'root',
      database: 'bancari',  
    },
    pool: {
      afterCreate: function (conn, done) {
        // in this example we use pg driver's connection API
        conn.query('SET timezone="UTC-3";', function (err) {
          if (err) {
            // first query failed, return error and don't try to make next query
            done(err, conn);
          } else {
            // do the second query...
            conn.query('SELECT set_limit(0.01);', function (err) {
              // if err is not falsy, connection is discarded from pool
              // if connection aquire was triggered by a query the error is passed to query promise
              done(err, conn);
            });
          }
        });
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
      password: '2860cbf4f11497d69e011e4c37e9fb6432c64ff295ffb593307a69434e7c273b',      
    },
    pool: {
      afterCreate: function (conn, done) {
        // in this example we use pg driver's connection API
        conn.query('SET timezone="UTC-3";', function (err) {
          if (err) {
            // first query failed, return error and don't try to make next query
            done(err, conn);
          } else {
            // do the second query...
            conn.query('SELECT set_limit(0.01);', function (err) {
              // if err is not falsy, connection is discarded from pool
              // if connection aquire was triggered by a query the error is passed to query promise
              done(err, conn);
            });
          }
        });
      },
    migrations: {
      directory: __dirname + '/migrations',
    }
  }
  
}

