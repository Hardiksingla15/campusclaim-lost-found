const fs = require("fs");
const path = require("path");

const lostPath = path.join(__dirname, "../data/lostData.json");
const foundPath = path.join(__dirname, "../data/foundData.json");

exports.getReport = (req, res) => {
  const lostData = JSON.parse(fs.readFileSync(lostPath));
  const foundData = JSON.parse(fs.readFileSync(foundPath));

  const totalLost = lostData.length;
  const totalFound = foundData.length;
  const totalClaimed = foundData.filter(item => item.status === "claimed").length;
  const totalOpenFound = foundData.filter(item => item.status === "open").length;

  res.json({
    totalLost,
    totalFound,
    totalClaimed,
    totalOpenFound
  });
};