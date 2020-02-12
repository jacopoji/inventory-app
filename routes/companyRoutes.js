const express = require('express');
const router = express.Router();

const Company = require('../schema/CompanySchema');

router.get('/', async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const company = new Company({
            name: req.body.name,
            model: req.body.model,
            contact: req.body.contact
        });

        const savedCompany = await company.save();
        res.json(savedCompany);
    } catch (error) {
        res.json(error);
    }
});

router.patch('/', async (req, res) => {
    try {
        const updatedCompany = await Company.updateOne(
            { name: req.body.name },
            { $push: { model: req.body.model } }
        );
        res.json(updatedCompany);
    } catch (error) {
        res.json(error);
    }
});

router.delete('/:companyId', async (req, res) => {
    try {
        const deletedCompany = await Company.deleteOne({
            _id: req.params.companyId
        });
        res.json(deletedCompany);
    } catch (error) {
        res.json(error);
    }
});

router.delete('/:companyId/:modelId', async (req, res) => {
    try {
        const modifiedModels = await Company.updateOne(
            { _id: req.params.companyId },
            { $pull: { model: { _id: req.params.modelId } } }
        );
        res.json(modifiedModels);
    } catch (error) {
        res.json(error);
    }
});
module.exports = router;
