var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
    name: String,
    players: [{_id: {type:Schema.Types.ObjectId, ref: 'players'}}],
    coach: String,
    captain: String,
    championships: Number,
    runnersUP: Number,
    group: {_id: {type: Schema.Types.ObjectId, ref: 'groups'}},
    imageUrl: String
});

module.exports = mongoose.model('teams', teamSchema, 'teams');