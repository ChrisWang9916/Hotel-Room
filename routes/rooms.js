var Room = require('../models/rooms');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

var mongodbUri = 'mongodb+srv://Wang:711925@cluster0-krnln.mongodb.net/roomsdb?retryWrites=true&w=majority'
mongoose.connect(mongodbUri,{useNewUrlParser:true});

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAll = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    Room.find(function(err,rooms){
        if (err)
            res.send(err)

        res.send(JSON.stringify(rooms,null,5));
    })

}
router.findOneById = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Room.find({ "_id" : req.params._id },function(err, room) {
        if (err)
            res.json({ message: 'Room NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(room,null,5));
    });

}
router.findByRoomNumber = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Room.find({ "roomNumber" : req.params.roomNumber },function(err, room) {
        if (err)
            res.json({ message: 'Room NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(room,null,5));
    });

}
router.changeAvailable = (req, res) => {
    Room.findById(req.params.id, function(err,room) {
        if (err)
            res.json({ message: 'Room NOT Found!', errmsg : err } );
        else {
            if(room.available == "available"){
                room.available = "unavailable"
                room.save(function (err) {
                    if (err)
                        res.json({ message: 'Room NOT changed!', errmsg : err } );
                    else
                        res.json({ message: 'Room Successfully changed!', data: room });
                })
            }
            else{
                room.available = "available"
                room.save(function (err) {
                    if (err)
                        res.json({ message: 'Room NOT changed!', errmsg : err } );
                    else
                        res.json({ message: 'Room Successfully changed!', data: room });
                })
            }
        }
    });
}
router.increasePrice = (req, res) => {
    Room.findById(req.params.id, function(err,room) {
        if (err)
            res.json({ message: 'Room NOT Found!', errmsg : err } );
        else {
            room.price += 10
            room.save(function (err) {
                if (err)
                    res.json({ message: 'Price NOT changed!', errmsg : err } );
                else
                    res.json({ message: 'Price Successfully changed!', data: room });
            })
        }
    });

}
router.decreasePrice = (req, res) => {
    Room.findById(req.params.id, function(err,room) {
        if (err)
            res.json({ message: 'Room NOT Found!', errmsg : err } );
        else {
            room.price -= 10
            room.save(function (err) {
                if (err)
                    res.json({ message: 'Price NOT changed!', errmsg : err } );
                else
                    res.json({ message: 'Price Successfully changed!', data: room });
            })
        }
    });
}
router.addRoom = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var room = new Room();

    room.roomtype = req.body.roomtype;
    room.price = req.body.price;
    room.roomNumber = req.body.roomNumber;
    room.available = req.body.available;

    room.save(function(err) {
        if (err)
            res.json({ message: 'Room NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Room Successfully Added!', data: room });
    });
}
router.deleteRoom = (req, res) => {
    Room.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Room NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Room Successfully Deleted!'});
    });
}

module.exports = router;