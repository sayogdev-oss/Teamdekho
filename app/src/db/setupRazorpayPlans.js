require("dotenv").config();
const Razorpay = require("razorpay");
const pool = require("./connection"); // Use the existing pool from connection.js

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function run() {
  let conn; // Declare conn outside try-catch for finally block access
  try {
    conn = await pool.getConnection(); // Get a connection from the pool

    const [plans] = await conn.execute( // Use conn.execute instead of pool.execute
      `SELECT id, name, price_monthly, razorpay_plan_id FROM td_plans WHERE id IN (2,3)`
    );

    for (const plan of plans) {
      if (plan.razorpay_plan_id) {
        console.log(`[Razorpay Setup] Skipping ${plan.name} — already has plan ID: ${plan.razorpay_plan_id}`);
        continue;
      }

      console.log(`[Razorpay Setup] Attempting to create Razorpay plan for ${plan.name}...`);
      const razorpayPlan = await razorpay.plans.create({
        period: 'monthly',
        interval: 1,
        item: {
          name: `TeamDekho ${plan.name}`,
          amount: plan.price_monthly * 100, // paise
          currency: 'INR',
          description: `TeamDekho ${plan.name} Plan - Monthly Subscription`,
        },
      });

      await conn.execute( // Use conn.execute instead of pool.execute
        `UPDATE td_plans SET razorpay_plan_id = ? WHERE id = ?`,
        [razorpayPlan.id, plan.id]
      );

      console.log(`[Razorpay Setup] Created plan for ${plan.name}: ${razorpayPlan.id}`);
    }

    console.log('[Razorpay Setup] Done.');
    process.exit(0);
  } catch (err) {
    console.error('[Razorpay Setup] Error:', err); // Log full error object
    process.exit(1);
  } finally {
    if (conn) conn.release(); // Release connection in finally block
  }
}

run().catch((err) => {
  console.error('[Razorpay Setup] Uncaught Error:', err); // Catch any errors from run() itself
  process.exit(1);
});
