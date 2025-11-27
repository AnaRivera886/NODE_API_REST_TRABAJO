module.exports = {

  development: {
    client: 'pg', // O 'mysql', 'sqlite3', etc.
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  // ... (otras configuraciones)

};