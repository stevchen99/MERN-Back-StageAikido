const mongoose = require('mongoose');

const stageEntrySchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    address: {
        type: String,
        maxLength: 150, // Fits a standard French address (street, postal code, city)
        required: true,
        trim: true
    },
    link: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                // Optional: basic URL format check (accepts empty or valid URLs)
                return !v || /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(v);
            },
            message: 'Please provide a valid URL address.'
        }
    },
    stageName: {
        type: String,
        maxLength: 50,
        required: true
    },
    cost: {
        type: Number,
        required: true,
        min: 0
    },
    dept: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 2,
        uppercase: true
    },
    // Enseignants field integrated directly into the schema
    enseignants: [
        {
            firstName: {
                type: String,
                required: true,
                trim: true,
                maxLength: 50
            },
            lastName: {
                type: String,
                required: true,
                trim: true,
                maxLength: 50
            }
        }
    ]
});

module.exports = mongoose.model('StageEntry', stageEntrySchema);