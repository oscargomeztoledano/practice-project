var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Matches = require('../models/matches');
mongoose.set('strict', false); // This is to avoid the "strict mode" error

// GET all groups
router.get('/', async function(req, res, next) {
    try{
        const matches = await Matches.find({isFinished: true}).exec();
        res.status(200).json(matches);
    }catch(err){
        res.status(500).send('Error al obtener los partidos');
    }
});

//GET last 5 matches by date
router.get('/last5', async function(req, res, next) {
    try {
        const matches = await Matches.find({ isFinished: true })
            .sort({ date: -1 })
            .limit(5)
            .exec();
        res.status(200).json(matches);
    } catch (err) {
        res.status(500).send('Error al obtener los últimos 5 partidos');
    }
});
module.exports = router;