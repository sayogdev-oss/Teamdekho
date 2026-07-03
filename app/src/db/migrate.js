
const pool = require('./connection');

async function migrate() {
  const conn = await pool.getConnection();
  try {
    console.log('[TeamDekho DB] Starting migration...');
    const [result] = await conn.query(
      "UPDATE td_scheduled SET invite_link = REPLACE(invite_link, 'http://localhost:3010', 'https://teamdekho.com') WHERE invite_link LIKE '%http://localhost:3010%'"
    );
    console.log(`[TeamDekho DB] Migrated ${result.affectedRows} rows in td_scheduled.`);
  } catch (err) {
    console.error('[TeamDekho DB] Migration error:', err.message);
  } finally {
    conn.release();
    process.exit();
  }
}

migrate();
