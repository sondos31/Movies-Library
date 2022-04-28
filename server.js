'use strict'

const express = require("express");

const data = require("./MovieData/data.json");

const app = express();

function Movie(title, poster_path, overview) {

    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;

};

app.get('/',homeHandler);

app.get('/favorite', favoriteHandler);

function homeHandler(request , response){



        let Summary = new Movie(data.title, data.poster_path, data.overview);


    return response.status(200).json(Summary);

}

function favoriteHandler(req , res) {

    return res.send("Welcome to Favorite Page");

}





app.listen(7000, () => {
    console.log("Listen on 7000");
});