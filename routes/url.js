const express = require("express");
const mongoose = require("mongoose");
const validUrl = require("valid-url");
const shortid = require("shortid");
const Url = require("../models/Url.js");

const router = express.Router();

router.post("/", async (req, res) => {
    const originalUrl = req.query.url;
        try {
            const url_temp = await Url.findOne({ originalUrl });
            if (url_temp) {
                res.status(200).json(url_temp.shortenUrl);
            } else {
                const urlCode = shortid.generate();
                const shortenUrl = urlCode;
                const newUrl = new Url({
                    originalUrl,
                    shortenUrl,
                    creationTime: new Date()
                });

                await newUrl.save();
                res.status(201).json(newUrl);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server Error');
        }
});

module.exports = router;
