const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/lostData.json");

// Helper function to read file
const readData = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

// Helper function to write file
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// ================= CREATE =================
exports.createLost = (req, res) => {
  const { title, location, dateLost, ownerId, mobileNo, features } = req.body;
  // validation
  if (!title || !location || !dateLost || !ownerId) {
    return res.status(400).json({
      message: "Title, location, dateLost and ownerId are required"
    });
  }

  const data = readData();

  const newItem = {
    id: Date.now(),
    title,
    location,
    dateLost,
    ownerId,
    mobileNo,
    features,
    status: "open",
    createdAt: new Date()
  };

  data.push(newItem);
  writeData(data);

  res.status(201).json(newItem);
};

// ================= GET ALL =================
exports.getAllLost = (req, res) => {
  const data = readData();

  const { status } = req.query;

  if (status) {
    const filtered = data.filter(item => item.status === status);
    return res.json(filtered);
  }

  res.json(data);
};

// ================= GET BY ID =================
exports.getLostById = (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);

  const item = data.find(item => item.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(item);
};

// ================= UPDATE =================
exports.updateLost = (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);

  const item = data.find(item => item.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  const { title, location, dateLost, mobileNo, features, status } = req.body;

  item.title = title || item.title;
  item.location = location || item.location;
  item.dateLost = dateLost || item.dateLost;
  item.mobileNo = mobileNo || item.mobileNo;
  item.features = features || item.features;
  item.status = status || item.status;

  writeData(data);

  res.json(item);
};

// ================= DELETE =================
exports.deleteLost = (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);

  const newData = data.filter(item => item.id !== id);

  if (newData.length === data.length) {
    return res.status(404).json({ message: "Item not found" });
  }

  writeData(newData);

  res.json({ message: "Item deleted successfully" });
};
