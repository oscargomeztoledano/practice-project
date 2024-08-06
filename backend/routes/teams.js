var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Teams = require('../models/teams');
mongoose.set('strict', false); // This is to avoid the "strict mode" error

// GET all groups
router.get('/', function(req, res, next) {
    Teams.find({}, function(err, teams) {
        if (err) {
            res.status(500).send('Error al obtener los grupos');
        }
        res.status(200).json(teams);
    });
});

// GET team by ID
router.get('/:id', function(req, res, next) {
    Teams.findById(req.params.id, function(err, team) {
        if (err) {
            res.status(500).send('Error al obtener el equipo');
        }
        res.status(200).json(team);
    });
});
module.exports = router;