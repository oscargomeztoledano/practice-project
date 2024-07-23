var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Players = require('../models/players');
mongoose.set('strict', false); // This is to avoid the "strict mode" error

// GET all groups
router.get('/', function(req, res, next) {
    Players.find({}, function(err, players) {
        if (err) {
            res.status(500).send('Error al obtener los jugadores');
        }
        res.status(200).json(players);
    });
});
