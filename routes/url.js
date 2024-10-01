const express = require("express");
const mongoose = require("mongoose");
const validUrl = require("valid-url");
const shortid = require("shortid");
const Url = require("../models/Url.js");

const router = express.Router();

router.post("/", async (req, res) => {
    const originalUrl = req.query.url;

    // Check if the provided URL is valid
    //if (validUrl.isUri(originalUrl)) {
        try {
            // Check if the original URL already exists
            const url_temp = await Url.findOne({ originalUrl });

            if (url_temp) {
                // If it already exists, return the shortened URL
                res.status(200).json(url_temp.shortenUrl);
            } else {
                // Otherwise, generate a new short URL
                const urlCode = shortid.generate();
                const shortenUrl = urlCode;

                // Create and save a new URL entry
                const newUrl = new Url({
                    originalUrl,
                    shortenUrl,
                    creationTime: new Date()
                });

                await newUrl.save();

                // Return the newly created short URL
                res.status(201).json(newUrl);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server Error');
        }
    // } else {
    //     res.status(400).json("Invalid URL");
    // }
});

module.exports = router;
