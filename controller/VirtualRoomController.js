const VirtualRoom = require("../models/VirtualRoom");

// Create a new virtual room
exports.createRoom = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body); // Debugging log

    const { Room_Name, Created_By, Room_Type } = req.body;

    if (!Room_Name || !Created_By || !Room_Type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newRoom = await VirtualRoom.create({
      Room_Name,
      Created_By,
      Room_Type,
    });

    res.status(201).json(newRoom);
  } catch (error) {
    console.error("Error creating virtual room:", error);
    res.status(500).json({ error: "Failed to create virtual room", details: error.message });
  }
};
// Get all virtual rooms
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await VirtualRoom.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch virtual rooms" });
  }
};

// Get a single virtual room by ID
exports.getRoomById = async (req, res) => {
  try {
    const room = await VirtualRoom.findByPk(req.params.id);
    if (!room) return res.status(404).json({ error: "Room not found" });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch virtual room" });
  }
};

// Update a virtual room
exports.updateRoom = async (req, res) => {
  try {
    const { Room_Name, Room_Type } = req.body;
    const updated = await VirtualRoom.update(
      { Room_Name, Room_Type },
      { where: { Room_ID: req.params.id } }
    );

    if (!updated[0]) return res.status(404).json({ error: "Room not found" });
    res.status(200).json({ message: "Room updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update virtual room" });
  }
};

// Delete a virtual room
exports.deleteRoom = async (req, res) => {
  try {
    const deleted = await VirtualRoom.destroy({ where: { Room_ID: req.params.id } });
    if (!deleted) return res.status(404).json({ error: "Room not found" });
    res.status(200).json({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete virtual room" });
  }
};
