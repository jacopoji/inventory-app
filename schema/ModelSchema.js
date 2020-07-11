const mongoose = require('mongoose');

const ModelSchema = mongoose.Schema({
    number: {
        type: String,
        required: true,
    },
    currentStock: {
        type: Number,
        required: true,
    },
    primeCost: {
        type: Number,
        require: true,
    },
    guidedPrice: {
        type: Number,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        required: false,
        default: null,
    },
});

module.exports = mongoose.model('Model', ModelSchema);
