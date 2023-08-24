const router = require("express").Router();
const { pool } = require("../database/database");
const authorization = require("../middleware/authorization");
const logWritter = require("../utils/logWritter");

async function ownsRestaurant(restaurantId, user_id) {
  try {
    const restaurant = await pool.query(
      "SELECT * FROM restaurants WHERE owner_id = $1 AND restaurant_id = $2",
      [user_id, restaurantId]
    );

    return !!restaurant.rows.length;
  } catch (err) {
    logWritter(err.message);
    return false;
  }
}

module.exports = ownsRestaurant;
