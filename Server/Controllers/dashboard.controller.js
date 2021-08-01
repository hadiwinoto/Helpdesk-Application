
const { response } = require("express");


exports.index = (req, res) => {
    res.status(200).send({
        status: 1,
        message: "Welcome To Dashboard"
      });
};
