// const Participated = require('../models/Participation');

// //Function to get all Participant

// const getAllParticipants = async (req, res) => {
//   try {
//     const participants = await Participated.find({});
//     res.status(200).json(participants);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Function to create a new Participant

// const createParticipant = async (req, res) => {
//   const participant = new Participated(req.body);

//   try {
//     const newParticipant = await participant.save();
//     res.status(201).json(newParticipant);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Function to update a Participant

// const updateParticipant = async (req, res) => {
//   const { id: _id } = req.params;
//   const participant = req.body;

//   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Participant not found');

//   const updatedParticipant = await Participated.findByIdAndUpdate(_id, participant, { new: true });

//   if (!updatedParticipant) return res.status(404).send('Participant not found');

//   res.json(updatedParticipant);
// };

// // Function to delete a Participant

// const deleteParticipant = async (req, res) => {
//   const { id: _id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Participant not found');

//   const deletedParticipant = await Participated.findByIdAndDelete(_id);

//   if (!deletedParticipant) return res.status(404).send('Participant not found');

//   res.json(deletedParticipant);
// };

// module.exports = { getAllParticipants, createParticipant, updateParticipant, deleteParticipant };

const pool = require('../db');
const queries = require('../models/Participation');

// Get all participants
const getAllParticipants = async (req, res) => {
  try {
    const result = await pool.query(queries.getAllParticipants);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new participant
const createParticipant = async (req, res) => {
  const { name, email, event } = req.body;
  if (!name || !email || !event) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const result = await pool.query(queries.createParticipant, [name, email, event]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a participant
const updateParticipant = async (req, res) => {
  const { id } = req.params;
  const { name, email, event } = req.body;

  try {
    const result = await pool.query(queries.updateParticipant, [name, email, event, id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Participant not found' });

    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a participant
const deleteParticipant = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(queries.deleteParticipant, [id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Participant not found' });

    res.json({ message: 'Participant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllParticipants, createParticipant, updateParticipant, deleteParticipant };
