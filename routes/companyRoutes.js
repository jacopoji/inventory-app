const express = require('express');
const router = express.Router();

const Company = require('../schema/CompanySchema');
var multer = require('multer');

//*****************GET REQUESTS
router.get('/', async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.get('/:companyId', async (req, res) => {
    try {
        const models = await Company.find(
            { _id: req.params.companyId },
            { model: 1, _id: 0 }
        );
        res.json(models);
    } catch (error) {
        res.status(404).send(error);
    }
});

//*****************POST REQUESTS

router.post('/', async (req, res) => {
    try {
        const company = new Company({
            name: req.body.name,
            model: req.body.model,
            contact: req.body.contact,
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
            { _id: req.body.companyId },
            {
                $set: {
                    name: req.body.name,
                    //contact: req.body.contact //requires packet with name and contact
                },
            }
        );
        res.json(updatedCompany);
    } catch (error) {
        res.json(error);
    }
});

//*********************PATCH REQUESTS

router.patch('/:companyId', async (req, res) => {
    try {
        const updatedCompany = await Company.updateOne(
            { _id: req.params.companyId },
            {
                $push: {
                    model: req.body.modelData,
                    //contact: req.body.contact //requires packet with name and contact
                },
            }
        );
        res.json(updatedCompany);
    } catch (error) {
        res.json(error);
    }
});

//***********************DELETE REQUESTS
router.delete('/:companyId', async (req, res) => {
    try {
        const deletedCompany = await Company.deleteOne({
            _id: req.params.companyId,
        });
        res.json(deletedCompany);
    } catch (error) {
        res.json(error);
    }
});
//TODO: merge the two functions below
router.delete('/:companyId/multi', async (req, res) => {
    try {
        //console.log(req.body.modelIds);
        const modifiedModels = await Company.updateOne(
            { _id: req.params.companyId },
            { $pull: { model: { _id: { $in: req.body.modelIds } } } }
        );
        res.json(modifiedModels);
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
