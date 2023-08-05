const express = require("express");
const router = express.Router();

// necesitamos llamar a nuestro modelo Movie
const Movie = require("../models/Movie.model");

/* GET home page */
router.get("/", (req, res, next) => res.render("index.hbs"));

// GET movies page
router.get("/movies", (req, res, next) => {
  //render page y llevar allí los datos de las peliculas desde DB
  Movie.find()
    .select({ title: 1, image: 1 })
    .then((response) => {
      res.render("movies.hbs", {
        //pasamos la data
        allMovies: response,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

// GET details movie page
router.get("/movie/:id", (req, res, next) => {
  // render pagina y pasar los detalles de 1 pelicula
  let movieId = req.params.id;
  Movie.findById(movieId)
    .then((response) => {
      res.render("movie-details.hbs", {
        // pasamos la data
        movieDetails: response,
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
module.exports = router;
