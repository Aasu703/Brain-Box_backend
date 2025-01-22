const express = require('express');
const app = express();
const userRoutes = require('./routes/UserRoute');

app.use(express.json()); // Middleware to parse JSON
app.use('/api', userRoutes); // Use the user routes

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
