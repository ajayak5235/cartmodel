const express = require('express');
const app = express();
const fs = require('fs');

// Define the delete route
app.delete('/delete/:productId', (req, res) => {
    const productId = req.params.productId;
    // Implement your logic to delete the product from the file or database
    // For example, if you're using a JSON file to store products:
    const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'));

    // Find and remove the product by ID
    const updatedProducts = products.filter(product => product.id !== productId);

    // Write the updated products back to the file
    fs.writeFileSync('products.json', JSON.stringify(updatedProducts));

    res.status(200).send('Product deleted successfully');
});

// Start your Express server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
