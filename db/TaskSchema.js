const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({

    priority: {
        type: String,
        required: true
    },
    task: {
        type: String,
        required: true

    },
    des: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true

    },
    duedate: {
        type: Date,
        required: true

    },
    stages: {
        type: Number

    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("task", TaskSchema);