const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codealpha_events_vip')
  .then(() => console.log('MongoDB VIP Database Connected!'))
  .catch(err => console.error('MongoDB Error:', err));

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  category: String,
  price: String
});

const registrationSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
});

const Event = mongoose.model('Event', eventSchema);
const Registration = mongoose.model('Registration', registrationSchema);

module.exports = { Event, Registration };