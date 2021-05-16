

const db = require("../models/index");

// Defining methods for the expensessController
module.exports = {
    findAll: function (req, res) {
        console.log(res + "hello")
        db.Expense
            .find(req.query)
            // .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    // findById: function (req, res) {
    //     db.Expenses
    //         .findById(req.params.id)
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // },
    // create: function (req, res) {
    // db.Expenses
    //     .create(req.body)
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // },
    // update: function (req, res) {
    //     db.Expenses
    //         .findOneAndUpdate({ _id: req.params.id }, req.body)
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // },
    // remove: function (req, res) {
    //     db.Expenses
    //         .findById({ _id: req.params.id })
    //         .then(dbModel => dbModel.remove())
    //         .then(dbModel => res.json(dbModel))
    //         .catch(err => res.status(422).json(err));
    // }
};
