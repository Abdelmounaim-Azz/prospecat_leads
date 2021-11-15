// metered subscription.
const { v4: uuid } = require("uuid");
require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// You need to write some   business logic before creating the
// usage record. Pull a record of a customer from your database
// and extract the customer's Stripe Subscription Item ID and
// usage for the day.
const subscriptionItemID = "";
// The usage number you've been keeping track of in your own database for the last 24 hours.
const usageQuantity = 100;

// The idempotency key allows you to retry this usage record call if it fails.
const idempotencyKey = uuid();
const timestamp = parseInt(Date.now() / 1000);

(async function reportUsage() {
  try {
    await stripe.subscriptionItems.createUsageRecord(
      subscriptionItemID,
      {
        quantity: usageQuantity,
        timestamp: timestamp,
        action: "set",
      },
      {
        idempotencyKey,
      }
    );
  } catch (error) {
    console.error(
      `Usage report failed for item ID ${subscriptionItemID} with idempotency key ${idempotencyKey}: ${error.toString()}`
    );
  }
})();
