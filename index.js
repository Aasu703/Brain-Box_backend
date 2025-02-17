const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const sequelize = require('./backend/db'); // Fixed typo
const UserRoute = require('./routes/UserRoute'); // Correct import
const VirtualRoute = require("./routes/VirtualRoute");
const StudySession = require("./routes/StudyRoute"); // Correct
const Participation = require("./routes/ParticipationRoute"); // Correct import
const ChatMessage = require("./routes/ChatMessageRoute"); // Correct
const Material = require("./routes/MaterialRoute"); // Correct
// Creating a server
const app = express();

// Creating a port
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// app.get('/', (req, res) => {
//     res.send("Welcome to our API");
// });
app.get('/login',(req, res)=>{
    res.send("Welcome to the web page")
})

app.use('/users', UserRoute);
app.use("/api/virtualroom", VirtualRoute);
app.use('/api/material', Material);
app.use('/api/Participation', Participation);
app.use('/api/study', StudySession);
app.use('/api/chat', ChatMessage);
// Running on port
app.listen(PORT, () => {
    console.log(`Server Running on PORT ${PORT}`);
});

// Connect to the database server
sequelize.authenticate()
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => console.error('Error connecting to database:', err));


// console.log("DB Name:", process.env.DB_NAME);
// console.log("JWT Secret:", process.env.JWT_SECRET ? "Loaded ✅" : "Not Loaded ❌");
