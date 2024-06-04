const express = require('express');
const router = express.Router();
const invModel = require('../models/inventory-model'); // Correctly import the model
const { invCont, displayVehicleDetail } = require("../controllers/invController");

// Route handler to render the add classification view
router.get('/add-classification', (req, res) => {
    res.render('inventory/add-classification', { message: req.flash('message') });
});

// Route handler to process form submission for adding a new classification
router.post('/add-classification', async (req, res) => {
    if (!req.body.classificationName) {
        req.flash('message', 'Classification name is required.');
        return res.redirect('/inv/add-classification');
    }

    try {
        await invModel.addClassification(req.body.classificationName); // Ensure addClassification function exists in the model
        req.flash('message', 'Classification added successfully.');
        res.redirect('/inv');
    } catch (error) {
        console.error('Error adding classification:', error);
        req.flash('message', 'An error occurred while adding the classification.');
        res.redirect('/inv/add-classification');
    }
});

router.get("/type/:classificationId", invCont.buildByClassificationId);

// Corrected Route
router.get("/detail/:vehicleId", displayVehicleDetail);

// Route handler to render the add inventory view
router.get('/add-inventory', async (req, res) => {
    try {
        const classifications = await invModel.getClassifications();
        res.render('inventory/add-inventory', { classifications, message: 'message' });
    } catch (error) {
        console.error('Error fetching classifications:', error);
        req.flash('message', 'An error occurred while fetching classifications.');
        res.redirect('/inv');
    }
});

// Route handler to process form submission for adding a new inventory item
router.post('/add-inventory', async (req, res) => {
    if (!req.body.vehicleName || !req.body.classificationId) {
        req.flash('message', 'All fields are required.');
        return res.redirect('/inv/add-inventory');
    }

    try {
        await invModel.addInventory(req.body); // Ensure addInventory function exists in the model
        req.flash('message', 'Inventory item added successfully.');
        res.redirect('/inv');
    } catch (error) {
        console.error('Error adding inventory item:', error);
        req.flash('message', 'An error occurred while adding the inventory item.');
        res.redirect('/inv/add-inventory');
    }
});

module.exports = router;
