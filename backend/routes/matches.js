var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var matches = require('../models/matches');
mongoose.set('strict', false); // This is to avoid the "strict mode" error

// GET all matches
router.get('/', function(req, res, next) {
    matches.find({isFinished: true}).exec()
        .then(function(matches) {
            res.status(200).json(matches);
        })
        .catch(function(err) {
            res.status(500).send('Error al obtener los partidos');
        });
});

//GET last 5 matches by date
router.get('/last12', function(req, res, next) {
    matches.find({ isFinished: true })
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

// GET match by ID 
router.get('/:id', function(req, res) {
    var id = req.params.id;
     
    matches.findOne({_id: mongoose.Types.ObjectId(id) }, function(err, match) {
        if (err) {
            return res.status(500).send('Error al obtener el partido');
        }
        if (!match) {
            return res.status(404).send('partido no encontrado');
        }
        res.status(200).json(match);

    });
});
module.exports = router;