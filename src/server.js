
const express = require("express");
const cors = require("cors");

//route
const glyco_care_routes = require("./routes/glyco_care_routes")

const app = express();
const port = 5000;

// Enable CORS 
app.use(cors({ origin: 'http://localhost:5173' }));
app.use("/api/glycoCare",glyco_care_routes)

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
