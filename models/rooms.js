let mongoose = require('mongoose');

let RoomSchema = new mongoose.Schema({
    roomtype: String,
    price: Number,
    roomNumber: Number,
    available:String
},
{ collection: 'roomsdb' })

module.exports = mongoose.model('Room', RoomSchema);