const pool = require('./connection');

async function initializeDatabase() {
  const conn = await pool.getConnection();
  try {
    console.log('[TeamDekho DB] Initializing tables...');

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_plans (
        id INT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price_monthly INT NOT NULL DEFAULT 0,
        price_yearly INT NOT NULL DEFAULT 0,
        max_participants INT NOT NULL DEFAULT 50,
        max_duration_minutes INT DEFAULT 60,
        max_recordings INT DEFAULT 0,
        recording_storage_gb INT DEFAULT 0,
        can_record BOOLEAN DEFAULT false,
        can_schedule BOOLEAN DEFAULT false,
        can_passcode BOOLEAN DEFAULT false,
        can_waiting_room BOOLEAN DEFAULT true,
        can_breakout_rooms BOOLEAN DEFAULT false,
        can_rtmp_stream BOOLEAN DEFAULT false,
        can_whiteboard BOOLEAN DEFAULT true,
        can_file_share BOOLEAN DEFAULT true,
        can_transcription BOOLEAN DEFAULT false,
        can_ai_features BOOLEAN DEFAULT false,
        can_custom_branding BOOLEAN DEFAULT false,
        features JSON,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.query(`
      INSERT IGNORE INTO td_plans 
      (id,name,price_monthly,price_yearly,max_participants,max_duration_minutes,max_recordings,recording_storage_gb,can_record,can_schedule,can_passcode,can_waiting_room,can_breakout_rooms,can_rtmp_stream,can_whiteboard,can_file_share,can_transcription,can_ai_features,can_custom_branding,features,is_active,created_at)
      VALUES
      (1,'free',0,0,50,60,0,0,false,false,false,true,false,false,true,true,false,false,false,NULL,true,NOW()),
      (2,'starter',99,990,100,90,5,1,true,true,true,true,false,false,true,true,false,false,false,NULL,true,NOW()),
      (3,'basic',199,1990,250,180,20,5,true,true,true,true,true,false,true,true,true,false,false,NULL,true,NOW()),
      (4,'pro',299,2990,500,NULL,100,20,true,true,true,true,true,true,true,true,true,true,false,NULL,true,NOW()),
      (5,'business',699,6990,1000,NULL,-1,-1,true,true,true,true,true,true,true,true,true,true,true,NULL,true,NOW())
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_hosts (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        google_id VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        avatar VARCHAR(500),
        plan_id INT DEFAULT 1,
        personal_meeting_id VARCHAR(11) UNIQUE,
        personal_room_slug VARCHAR(255) UNIQUE,
        passcode VARCHAR(50) DEFAULT NULL,
        timezone VARCHAR(100) DEFAULT 'Asia/Kolkata',
        is_active BOOLEAN DEFAULT true,
        is_verified BOOLEAN DEFAULT false,
        paid_at TIMESTAMP NULL,
        plan_expires_at TIMESTAMP NULL,
        last_login TIMESTAMP NULL,
        total_meetings INT DEFAULT 0,
        total_minutes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (plan_id) REFERENCES td_plans(id)
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_host_settings (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        host_id VARCHAR(36) UNIQUE NOT NULL,
        waiting_room_enabled BOOLEAN DEFAULT true,
        chat_enabled BOOLEAN DEFAULT true,
        private_chat_enabled BOOLEAN DEFAULT false,
        file_sharing_enabled BOOLEAN DEFAULT true,
        whiteboard_enabled BOOLEAN DEFAULT true,
        screen_share_enabled BOOLEAN DEFAULT true,
        recording_enabled BOOLEAN DEFAULT false,
        host_only_recording BOOLEAN DEFAULT true,
        rtmp_enabled BOOLEAN DEFAULT false,
        transcription_enabled BOOLEAN DEFAULT false,
        ai_chat_enabled BOOLEAN DEFAULT false,
        raise_hand_enabled BOOLEAN DEFAULT true,
        reactions_enabled BOOLEAN DEFAULT true,
        poll_enabled BOOLEAN DEFAULT true,
        breakout_rooms_enabled BOOLEAN DEFAULT false,
        mic_on_entry BOOLEAN DEFAULT false,
        video_on_entry BOOLEAN DEFAULT false,
        auto_admit_google BOOLEAN DEFAULT false,
        max_participants INT DEFAULT 50,
        lock_on_start BOOLEAN DEFAULT false,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (host_id) REFERENCES td_hosts(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_scheduled (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        host_id VARCHAR(36) NOT NULL,
        meeting_number VARCHAR(11) NOT NULL,
        topic VARCHAR(500) NOT NULL,
        description TEXT DEFAULT NULL,
        room_slug VARCHAR(255) NOT NULL,
        passcode VARCHAR(50) DEFAULT NULL,
        scheduled_at TIMESTAMP NOT NULL,
        duration_minutes INT DEFAULT 60,
        timezone VARCHAR(100) DEFAULT 'Asia/Kolkata',
        recurrence ENUM('none','daily','weekly','monthly') DEFAULT 'none',
        waiting_room BOOLEAN DEFAULT true,
        status ENUM('scheduled','started','ended','cancelled') DEFAULT 'scheduled',
        invite_link VARCHAR(500),
        email_sent BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (host_id) REFERENCES td_hosts(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_meetings (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        host_id VARCHAR(36) NOT NULL,
        scheduled_id VARCHAR(36) DEFAULT NULL,
        meeting_number VARCHAR(11) NOT NULL,
        topic VARCHAR(500) DEFAULT 'Instant Meeting',
        room_slug VARCHAR(255) NOT NULL,
        passcode VARCHAR(50) DEFAULT NULL,
        status ENUM('waiting','live','ended') DEFAULT 'waiting',
        waiting_room_enabled BOOLEAN DEFAULT true,
        lock_status BOOLEAN DEFAULT false,
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ended_at TIMESTAMP NULL,
        duration_seconds INT DEFAULT 0,
        peak_participants INT DEFAULT 0,
        total_participants INT DEFAULT 0,
        total_messages INT DEFAULT 0,
        total_files_shared INT DEFAULT 0,
        is_recorded BOOLEAN DEFAULT false,
        rtmp_streamed BOOLEAN DEFAULT false,
        whiteboard_used BOOLEAN DEFAULT false,
        poll_used BOOLEAN DEFAULT false,
        transcription_used BOOLEAN DEFAULT false,
        breakout_used BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (host_id) REFERENCES td_hosts(id) ON DELETE CASCADE,
        FOREIGN KEY (scheduled_id) REFERENCES td_scheduled(id) ON DELETE SET NULL
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_participants (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        meeting_id VARCHAR(36) NOT NULL,
        host_id VARCHAR(36) NOT NULL,
        google_id VARCHAR(255) DEFAULT NULL,
        display_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) DEFAULT NULL,
        avatar VARCHAR(500) DEFAULT NULL,
        joined_as ENUM('host','google','guest') DEFAULT 'guest',
        joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        left_at TIMESTAMP NULL,
        duration_seconds INT DEFAULT 0,
        was_admitted BOOLEAN DEFAULT false,
        was_ejected BOOLEAN DEFAULT false,
        was_banned BOOLEAN DEFAULT false,
        ip_address VARCHAR(50) DEFAULT NULL,
        country VARCHAR(100) DEFAULT NULL,
        city VARCHAR(100) DEFAULT NULL,
        device_type ENUM('desktop','mobile','tablet','unknown') DEFAULT 'unknown',
        os VARCHAR(100) DEFAULT NULL,
        browser VARCHAR(100) DEFAULT NULL,
        audio_on BOOLEAN DEFAULT false,
        video_on BOOLEAN DEFAULT false,
        screen_shared BOOLEAN DEFAULT false,
        raised_hand_count INT DEFAULT 0,
        FOREIGN KEY (meeting_id) REFERENCES td_meetings(id) ON DELETE CASCADE,
        FOREIGN KEY (host_id) REFERENCES td_hosts(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_waiting_room (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        meeting_id VARCHAR(36) NOT NULL,
        display_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) DEFAULT NULL,
        google_id VARCHAR(255) DEFAULT NULL,
        ip_address VARCHAR(50) DEFAULT NULL,
        requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status ENUM('waiting','admitted','rejected','left') DEFAULT 'waiting',
        acted_by VARCHAR(36) DEFAULT NULL,
        acted_at TIMESTAMP NULL,
        FOREIGN KEY (meeting_id) REFERENCES td_meetings(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_chat_messages (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        meeting_id VARCHAR(36) NOT NULL,
        sender_participant_id VARCHAR(36) DEFAULT NULL,
        sender_name VARCHAR(255) NOT NULL,
        sender_type ENUM('host','google','guest','ai') DEFAULT 'guest',
        message TEXT NOT NULL,
        message_type ENUM('text','file','image','system','ai') DEFAULT 'text',
        is_private BOOLEAN DEFAULT false,
        to_participant_id VARCHAR(36) DEFAULT NULL,
        to_name VARCHAR(255) DEFAULT NULL,
        has_markdown BOOLEAN DEFAULT false,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (meeting_id) REFERENCES td_meetings(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_shared_files (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        meeting_id VARCHAR(36) NOT NULL,
        sender_participant_id VARCHAR(36) DEFAULT NULL,
        sender_name VARCHAR(255) NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_size_bytes BIGINT DEFAULT 0,
        file_type VARCHAR(100) DEFAULT NULL,
        sent_to ENUM('all','private') DEFAULT 'all',
        to_participant_id VARCHAR(36) DEFAULT NULL,
        sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (meeting_id) REFERENCES td_meetings(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_polls (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        meeting_id VARCHAR(36) NOT NULL,
        created_by VARCHAR(36) DEFAULT NULL,
        question TEXT NOT NULL,
        options JSON NOT NULL,
        is_anonymous BOOLEAN DEFAULT false,
        status ENUM('active','ended') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ended_at TIMESTAMP NULL,
        FOREIGN KEY (meeting_id) REFERENCES td_meetings(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_poll_votes (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        poll_id VARCHAR(36) NOT NULL,
        participant_id VARCHAR(36) DEFAULT NULL,
        participant_name VARCHAR(255) NOT NULL,
        selected_option INT NOT NULL,
        voted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (poll_id) REFERENCES td_polls(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_recordings (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        meeting_id VARCHAR(36) NOT NULL,
        host_id VARCHAR(36) NOT NULL,
        recorded_by VARCHAR(36) DEFAULT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        file_size_mb DECIMAL(10,2) DEFAULT 0,
        duration_seconds INT DEFAULT 0,
        storage_type ENUM('local','s3','cloud') DEFAULT 'local',
        status ENUM('processing','ready','failed','deleted') DEFAULT 'processing',
        download_url VARCHAR(500) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NULL,
        deleted_at TIMESTAMP NULL,
        FOREIGN KEY (meeting_id) REFERENCES td_meetings(id) ON DELETE CASCADE,
        FOREIGN KEY (host_id) REFERENCES td_hosts(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_rtmp_streams (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        meeting_id VARCHAR(36) NOT NULL,
        host_id VARCHAR(36) NOT NULL,
        platform ENUM('youtube','facebook','twitch','custom') DEFAULT 'custom',
        stream_url VARCHAR(500) NOT NULL,
        status ENUM('active','ended','failed') DEFAULT 'active',
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ended_at TIMESTAMP NULL,
        duration_seconds INT DEFAULT 0,
        FOREIGN KEY (meeting_id) REFERENCES td_meetings(id) ON DELETE CASCADE,
        FOREIGN KEY (host_id) REFERENCES td_hosts(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_whiteboard_sessions (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        meeting_id VARCHAR(36) NOT NULL,
        started_by VARCHAR(36) DEFAULT NULL,
        snapshot_url VARCHAR(500) DEFAULT NULL,
        actions_count INT DEFAULT 0,
        started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ended_at TIMESTAMP NULL,
        FOREIGN KEY (meeting_id) REFERENCES td_meetings(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_transcriptions (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        meeting_id VARCHAR(36) NOT NULL,
        participant_id VARCHAR(36) DEFAULT NULL,
        speaker_name VARCHAR(255) NOT NULL,
        text TEXT NOT NULL,
        language VARCHAR(50) DEFAULT 'hi-IN',
        timestamp_seconds INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (meeting_id) REFERENCES td_meetings(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_breakout_rooms (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        parent_meeting_id VARCHAR(36) NOT NULL,
        room_name VARCHAR(255) NOT NULL,
        room_slug VARCHAR(255) NOT NULL,
        duration_minutes INT DEFAULT 0,
        status ENUM('active','ended') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        ended_at TIMESTAMP NULL,
        FOREIGN KEY (parent_meeting_id) REFERENCES td_meetings(id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_payments (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        host_id VARCHAR(36) NOT NULL,
        plan_id INT NOT NULL,
        amount INT NOT NULL,
        currency VARCHAR(10) DEFAULT 'INR',
        billing_cycle ENUM('monthly','yearly') DEFAULT 'monthly',
        payment_gateway VARCHAR(50) DEFAULT 'razorpay',
        gateway_order_id VARCHAR(255),
        gateway_payment_id VARCHAR(255) UNIQUE,
        status ENUM('pending','success','failed','refunded') DEFAULT 'pending',
        paid_at TIMESTAMP NULL,
        plan_start TIMESTAMP NULL,
        plan_end TIMESTAMP NULL,
        invoice_url VARCHAR(500) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (host_id) REFERENCES td_hosts(id) ON DELETE CASCADE,
        FOREIGN KEY (plan_id) REFERENCES td_plans(id)
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_security_log (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        event_type ENUM(
          'login','logout','room_join','room_leave',
          'passcode_fail','waiting_admit','waiting_reject',
          'participant_ban','participant_eject',
          'room_lock','room_unlock',
          'plan_upgrade','plan_downgrade',
          'payment_success','payment_failed',
          'recording_start','recording_stop',
          'rtmp_start','rtmp_stop',
          'file_shared','poll_created'
        ) NOT NULL,
        host_id VARCHAR(36) DEFAULT NULL,
        meeting_id VARCHAR(36) DEFAULT NULL,
        actor_name VARCHAR(255) DEFAULT NULL,
        actor_email VARCHAR(255) DEFAULT NULL,
        ip_address VARCHAR(50) DEFAULT NULL,
        country VARCHAR(100) DEFAULT NULL,
        user_agent VARCHAR(500) DEFAULT NULL,
        details JSON DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await conn.query(`
      CREATE TABLE IF NOT EXISTS td_admin_logs (
        id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
        action VARCHAR(100) NOT NULL,
        admin_id VARCHAR(36) DEFAULT NULL,
        target_host_id VARCHAR(36) DEFAULT NULL,
        details JSON DEFAULT NULL,
        ip_address VARCHAR(50) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('[TeamDekho DB] All 19 tables ready!');
  } catch (err) {
    console.error('[TeamDekho DB] Schema error:', err.message);
    throw err;
  } finally {
    conn.release();
  }
}

module.exports = { initializeDatabase };
