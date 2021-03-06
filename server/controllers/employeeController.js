const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var Employee = require("./../models/employee");

router.get("/", (req, res) => {
  Employee.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Employees :" + JSON.stringify(err, null, 2)
      );
    }
  });
});

router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }
  Employee.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving Employee :" + JSON.stringify(err, null, 2)
      );
    }
  });
});

router.post("/", (req, res) => {
  var emp = new Employee({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
    age: req.body.age,
  });
  emp.save((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log("Error in Saving Employee :" + JSON.stringify(err, null, 2));
    }
  });
});

router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }

  var emp = {
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary,
    age: req.body.age,
  };
  Employee.findByIdAndUpdate(
    req.params.id,
    { $set: emp },
    { new: true },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log(
          "Error in Updating Employee :" + JSON.stringify(err, null, 2)
        );
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id : ${req.params.id}`);
  }

  Employee.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Deleting Employee :" + JSON.stringify(err, null, 2)
      );
    }
  });
});

module.exports = router;
