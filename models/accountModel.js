// models/accountModel.js

const db = require("../database/");

const accountModel = {
  getAccountByEmail: async (email) => {
    // Replace this with actual database query logic
    const query = 'SELECT * FROM account WHERE account_email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  },
  // Add other methods as needed
};

module.exports = accountModel;
