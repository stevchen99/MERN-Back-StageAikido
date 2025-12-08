const mongoose = require('mongoose');

const stageEntrySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    place: {
        type: String,
        maxLength: 50,
        required: true
    },
    stageName: {
        type: String,
        maxLength: 50,
        required: true
    },
    cost: {
        type: Number, // Mongoose handles decimals via Number
        required: true,
        min: 0
    },
    dept: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 2, // Forces exactly 2 characters (e.g., '75', 'NY')
        uppercase: true // Auto convert to uppercase
    }
});

module.exports = mongoose.model('StageEntry', stageEntrySchema);