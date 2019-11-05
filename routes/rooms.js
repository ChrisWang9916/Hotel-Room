var rooms = require("../models/rooms")
var express = require("express")
var router = express.Router()


let findById = (arr, id) => {
    let result  = arr.filter(function(o) { return o.id == id} )
    return result ? result[0] : null // or undefined
}
let findByRN = (arr, roomNumber) => {
    let result  = arr.filter(function(o) { return o.roomNumber == roomNumber} )
    return result ? result[0] : null // or undefined
}

router.findAll = (req, res) => {
    res.json(rooms)
}
router.findOneById = (req, res) => {
    res.setHeader("Content-Type", "application/json")
    let room = findById(rooms, req.params.id  )  
    room ? 
        res.json( room ) :
        res.json({ message: "Room NOT Found!" } )
}

router.findByRoomNumber = (req, res) => {

    res.setHeader("Content-Type", "application/json")
    let room = findByRN(rooms, req.params.roomNumber  )  
    room ? 
        res.json( room ) :
        res.json({ message: "Room NOT Found!" } )
}
router.changeAvailable = (req, res) => {
    rooms.findById(req.params.id, function(err,room) {
        if (err)
            res.json({ message: "Room NOT Found!", errmsg : err } )
        else {
            if(room.available == "available"){
                room.available = "unavailable"
                room.save(function (err) {
                    if (err)
                        res.json({ message: "Room NOT changed!", errmsg : err } )
                    else
                        res.json({ message: "Room Successfully changed!", data: room })
                })
            }
            else{
                room.available = "available"
                room.save(function (err) {
                    if (err)
                        res.json({ message: "Room NOT changed!", errmsg : err } )
                    else
                        res.json({ message: "Room Successfully changed!", data: room })
                })
            }
        }
    })
}
router.addRoom = (req, res) => {
    res.setHeader("Content-Type", "application/json")
    let id = Math.floor((Math.random() * 1000000) + 1)
    rooms.push({id : id, roomtype : req.body.roomtype, price : req.body.price, roomNumber : req.body.roomNumber, available : req.body.available})
    res.json({ message: "Room Successfully Added!"})
}
router.deleteRoom = (req, res) => {
    let room = findById(rooms,req.params.id)
    if (!room)
        res.json({ message: "Room NOT DELETED!"} )
    else {  
        let index = rooms.indexOf(room)
        rooms.splice(index, 1)  
        res.json({ message: "Room Successfully Deleted!", data: room})
    }
}

module.exports = router