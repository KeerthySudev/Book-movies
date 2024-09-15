const Movie = require('../../models/Movie');
const Showtime = require('../../models/Showtime');

const searchMovie = async (req, res) => {
    try {

        const word = req.query.word;

        if (!word) {
            return res.status(400).json({ error: ' Query parameter is required' });
        }
        
        const movies = await Movie.find({ title: { $regex: word, $options: 'i' }  });
        console.log(movies)
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  // const searchThriller = async (req, res) => {
  //   try {

       
        
  //       const movies = await Movie.find({ genre: 'Thriller' });
  //       console.log(movies)
  //       res.json(movies);
  //   } catch (error) {
  //       res.status(500).json({ error: error.message });
  //   }
  // };

  const searchMatinee = async (req, res) => {
    try {  
        const showtimes = await Showtime.find({ showtime: '20:20' }).populate('movie');
        console.log(showtimes)
        const movieIds = showtimes.map(showtime => showtime.movie);
        console.log(movieIds)
        // Use those movieIds to find all related movies
        const movies = await Movie.find({ _id: { $in: movieIds } });
        console.log(movies)
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };


  const test = async (req , res) => {
    if (req.method === 'GET') {
  
      try {
        console.log('hi')
        // Replace this with your actual API call to verify the Aadhaar number
        const apiResponse = await fetch('http://www.omdbapi.com/?t=Inception&i=tt3896198&apikey=625da2dc', {
          method: 'POST',
          body: JSON.stringify({  }),
        });
  
        const responseData = await apiResponse.json();
        console.log(responseData)
  
        if (apiResponse.ok) {
          // Aadhaar number is valid
          return res.status(200).json({ message: 'GST number verified successfully!',responseData });
        } else {
          // API returned an error
          const error = await apiResponse.text();
          return res.status(400).send(`Verification failed: ${error}`);
        }
      } catch (error) {
        return res.status(500).send(`An error occurred: ${error.message}`);
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };

  const getMovie = async (req, res) => {
    try {
      const id = req.query.id;
        const movies = await Movie.findById(id);
        
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  const getShows = async (req, res) => {
    try {
      const id = req.query.id;
      
        const shows = await Showtime.find({movie: id})
        .populate('movie', 'title')  
        .populate('theatre', 'name');
        res.json(shows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  const getSeatings = async (req, res) => {
    try {
      const id = req.query.id;
      
        const shows = await Showtime.findById(id)
        .populate('movie', 'title')  
        .populate('theatre', 'name');
        console.log("showtimes:", shows);
        res.json(shows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  };

  module.exports = {searchMovie, searchMatinee,test,getMovie, getShows, getSeatings};