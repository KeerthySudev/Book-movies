const Showtime = require("../../models/Showtime");
const Booking = require("../../models/Booking");
const Movie = require("../../models/Movie");
const Theatre = require("../../models/Theatre");
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const payment = async (req, res) => {
  try {
    const { amount, seats, showId, userId } = req.body;

    // Create a new Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: crypto.randomBytes(10).toString('hex'),
    });

    // Create a new booking with Pending payment status
    const newBooking = new Booking({
      userId,
      showId,
      seatIds: seats,
      totalPrice: amount,
      orderId: order.id,
      paymentStatus: 'Pending',
    });

    await newBooking.save();

    res.json({
      order: {
        id: order.id,
        currency: order.currency,
        amount: order.amount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating order' });
  }
};

// backend/routes/payment.js (continue)
const verifyPayment = async (req, res) => {
  try {
    const { paymentId, orderId, signature, seats, showId, userId } = req.body;

    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (generatedSignature !== signature) {
      return res.status(400).json({ success: false, message: 'Signature mismatch' });
    }
    await Showtime.updateMany(
      { _id: showId }, // Find the show by its ID
      {
        $set: {
          "seats.$[elem].isAvailable": false, 
          "seats.$[elem].bookedBy": userId, 
        },
      },
      {
        arrayFilters: [{ "elem.seatId": { $in: seats.split(",").map((c) => c.trim()) } }],
      }
    );


    const existingOrder = await Booking.findOne({ orderId });

  if (existingOrder) {
    // Update the existing order
    await Booking.findOneAndUpdate({ orderId },     { 
      paymentStatus: 'Paid',
      razorpayPaymentId: paymentId,
      razorpaySignature: signature
    }, { new: true });
  } else {
    // Create a new order
    console.log("not found order")
  }

    // Proceed with booking, e.g., update seat availability

    res.json({ success: true, message: 'Payment verified' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error verifying payment' });
  }
};



const confirmBooking = async (req, res) => {
  try {
    console.log(req.body);
    const { userId, showId, seatIDs, totalPrice } = req.body;
    console.log(userId);
    console.log(showId);
    console.log(seatIDs);
    console.log(totalPrice);

    if (!userId || !showId || !seatIDs || !totalPrice) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newBooking = new Booking({
      userId,
      showId,
      seatIds: seatIDs.split(",").map((c) => c.trim()),
      totalPrice,
    });

    // Save the user to the database
    console.log(newBooking);
    await newBooking.save();

    await Showtime.updateMany(
        { _id: showId }, // Find the show by its ID
        {
          $set: {
            "seats.$[elem].isAvailable": false, 
            "seats.$[elem].bookedBy": userId, 
          },
        },
        {
          arrayFilters: [{ "elem.seatId": { $in: seatIDs.split(",").map((c) => c.trim()) } }],
        }
      );

    res.status(201).json({ message: "Booking added successfully" });
  } catch (error) {
    // Send an error response if something goes wrong
    res.status(500).json({ error: error.message });
  }
};

const bookings = async (req, res) => {
 

  if (req.method === 'GET') {
    try {
      const { userId } = req.query;

      // Fetch the bookings for the user
      const bookings = await Booking.find({ userId }).populate('showId').exec();

      // Create an array to hold the detailed booking information
      const detailedBookings = await Promise.all(bookings.map(async (booking) => {
        const show = await Showtime.findById(booking.showId);
        const movie = await Movie.findById(show.movie);
        const theatre = await Theatre.findById(show.theatre);

        return {
          ...booking.toObject(),
          showDetails: show,
          movieDetails: movie,
          theatreDetails: theatre,
        };
      }));
      res.status(200).json(detailedBookings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch booking details', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}



module.exports = { confirmBooking, payment,verifyPayment, bookings };
