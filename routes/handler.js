const express = require("express");
const mongoose = require("mongoose");
const validUrl = require("valid-url");
const shortid = require("shortid");
const Url = require("../models/Url.js");
const { log } = require("console");

const router = express.Router();

router.get("/:code", async (req, res) => {
    try {
        const url = await Url.findOne({ shortenUrl: req.params.code });
        if (url) {
            return res.status(201).json(url);
        } else {
            return res.status(404).json({ msg: "No url found" });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router; 