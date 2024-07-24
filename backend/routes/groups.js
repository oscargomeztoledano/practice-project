var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Groups = require('../models/groups');
mongoose.set('strict', false); // This is to avoid the "strict mode" error

// GET all groups
router.get('/', function(req, res, next) {
    Groups.find({}, function(err, groups) {
        if (err) {
            res.status(500).send('Error al obtener los grupos');
        }
        res.status(200).json(groups);
    });
});
module.exports = router;