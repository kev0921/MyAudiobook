const { Request, Response } = require('express');
const Audiobook = require('../models/audiobookModel');
const mongoose = require('mongoose');

// Get all audiobooks
const getAudiobooks = async (req, res) => {

    const audiobooks = await Audiobook.find({ user_id }).sort({ createdAt: -1 });

    res.status(200).json(audiobooks);
};

// Get a single audiobook
const getAudiobook = async (req, res) => {
    const audiobook = await Audiobook.findById(req.params.id);

    if (audiobook) {
        res.status(200).json(audiobook);
    } else {
        res.status(404);
        throw new Error('Audiobook not found');
    }
};

// Create a new audiobook
const createAudiobook = async (req, res) => {
    const { name, audioText } = req.body;

    const audiobook = new Audiobook({
        name,
        audioText,
    });

    const createdAudiobook = await audiobook.save();
    res.status(201).json(createdAudiobook);
};

// Delete a audiobook
const deleteAudiobook = async (req, res) => {
    const audiobook = await Audiobook.findById(req.params.id);

    if (audiobook) {
        await audiobook.remove();
        res.json({ message: 'Audiobook removed' });
    } else {
        res.status(404);
        throw new Error('Audiobook not found');
    }
};

// Update a audiobook
const updateAudiobook = async (req, res) => {
    const { name, audioText } = req.body;

    const audiobook = await Audiobook.findById(req.params.id);

    if (audiobook) {
        audiobook.name = name;
        audiobook.audioText = audioText;

        const updatedAudiobook = await audiobook.save();
        res.json(updatedAudiobook);
    } else {
        res.status(404);
        throw new Error('Audiobook not found');
    }
};

module.exports = {
    getAudiobooks,
    getAudiobook,
    createAudiobook,
    deleteAudiobook,
    updateAudiobook,
};
