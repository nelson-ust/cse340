// /models/inventory-model.js

const pool = require("../database/");

/* ***************************
 * Get all classification data
 * ************************** */
async function getClassifications() {
  return await pool.query("SELECT * FROM public.classification ORDER BY classification_name");
}

/* ***************************
 * Get all inventory items and classification_name by classification_id
 * ************************** */
async function getInventoryByClassificationId(classification_id) {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory AS i 
        JOIN public.classification AS c 
        ON i.classification_id = c.classification_id 
        WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error("getclassificationsbyid error " + error);
    throw error; // Rethrow the error for the caller to handle
  }
}

/* ***************************
 * Get vehicle details by vehicleId
 * ************************** */
const getVehicleDetail = async (vehicleId) => {
  try {
    const data = await pool.query(
      `SELECT * FROM public.inventory WHERE inv_id = $1`,
      [vehicleId]
    );
    return data.rows[0]; // Assuming inv_id is a unique identifier
  } catch (error) {
    console.error("getVehicleDetail error " + error);
    throw error; // Re-throw the error for the caller to handle
  }
};
/* ***************************
 * Add a new classification
 * ************************** */
async function addClassification(classificationName) {
  try {
    const query = `INSERT INTO public.classification (classification_name) VALUES ($1) RETURNING *`;
    const result = await pool.query(query, [classificationName]);
    return result.rows[0];
  } catch (error) {
    console.error("Error adding classification: " + error);
    throw error;
  }
}

/* ***************************
 * Add a new inventory item
 * ************************** */
async function addInventory(inventoryData) {
  try {
    const query = `
      INSERT INTO public.inventory (vehicle_name, classification_id /* other fields */) 
      VALUES ($1, $2 /* other values */) 
      RETURNING *`;
    const values = [
      inventoryData.vehicleName, 
      inventoryData.classificationId 
      /* other values */
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error adding inventory item: " + error);
    throw error;
  }
}

module.exports = { 
  getClassifications, 
  getInventoryByClassificationId, 
  getVehicleDetail, 
  addClassification, 
  addInventory 
};
