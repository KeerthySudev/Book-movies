const Showtime = require('../../models/Showtime');


const generateSeats = (rows, cols) => {
    const seats = [];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // For row labels
  
    for (let row = 0; row < rows; row++) {
      for (let col = 1; col <= cols; col++) {
        seats.push({
          seatId: `${alphabet[row]}${col}`,  
          isAvailable: true,
          bookedBy: null,  
        });
      }
    }
  
    return seats;
  };


const addShow = async (req, res) => {
    try {
        console.log("Received data:", req.body); 
        const { movie, theatre, showtime,price, rows, seatPerRows } = req.body;
        // const showtime = time.slice(11, 16);
        console.log("Movie:", movie);
        console.log("Theatre:", theatre);
        console.log("Time:", showtime);
        console.log("Price:", price);
        // Validate inputs
        if (!movie || !theatre || !showtime || !price || !rows || !seatPerRows) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const seats = generateSeats(rows, seatPerRows);
        console.log(seats);
        // Log to check inputs
        // console.log('Creating new showtime:', { movie, theatre, time });

        // Create new Showtime instance
        const newShowtime = new Showtime({ movie, theatre, showtime, price, seats });

        // Log before saving
        console.log('Saving new showtime:', newShowtime);

        // Save to the database
        await newShowtime.save();

        // Log success
        console.log('Showtime saved successfully:', newShowtime);
        res.status(201).json({ message: 'Showtime added successfully', newShowtime });
    } catch (error) {
        console.error('Error saving showtime:', error);
        res.status(500).json({ error: error.message });
    }
  };

  const showTimes = async (req, res) => {
    try {
        const shows = await Showtime.find({})
        .populate('movie', 'title')  
        .populate('theatre', 'name');
        res.json(shows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };




module.exports = {showTimes, addShow};