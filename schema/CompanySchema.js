const mongoose = require('mongoose');
const ModelSchema = require('./ModelSchema').schema;

const CompanySchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    model: {
        type: [ModelSchema],
        require: false,
        default: []
    },
    contact: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Company', CompanySchema);
