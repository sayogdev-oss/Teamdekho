const mysql = require('mysql2/promise');

// Debug: check if env vars are loading
console.log('[TeamDekho DB] Host:', process.env.TIDB_HOST);
console.log('[TeamDekho DB] Port:', process.env.TIDB_PORT);
console.log('[TeamDekho DB] User:', process.env.TIDB_USER);
console.log('[TeamDekho DB] Database:', process.env.TIDB_DATABASE);

const pool = mysql.createPool({
  host: process.env.TIDB_HOST || 'gateway01.ap-southeast-1.prod.aws.tidbcloud.com',
  port: parseInt(process.env.TIDB_PORT) || 4000,
  user: process.env.TIDB_USER || '2AVGFU4Z3PvSJab.root',
  password: process.env.TIDB_PASSWORD || '7zvAybO7GSxB21LM',
  database: process.env.TIDB_DATABASE || 'test',
  ssl: { rejectUnauthorized: true },
  waitForConnections: true,
  connectionLimit: 10,
  timezone: '+00:00',
  connectTimeout: 15000,
});

pool.getConnection()
  .then(conn => {
    console.log('[TeamDekho DB] TiDB connected successfully!');
    conn.release();
  })
  .catch(err => {
    console.error('[TeamDekho DB] Connection failed:', err.message);
    console.error('[TeamDekho DB] Error code:', err.code);
  });

module.exports = pool;
