const express = require('express');
const { searchMovie } = require('../controllers/user/movieController');
// const { searchThriller} = require('../controllers/user/movieController');
const { searchMatinee} = require('../controllers/user/movieController');
const { test} = require('../controllers/user/movieController');
const { getMovie} = require('../controllers/user/movieController');
const { getShows} = require('../controllers/user/movieController');
const { getSeatings} = require('../controllers/user/movieController');
const { confirmBooking} = require('../controllers/user/bookingController');
const { payment} = require('../controllers/user/bookingController');
const { verifyPayment} = require('../controllers/user/bookingController');

const router = express.Router();

// Define the route for user registration
router.get('/searchMovie', searchMovie);
// router.get('/searchThriller', searchThriller);
router.get('/searchMatinee', searchMatinee);
router.get('/test', test);
router.get('/getMovie', getMovie);
router.get('/getShows', getShows);
router.get('/getSeatings', getSeatings);
router.post('/confirmBooking', confirmBooking);
router.post('/payment', payment);
router.post('/verify-payment', verifyPayment);

// Export the router to be used in the main server file

module.exports = router;

