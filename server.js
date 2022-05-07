'use strict'

const express = require("express");

const movies = require("./MovieData/data.json");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();

const MYAPIKEY = process.env.MYAPIKEY;
const PORT = process.env.PORT;

function Movie(id, title, release_date, poster_path, overview) {

    this.id = id;
    this.title = title;
    this.release_date = release_date;
    this.poster_path = poster_path;
    this.overview = overview;

};

app.get('/', homeHandler);

app.get('/favorite', favoriteHandler);

app.get('/trending', trendingHandler);

app.get('/search', searchHandler);

app.get('/review', reviewHandler);

app.get('/watch', watchHandler);

app.use("*", notFoundHandler);

app.use(errorHandler);



function trendingHandler(req, res) {

    let result = [];

    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${MYAPIKEY}&language=en-US`)
        .then(apiResponse => {
            apiResponse.data.results.map(value => {
                let theMovie = new Movie(value.id, value.title, value.release_date, value.poster_path, value.overview);
                result.push(theMovie);
            })
            return res.status(200).json(result);
        }).catch(error => {
            errorHandler(error, req, res);
        })



};

function searchHandler(request, response) {
    const searching = request.query.original_title;
    let arr = [];
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${MYAPIKEY}&language=en-US&query=${searching}1&include_adult=false`)
        .then(apiResponse => {

            console.log(apiResponse);


            let theResponse = new Movie(apiResponse.page, apiResponse.data.poster_path, apiResponse.data.adult, apiResponse.data.overview, apiResponse.data.release_date, apiResponse.datagenre_ids);


            return response.status(200).json(theResponse);

        }).catch(error => {
            errorHandler(error, req, res);
        })


}

function reviewHandler(req, res) {
    let reviewId = req.query.id;
    //58aa82f09251416f92006a3a   <- USE THIS ID

    let result = [];

    axios.get(`https://api.themoviedb.org/3/review/${reviewId}?api_key=${MYAPIKEY}`)
        .then(apiResponse => {
            console.log(apiResponse);


            let response = new Movie(apiResponse.data.id, apiResponse.data.author, apiResponse.data.author_details, apiResponse.data.content, apiResponse.data.overview);




            return res.status(200).json(response);
        }).catch(error => {
            errorHandler(error, req, res);
        })



};



function watchHandler(req, res) {

    let result = [];

    axios.get(`https://api.themoviedb.org/3/watch/providers/regions?api_key=${MYAPIKEY}&language=en-US`)
        .then(apiResponse => {
            apiResponse.data.results.map(value => {
                let theMovie = new Movie(value.iso_3166_1, value.english_name);
                result.push(theMovie);
            })
            return res.status(200).json(result);
        }).catch(error => {
            errorHandler(error, req, res);

        })

};





function homeHandler(request, response) {



    let Summary = new Movie(data.title, data.poster_path, data.overview);


    return response.status(200).json(Summary);

}

function favoriteHandler(req, res) {

    return res.send("Welcome to Favorite Page");

}



function errorHandler(error, requesting, responsing) {
    const err = {
        status: 500,
        message: error.message
    }
    return responsing.status(500).send(err);
}

function notFoundHandler(requesting, responsing) {
    return responsing.status(404).send("Not Found");
}






app.listen(PORT, () => {
    console.log(`Listen on ${PORT}`);
});
