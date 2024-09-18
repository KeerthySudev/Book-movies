const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
    director: {
        type: String,
    },
    cast: {
        type: [String], 
    },
    synopsis: {
        type: String,
    },
    posterUrl: {
        type: String, 
        required: true,
    },
    // theatres: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'Theatre',
    //     },
    // ],
}, {
    timestamps: true,
}); 

const reviewSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
    user: {
        type: String, 
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});








const Movie = mongoose.model('Movie', movieSchema);
// const Review = mongoose.model('Review', reviewSchema);

module.exports = Movie;