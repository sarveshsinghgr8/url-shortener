const express = require("express");
const mongoose = require("mongoose");

const connect = async (filepath) => {
    try {
        await mongoose.connect(filepath);

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};


module.exports = connect;