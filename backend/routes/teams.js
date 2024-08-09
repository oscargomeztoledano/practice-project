var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var teams = require('../models/teams');
var db = mongoose.connection;

mongoose.set('strict', false); // This is to avoid the "strict mode" error

// GET all groups
router.get('/', function(req, res, next) {
    teams.find({}, function(err, teams) {
        if (err) {
            res.status(500).send('Error al obtener los grupos');
        }
        res.status(200).json(teams);
    });
});

// GET team by ID 
router.get('/:id', function(req, res) {
    var id = req.params.id;
     
    teams.findOne({_id: mongoose.Types.ObjectId(id) }, function(err, team) {
        if (err) {
            return res.status(500).send('Error al obtener el equipo');
        }
        if (!team) {
            return res.status(404).send('Equipo no encontrado');
        }
        res.status(200).json(team);
        console.log('GET team by ID: ' + team);
    });
});
module.exports = router;