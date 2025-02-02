const express = require("express");
const router = express.Router();
const VirtualRoomController = require("../controller/VirtualRoomController");

router.post("/create", VirtualRoomController.createRoom);
router.get("/", VirtualRoomController.getAllRooms);
router.get("/:id", VirtualRoomController.getRoomById);
router.put("/:id", VirtualRoomController.updateRoom);
router.delete("/:id", VirtualRoomController.deleteRoom);

module.exports = router;
