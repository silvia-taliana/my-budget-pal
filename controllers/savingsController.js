const db = require("../models/index");

// Defining methods for the savingssController
module.exports = {
    findAll: function (req, res) {
        db.Saving
            .find(req.query)
            // .sort({ date: -1 })
            .then(dbModel => {
                res.json(dbModel);
            })
            .catch(err => {
                console.log(err);
                res.status(422).json(err);
            });
    },
    find: function (req, res) {
        db.Saving
            .find({ user_id: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // create: function (req, res) {
    //     db.Savings
    //         .create(req.body)
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // },
    // update: function (req, res) {
    //     db.Savings
    //         .findOneAndUpdate({ _id: req.params.id }, req.body)
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // },
    // remove: function (req, res) {
    //     db.Savings
    //         .findById({ _id: req.params.id })
    //         .then(dbModel => dbModel.remove())
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // }
};
