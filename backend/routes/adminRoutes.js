const express = require('express');
const { addTheatre } = require('../controllers/admin/movieController');
const { showTheatre } = require('../controllers/admin/movieController');
const { addMovie } = require('../controllers/admin/movieController');
const { showMovie } = require('../controllers/admin/movieController');
const { deleteMovie } = require('../controllers/admin/movieController');
const { deleteTheatre } = require('../controllers/admin/movieController');
const { deleteShow } = require('../controllers/admin/movieController');
const { addShow } = require('../controllers/admin/showtimeController');
const { showTimes } = require('../controllers/admin/showtimeController');

const router = express.Router();

// Define the route for user registration
router.post('/theatres', addTheatre);
router.get('/showTheatres', showTheatre);
router.post('/movies', addMovie);
router.get('/showMovies', showMovie);
router.post('/shows', addShow);
router.get('/showTimes', showTimes);
router.delete('/deleteMovie', deleteMovie);
router.delete('/deleteTheatre', deleteTheatre);
router.delete('/deleteShow', deleteShow);

// Export the router to be used in the main server file

module.exports = router;

