const express = require('express');
const Reminder = require('../models/reminder');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const reminders = await Reminder.find().select('-__v');
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.post('/', async (req, res) => {
//   const newReminder = new Reminder(req.body);
//   try {
//     const savedReminder = await newReminder.save();
//     res.status(201).json(savedReminder);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

router.post('/', async (req, res) => {
    const currentDate = new Date();
    const newReminder = new Reminder({
      ...req.body,
      createdDate: currentDate,
      lastModifiedDate: currentDate,
    });
    try {
      const savedReminder = await newReminder.save();
      res.status(201).json(savedReminder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

// router.put('/:id', async (req, res) => {
//   try {
//     const updatedReminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updatedReminder);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
router.put('/:id', async (req, res) => {
    try {
      const updateData = {
        ...req.body,
        lastModifiedDate: new Date(),
      };
      const updatedReminder = await Reminder.findByIdAndUpdate(req.params.id, updateData, { new: true });
      res.json(updatedReminder);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


// router.delete('/:id', async (req, res) => {
//   try {
//     // await Reminder.findByIdAndDelete(req.params.id);
//     console.log('Attempting to delete reminder with id:', req.params.id);
//     const deletedReminder = await Reminder.findByIdAndDelete(req.params.id);
//     console.log('Deleted reminder:', deletedReminder);
//     res.status(204).end();
//   } catch (error) {
//     console.error('Error deleting reminder:', error);
//     res.status(400).json({ message: error.message });
//   }
// });

router.delete('/:id', async (req, res) => {
    try {
      console.log(`Attempting to delete reminder with id: ${req.params.id}`);
      await Reminder.findByIdAndDelete(req.params.id);
      console.log(`Deleted reminder with id: ${req.params.id}`);
      res.status(204).end();
    } catch (error) {
      console.error(`Error deleting reminder with id: ${req.params.id}`);
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;
