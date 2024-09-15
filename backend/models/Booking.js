const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   showId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Showtime",
//     required: true,
//   },
//   seatIds: [{ type: String, required: true }], // Array of seat IDs
//   totalPrice: { type: Number, required: true },
//   bookingDate: { type: Date, default: Date.now },
// });

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  showId: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
  seatIds: [{ type: String, required: true }], // Array of seat IDs
  totalPrice: { type: Number, required: true },
  bookingDate: { type: Date, default: Date.now },
  orderId: { type: String }, // Razorpay order ID
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Paid'],
    default: 'Pending'
  }, // Payment status
  razorpayPaymentId: { type: String }, // Razorpay payment ID
  razorpaySignature: { type: String }, // Razorpay payment signature
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
