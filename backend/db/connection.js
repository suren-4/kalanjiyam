// This is a dummy database connection file
// In the actual implementation, Supabase is used instead

const { Pool } = require('pg');

// Configuration that would be used if we weren't using Supabase
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'heritage_portal',
  password: 'password',
  port: 5432,
});

// Note about Supabase usage
console.log('NOTE: This is a dummy database connection. The actual implementation uses Supabase.');
console.log('Supabase connection string: https://hdsnhnhsanfswdlxwhfy.supabase.co');

module.exports = {
  query: (text, params) => pool.query(text, params),
  getClient: () => pool.connect(),
}; 