const mongoose = require('mongoose');

const ModelSchema = mongoose.Schema({
    number: {
        type: String,
        required: true
    },
    currentStock: {
        type: Number,
        required: true
    },
    primeCost: {
        type: Number,
        require: true
    },
    guidedPrice: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Model', ModelSchema);
