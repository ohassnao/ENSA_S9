// Import the required modules
const express = require('express');
const app = express();
const port = 3000;

// Use middleware to parse JSON bodies in requests
app.use(express.json());

// Sample data storage (for the sake of simplicity, using an array)
let items = [];

// POST Endpoint: Add a new item
// This endpoint allows the client to send an item in the request body, which is added to the "items" array.
app.post('/items', (req, res) => {
    const newItem = req.body; // Capture the item from the request body
    items.push(newItem); // Add the new item to the array
    res.status(201).send(newItem); // Respond with the newly added item
});

// GET Endpoint: Retrieve all items
// This endpoint returns all items in the "items" array to the client.
app.get('/items', (req, res) => {
    res.send(items); // Send back the entire array of items
});

// GET by ID Endpoint: Retrieve a specific item by ID
// This endpoint returns a specific item from the "items" array based on the ID passed as a URL parameter.
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id); // Find the item by its ID
    if (item) {
        res.send(item); // Send back the found item
    } else {
        res.status(404).send('Item not found'); // Respond with a 404 if the item doesn't exist
    }
});

// PUT Endpoint: Update an existing item
// This endpoint updates an existing item in the "items" array based on the ID passed as a URL parameter.
app.put('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id == req.params.id); // Find the index of the item by its ID
    if (itemIndex !== -1) {
        items[itemIndex] = req.body; // Replace the old item with the new data from the request body
        res.send(items[itemIndex]); // Send back the updated item
    } else {
        res.status(404).send('Item not found'); // Respond with a 404 if the item doesn't exist
    }
});

// DELETE Endpoint: Delete an item by ID
// This endpoint removes an item from the "items" array based on the ID passed as a URL parameter.
app.delete('/items/:id', (req, res) => {
    items = items.filter(i => i.id != req.params.id); // Remove the item with the given ID from the array
    res.status(204).send(); // Respond with a 204 (No Content) status, indicating success
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
