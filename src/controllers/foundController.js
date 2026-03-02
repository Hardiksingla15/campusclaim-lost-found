const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/foundData.json");

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
exports.createFound = (req, res) => {
  const { title, location, dateFound, foundBy, source, features } = req.body;

  // VALIDATION
  if (!title || !location || !dateFound || !foundBy || !source) {
    return res.status(400).json({
      message: "Title, location, dateFound, foundBy and source are required"
    });
  }

  if (!["student", "official"].includes(source)) {
    return res.status(400).json({
      message: "Source must be student or official"
    });
  }

  const data = readData();

  const newItem = {
    id: Date.now(),
    title,
    location,
    dateFound,
    foundBy,
    source, // "student" or "official"
    features,
    status: "open",
    claims: [],
    createdAt: new Date()
  };

  data.push(newItem);
  writeData(data);

  res.status(201).json(newItem);
};

// ================= GET ALL =================
exports.getAllFound = (req, res) => {
    const data = readData();
    const { status, source } = req.query;
  
    let filtered = data;
  
    if (status) {
      filtered = filtered.filter(item => item.status === status);
    }
  
    if (source) {
      filtered = filtered.filter(item => item.source === source);
    }
  
    res.json(filtered);
  };

// ================= GET BY ID =================
exports.getFoundById = (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);

  const item = data.find(item => item.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(item);
};

// ================= UPDATE =================
exports.updateFound = (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);

  const item = data.find(item => item.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  const { title, location, dateFound, features, status } = req.body;

  item.title = title || item.title;
  item.location = location || item.location;
  item.dateFound = dateFound || item.dateFound;
  item.features = features || item.features;
  item.status = status || item.status;

  writeData(data);

  res.json(item);
};

// ================= DELETE =================
exports.deleteFound = (req, res) => {
  const data = readData();
  const id = parseInt(req.params.id);

  const newData = data.filter(item => item.id !== id);

  if (newData.length === data.length) {
    return res.status(404).json({ message: "Item not found" });
  }

  writeData(newData);

  res.json({ message: "Item deleted successfully" });
};

// ================= CLAIM =================
exports.claimFound = (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
  
    const item = data.find(item => item.id === id);
  
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
  
    if (item.status !== "open") {
      return res.status(400).json({ message: "Item already claimed or closed" });
    }
    
  
    const { claimantId, secretDetail } = req.body;
  
    const claim = {
        claimantId,
        secretDetail,
        status: "pending",
        createdAt: new Date()
      };
  
    item.claims.push(claim);
  
    writeData(data);
  
    res.json({ message: "Claim submitted successfully", claim });
  };
  // ================= MARK CLAIMED =================
exports.markClaimed = (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
  
    const item = data.find(item => item.id === id);
  
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
  
    if (item.status !== "open") {
      return res.status(400).json({ message: "Item already closed" });
    }
  
    const { claimantId } = req.body;
  
    if (!claimantId) {
      return res.status(400).json({ message: "Claimant ID required" });
    }
  
    if (!item.claims || item.claims.length === 0) {
      return res.status(400).json({ message: "No claims available" });
    }
  
    // Find selected claim
    const selectedClaim = item.claims.find(
      c => c.claimantId === claimantId
    );
  
    if (!selectedClaim) {
      return res.status(404).json({ message: "Claim not found for this user" });
    }
  
    // Update claim statuses
    item.claims.forEach(claim => {
      if (claim.claimantId === claimantId) {
        claim.status = "approved";
      } else {
        claim.status = "rejected";
      }
    });
  
    // Update item status
    item.status = "claimed";
    item.claimedBy = claimantId;
    item.claimedAt = new Date();
  
    writeData(data);
  
    res.json({
      message: "Item successfully marked as claimed",
      item
    });
  };