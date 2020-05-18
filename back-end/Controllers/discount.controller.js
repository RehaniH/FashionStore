const mongoose = require('mongoose');
const Discount = require('../Models/discount.model');

exports.create_discount = function (req, res) {

    let discount = new Discount(req.body);
    discount.save()
        .then(quantity =>
            res.status(201).json(quantity))
        .catch(err =>
            res.status(500).send("Adding new discount failed"));

};

exports.update_discount = function (req, res) {

    let discountId = req.params.id;
    Discount.findById(discountId, function (err, discount) {

        if(!discount)
            res.status(404).json({'error':'updating discount failed. discount not found'});
        else
            console.log('end ddate: ' + req.body.end_date);
            console.log('Discount percentage: ' + req.body.discount_percentage);
            discount.end_date = req.body.end_date;
            discount.discount_percentage = req.body.discount_percentage;
            discount.save()
                .then(
                    discountOb =>
                        res.status(200).json(discountOb))
                .catch(err => res.status(500).json({'error':'updating discount failed'}));

    });
};