
const express = require("express");
const app = express();

app.use(express.json());

const lostRoutes = require("./src/routes/lostRoutes");
const foundRoutes = require("./src/routes/foundRoutes");
const reportRoutes = require("./src/routes/reportRoutes");


app.use("/report", reportRoutes);
app.use("/lost", lostRoutes);
app.use("/found", foundRoutes);

app.get("/", (req, res) => {
    
    res.send("Lost & Found Backend Running");
  });
  
app.listen(5000, () => {
  console.log("Server started on port 5000");
});

