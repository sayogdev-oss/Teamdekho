require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const pool = require('../db/connection');

// Generate Zoom-style 10-digit Personal Meeting ID
function generatePersonalMeetingId() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// Generate personal room slug from name
function generateRoomSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 50) + '-' + Math.random().toString(36).substring(2, 6);
}

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value;
    const name = profile.displayName;
    const avatar = profile.photos[0]?.value;
    const google_id = profile.id;

    // Check if host exists in td_hosts
    const [rows] = await pool.query(
      'SELECT * FROM td_hosts WHERE google_id = ?',
      [google_id]
    );

    if (rows.length === 0) {
      // New host - generate permanent Meeting ID and room slug
      let personal_meeting_id;
      let isUnique = false;

      // Ensure unique Meeting ID
      while (!isUnique) {
        personal_meeting_id = generatePersonalMeetingId();
        const [existing] = await pool.query(
          'SELECT id FROM td_hosts WHERE personal_meeting_id = ?',
          [personal_meeting_id]
        );
        if (existing.length === 0) isUnique = true;
      }

      const personal_room_slug = generateRoomSlug(name);

      // Insert new host
      await pool.query(
        `INSERT INTO td_hosts 
        (google_id, email, name, avatar, plan_id, personal_meeting_id, personal_room_slug, last_login) 
        VALUES (?, ?, ?, ?, 1, ?, ?, NOW())`,
        [google_id, email, name, avatar, personal_meeting_id, personal_room_slug]
      );

      // Create default host settings
      const [newHost] = await pool.query(
        'SELECT * FROM td_hosts WHERE google_id = ?',
        [google_id]
      );

      await pool.query(
        `INSERT INTO td_host_settings (host_id) VALUES (?)`,
        [newHost[0].id]
      );

      // Log security event
      await pool.query(
        `INSERT INTO td_security_log (event_type, host_id, actor_name, actor_email) VALUES ('login', ?, ?, ?)`,
        [newHost[0].id, name, email]
      );

      console.log('[TeamDekho Auth] New host registered:', email, '| Meeting ID:', personal_meeting_id);
      return done(null, newHost[0]);

    } else {
      // Existing host - update last login
      await pool.query(
        'UPDATE td_hosts SET last_login = NOW() WHERE google_id = ?',
        [google_id]
      );

      // Log security event
      await pool.query(
        `INSERT INTO td_security_log (event_type, host_id, actor_name, actor_email) VALUES ('login', ?, ?, ?)`,
        [rows[0].id, name, email]
      );

      console.log('[TeamDekho Auth] Host login:', email, '| Meeting ID:', rows[0].personal_meeting_id);
      return done(null, rows[0]);
    }

  } catch (err) {
    console.error('[TeamDekho Auth] Error:', err.message);
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const [rows] = await pool.query(
      `SELECT h.*, p.name as plan_name, p.max_participants, p.max_duration_minutes,
       p.can_record, p.can_schedule, p.can_passcode, p.can_waiting_room,
       p.can_breakout_rooms, p.can_rtmp_stream
       FROM td_hosts h
       LEFT JOIN td_plans p ON h.plan_id = p.id
       WHERE h.id = ?`,
      [id]
    );
    done(null, rows[0] || null);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
