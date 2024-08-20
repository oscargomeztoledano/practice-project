var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var players = require('../models/players');
mongoose.set('strict', false); // This is to avoid the "strict mode" error

// GET all players
router.get('/', function(req, res, next) {
    players.find({}, function(err, players) {
        if (err) {
            res.status(500).send('Error al obtener los jugadores');
        }
        res.status(200).json(players);
    });
});
// GET player by ID 
router.get('/:id', function(req, res) {
    var id = req.params.id;
     
    players.findOne({_id: mongoose.Types.ObjectId(id) }, function(err, player) {
        if (err) {
            return res.status(500).send('Error al obtener el jugador');
        }
        if (!player) {
            return res.status(404).send('jugador no encontrado');
        }
        res.status(200).json(player);

    });
});
module.exports = router;