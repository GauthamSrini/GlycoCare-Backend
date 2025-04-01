
const express = require("express");
const cors = require("cors");

//route
const eldertech_routes = require("./routes/eldertech_routes")

const app = express();
const port = 5000;

// Enable CORS 
app.use(cors({ origin: 'http://localhost:5173' }));
app.use("/api/eldertech",eldertech_routes)

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
