
const mongoose = require('mongoose');

const showtimeSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    theatre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatre',
        required: true,
    },
    showtime: {
        type: String,
        required: true,
    },
    price: {
        type: Number, // Ticket price
        required: true,
    },
    seats: { 
        type: Array, 
        default: []  // This is an array of dynamic seat objects
      },
}, {
    timestamps: true,
});

const Showtime = mongoose.model('Showtime', showtimeSchema);


module.exports = Showtime;