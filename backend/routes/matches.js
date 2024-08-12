var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Matches = require('../models/matches');
mongoose.set('strict', false); // This is to avoid the "strict mode" error

// GET all groups
router.get('/', function(req, res, next) {
    Matches.find({isFinished: true}).exec()
        .then(function(matches) {
            res.status(200).json(matches);
        })
        .catch(function(err) {
            res.status(500).send('Error al obtener los partidos');
        });
});

//GET last 5 matches by date
router.get('/last12', function(req, res, next) {
    Matches.find({ isFinished: true })
        .sort({ date: -1 })
        .limit(12)
        .exec()
        .then(function(matches) {
            res.status(200).json(matches);
            console.log("Enviando ultimos 12 partidos");
        })
        .catch(function(err) {
            res.status(500).send('Error al obtener los últimos 5 partidos');
        });
});
module.exports = router;