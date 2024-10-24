const express = require('express')
const {
  getAudiobookWithSpeech,
  getAudiobooks,
  getAudiobook,
  createAudiobook,
  deleteAudiobook,
  updateAudiobook
} = require('../controllers/audiobookController')

const router = express.Router()


router.get('/:id/speech', getAudiobookWithSpeech);

// GET all audiobooks
router.get('/', getAudiobooks)

//GET a single audiobook
router.get('/:id', getAudiobook)

// POST a new audiobook
router.post('/', createAudiobook)

// DELETE an audiobook
router.delete('/:id', deleteAudiobook)

// UPDATE an audiobook
router.patch('/:id', updateAudiobook)

module.exports = router