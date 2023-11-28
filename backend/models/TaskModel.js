const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task:{
        type :String,
        required : true,
    },
    relation:{
        type :String,
        required : true,
    },
    age:{
        type :Number,
        required : true,
    },
    gender:{
        type :String,
        required : true,
    }
});

module.exports = mongoose.model("Task",taskSchema);