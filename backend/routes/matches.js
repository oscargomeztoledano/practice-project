var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Matches = require('../models/matches');
mongoose.set('strict', false); // This is to avoid the "strict mode" error

// GET all groups
router.get('/', function(req, res, next) {
    Matches.find({}, function(err, matches) {
        if (err) {
            res.status(500).send('Error al obtener los partidos');
        }
        res.status(200).json(matches);
    });
});
