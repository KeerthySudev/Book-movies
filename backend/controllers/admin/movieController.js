const Movie = require('../../models/Movie');
// const Review = require('../../models/Movie');
const Theatre = require('../../models/Theatre');
const Showtime = require("../../models/Showtime");
const Booking = require("../../models/Booking");
const multer = require('multer');
const path = require('path');

// function isValidObjectId(id) {
//     const objectIdRegex = /^[a-fA-F0-9]{24}$/;
//     return objectIdRegex.test(id);
// }

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'backend/uploads/posters'); // Ensure this folder exists
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('poster'); 

const addMovie = async (req, res) => {
    try {
        // Use Multer to handle file upload
        console.log(req.body)
            console.log(req.file)
        upload(req, res, async (err) => {
            if (err) {
                console.error('Upload error:', err.message);
                return res.status(500).json({ error: err.message });
            }

            const { title, genre, language, director, cast, synopsis } = req.body;
            console.log(req.body)
            console.log(req.file)

            if (!req.file) {
                return res.status(400).json({ error: 'Poster is required' });
            }

            const posterUrl = `/uploads/posters/${req.file.filename}`;

            // const theatresArray = JSON.parse(theatres);
            // if (!Array.isArray(theatresArray) || !theatresArray.every(isValidObjectId)) {
            //     return res.status(400).json({ error: 'Invalid theatre IDs' });
            // }

        try {
            const newMovie = new Movie({
                title,
                genre,
                language,
                director,
                cast: cast.split(',').map(c => c.trim()),
                synopsis,
                posterUrl,
                // theatres: theatresArray,
            });

            await newMovie.save();
            res.status(201).json({ message: 'Movie added successfully', movie: newMovie });
        } catch (error) {
            console.error('Database save error:', error.message);
            res.status(500).json({ error: error.message });
        }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const showMovie = async (req, res) => {
    try {
        
        const movies = await Movie.find({});
        
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  const deleteMovie = async (req,res) => {
    if (req.method === 'DELETE') {
        const { movieId } = req.query;
    
        try {
          const result = await Movie.findByIdAndDelete(movieId);
          const deletedShows = await Showtime.find({ movie: movieId });

      // Extract the show IDs for use in updating bookings
      const showIds = deletedShows.map(show => show._id);

      // Delete the shows
      await Showtime.deleteMany({ movie: movieId });

      // 3. Update the bookings to remove or nullify references to the deleted shows
      await Booking.updateMany(
        { showId: { $in: showIds } },
        { $unset: { showId: '' } } // Remove showId from the bookings
      );
    
          if (!result) {
            return res.status(404).json({ error: 'Movie not found' });
          }
    
          res.status(200).json({ message: 'Movie deleted successfully' });
        } catch (error) {
          res.status(500).json({ error: 'Failed to delete movie', details: error.message });
        }
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
  }

  const deleteTheatre = async (req,res) => {
    if (req.method === 'DELETE') {
        const { id } = req.query;
    
        try {
          const result = await Theatre.findByIdAndDelete(id);
          const deletedShows = await Showtime.find({ theatre: id });

      // Extract the show IDs for use in updating bookings
      const showIds = deletedShows.map(show => show._id);

      // Delete the shows
      await Showtime.deleteMany({ theatre: id });

      // 3. Update the bookings to remove or nullify references to the deleted shows
      await Booking.updateMany(
        { showId: { $in: showIds } },
        { $unset: { showId: '' } } // Remove showId from the bookings
      );
    
          if (!result) {
            return res.status(404).json({ error: 'Theatre not found' });
          }
    
          res.status(200).json({ message: 'Theatre deleted successfully' });
        } catch (error) {
          res.status(500).json({ error: 'Failed to delete Theatre', details: error.message });
        }
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
  }


  const deleteShow = async (req,res) => {
    if (req.method === 'DELETE') {
        const { id } = req.query;
    
        try {
          const result = await Showtime.findByIdAndDelete(id);
    
          if (!result) {
            return res.status(404).json({ error: 'Movie not found' });
          }
    
          res.status(200).json({ message: 'Movie deleted successfully' });
        } catch (error) {
          res.status(500).json({ error: 'Failed to delete movie', details: error.message });
        }
      } else {
        res.status(405).json({ error: 'Method not allowed' });
      }
  }


const addTheatre = async (req, res) => {
    try {
      
      const { name, location, seatingCapacity} = req.body;
  
      if (!name || !location || !seatingCapacity) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      
      const newTheatre = new Theatre({ name, location, seatingCapacity });
  
      // Save the user to the database
      console.log(newTheatre);
      await newTheatre.save();
  
      // Send a success response
      res.status(201).json({ message: 'Theatre added successfully' });
    } catch (error) {
      // Send an error response if something goes wrong
      res.status(500).json({ error: error.message });
    }
  };

  const showTheatre = async (req, res) => {
    try {
        const theatres = await Theatre.find({});
        res.json(theatres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };




module.exports = {addTheatre, addMovie, showTheatre, showMovie,deleteMovie,deleteTheatre,deleteShow};