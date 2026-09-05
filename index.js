const express = require('express');
const cors = require('cors');
const path = require('path');
const { Event, Registration } = require('./models');

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(__dirname));

// Seed DB Function
async function seedDB() {
  try {
    const count = await Event.countDocuments();
    if (count === 0) {
      await Event.insertMany([
        { title: 'Web Development Bootcamp', description: 'Master Node.js, Express & MongoDB.', date: '2026-09-10', location: 'Online (Zoom)', category: 'Tech', price: 'Free' },
        { title: 'Global AI Summit 2026', description: 'Explore AI trends and LLMs.', date: '2026-09-20', location: 'Convention Center', category: 'AI', price: '$49' }
      ]);
    }
  } catch (err) {
    console.error('Seed Error:', err);
  }
}
seedDB();

// API 1: Get All Events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ _id: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API 2: Get Event Details
app.get('/api/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API 3: Create New Event (Organizer Route)
app.post('/api/events', async (req, res) => {
  try {
    const { authKey, title, description, date, location, category, price } = req.body;
    
    if (authKey !== 'admin123') {
      return res.status(401).json({ error: 'Unauthorized Organizer Key!' });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      category: category || 'General',
      price: price || 'Free'
    });

    await newEvent.save();
    console.log('New Event Created:', newEvent.title);
    return res.status(201).json({ message: 'Event Created Successfully', event: newEvent });
  } catch (err) {
    console.error('Publish Route Error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API 4: Register User
app.post('/api/register', async (req, res) => {
  try {
    const { userName, userEmail, eventId } = req.body;
    const newReg = new Registration({ userName, userEmail, eventId });
    await newReg.save();
    res.json({ message: 'Registration Successful', registration: newReg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API 5: Get Registrations
app.get('/api/registrations/:email', async (req, res) => {
  try {
    const list = await Registration.find({ userEmail: req.params.email }).populate('eventId');
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// API 6: Cancel Registration
app.delete('/api/registrations/:id', async (req, res) => {
  try {
    await Registration.findByIdAndDelete(req.params.id);
    res.json({ message: 'Registration Cancelled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(5000, () => console.log('Node.js + MongoDB Server running on http://localhost:5000'));