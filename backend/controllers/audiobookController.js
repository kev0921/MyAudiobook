const OpenAI = require('openai');
const Audiobook = require('../models/audiobookModel');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Function to get audiobook and generate speech
const getAudiobookWithSpeech = async (req, res) => {
    try {
        const audiobook = await Audiobook.findById(req.params.id);
        if (!audiobook) {
            return res.status(404).json({ message: 'Audiobook not found' });
        }

        console.log('Generating speech for:', audiobook.audioText);

        const mp3 = await openai.audio.speech.create({
            model: 'tts-1',
            voice: 'nova',
            input: audiobook.audioText,
        });

        console.log('Speech generated. Saving to file...');
        const buffer = Buffer.from(await mp3.arrayBuffer());
        const filePath = path.join(__dirname, `../public/audio_${audiobook.name}.mp3`);
        await fs.promises.writeFile(filePath, buffer);


        // Update the audiobook object with the file path
        audiobook.audioFilePath = `/audio_${audiobook.name}.mp3`;
        await audiobook.save();

        res.setHeader('Content-Type', 'audio/mpeg');
        res.sendFile(filePath);
    } catch (error) {
        if (error.code === 'insufficient_quota') {
            console.error('You have exceeded your quota:', error.message);
            return res.status(429).json({ message: 'You have exceeded your API quota. Please check your OpenAI plan.' });
        }
        console.error('Error generating audiobook speech:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all audiobooks
const getAudiobooks = async (req, res) => {
    try {
        const audiobooks = await Audiobook.find().sort({ createdAt: -1 });
        res.status(200).json(audiobooks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving audiobooks', error });
    }
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
        await Audiobook.deleteOne({ _id: req.params.id });
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
    getAudiobookWithSpeech,
    getAudiobooks,
    getAudiobook,
    createAudiobook,
    deleteAudiobook,
    updateAudiobook,
};
