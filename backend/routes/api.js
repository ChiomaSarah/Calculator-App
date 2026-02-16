require("dotenv").config();
const express = require("express");
const router = express.Router();
const Operation = require("../models/operation");
const { evaluate } = require("mathjs");

router.get("/history", async (req, res) => {
  try {
    const operations = await Operation.find().sort({ _id: -1 }).limit(4);

    return res.status(200).json({
      message: "Request successful. This has been the last 4 operations!",
      data: operations,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

router.post("/calculate", async (req, res) => {
  const { arithmeticFunction } = req.body;
  try {
    const result = evaluate(arithmeticFunction);
    const calculation = new Operation({
      arithmeticFunction: arithmeticFunction,
      result: result,
    });

    await calculation.save();

    // Auto-cleanup: Keep only the 10 most recent operations.
    const threshold = await Operation.findOne()
      .sort({ _id: -1 })
      .skip(9)
      .select("_id");

    if (threshold) {
      // $lt = "less than" - Deletes all operations with an _id less than the 10th newest (i.e., older records).
      await Operation.deleteMany({ _id: { $lt: threshold._id } });
    }

    return res.status(201).json({ result });
  } catch (error) {
    return res.status(400).json({ error: "Invalid arithmetic operation." });
  }
});

module.exports = router;
