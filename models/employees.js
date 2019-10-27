let mongoose = require('mongoose');

let EmployeeSchema = new mongoose.Schema({
        name: String,
        age: Number,
        position:String,
        salary:Number
    },
    { collection: 'employeesdb' })

module.exports = mongoose.model('Employee', EmployeeSchema);

