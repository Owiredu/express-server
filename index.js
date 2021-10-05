const express = require('express');
const app = express();

const products = [
    {
        id: 1,
        name: "iPhone 13 Pro Max",
        category: "Electronics",
        price: 9900,
        image: "images/iphone13.jpg",
        stars: 0,
        review: "This is an amazing product!"
    },
    {
        id: 2,
        name: "Butter Bread",
        category: "Food",
        price: 5,
        image: "images/butterbread.jpg",
        stars: 5,
        review: "The best bread I have ever had"
    }
];

const customers = [
    {
        id: 1,
        name: "Owiredu Nana Kofi",
        gender: "Male"
    },
    {
        id: 2,
        name: "Afari Jeremiah",
        gender: "Male"
    },
    {
        id: 3,
        name: "Gabriel Koranteng",
        gender: "Non-binary"
    }
];

app.get('/', (req, res) => {
    res.json({
        message: "Page loaded successfully"
    });
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/customers', (req, res) => {
    res.json(customers);
});

app.get('/customers/:customerID', (req, res) => {
    const { customerID } = req.params;
    const customerDetails = customers[customerID - 1];
    res.json(customerDetails === undefined ? { message: "Customer does not exist" } : customerDetails);
})

app.listen(3000, () => {
    console.log("Server running ...");
});