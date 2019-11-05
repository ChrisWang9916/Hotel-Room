var Employee = require('../models/employees');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

var mongodbUri = 'mongodb+srv://Wang:711925@cluster0-krnln.mongodb.net/employeesdb?retryWrites=true&w=majority'
mongoose.connect(mongodbUri, { useNewUrlParser: true });

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('connection error', err);
});
db.once('open', function () {
    console.log('connected to database');
});

router.findAll = (req, res) => {
    Employee.find(function(err,employees){
        if (err)
            res.send(err)

        res.send(JSON.stringify(employees,null,5));
    })
}
router.findById = (req, res) => {

    Employee.find({ "_id" : req.params.id },function(err, employee) {
        if (err)
            res.json({ message: 'Employee NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(employee,null,5));
    });

}
router.findByName = (req, res) => {

    Employee.find({ "name" : req.params.name },function(err, employee) {
        if (err)
            res.json({ message: 'Employee NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(employee,null,5));
    });

}
router.raiseSalary = (req, res) => {
    Employee.findById(req.params.id, function(err,employee) {
        if (err)
            res.json({ message: 'Employee NOT Found!', errmsg : err } );
        else {
            employee.salary += 50
            employee.save(function (err) {
                if (err)
                    res.json({ message: 'Salary NOT changed!', errmsg : err } );
                else
                    res.json({ message: 'Salary Successfully changed!', data: employee });
            })
        }
    });
}
router.ReduceSalary = (req, res) => {
    Employee.findById(req.params.id, function(err,employee) {
        if (err)
            res.json({ message: 'Employee NOT Found!', errmsg : err } );
        else {
            employee.salary -= 50
            employee.save(function (err) {
                if (err)
                    res.json({ message: 'Salary NOT changed!', errmsg : err } );
                else
                    res.json({ message: 'Salary Successfully changed!', data: employee });
            })
        }
    });
}
router.deleteE = (req, res) => {
    Employee.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Employee NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Employee Successfully Deleted!'});
    });
}
router.addE = (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    var e = new Employee();

    e.name = req.body.name;
    e.age = req.body.age;
    e.position = req.body.position;
    e.salary = req.body.salary;

    e.save(function(err) {
        if (err)
            res.json({ message: 'Employee NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Employee Successfully Added!', data: room });
    });
}


module.exports = router;