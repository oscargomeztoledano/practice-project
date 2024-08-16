var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var groups = require('../models/groups');
mongoose.set('strict', false); // This is to avoid the "strict mode" error

// GET all groups
router.get('/', function(req, res, next) {
    groups.find({}, function(err, groups) {
        if (err) {
            res.status(500).send('Error al obtener los grupos');
        }
        res.status(200).json(groups);
    });
});
// GET team by ID 
router.get('/:id', function(req, res) {
    var id = req.params.id;
     
    groups.findOne({_id: mongoose.Types.ObjectId(id) } , function(err, group) {
        if (err) {
            return res.status(500).send('Error al obtener el equipo');
        }
        if (!group) {
            return res.status(404).send('Equipo no encontrado');
        }
        res.status(200).json(group);

    });
});
module.exports = router;