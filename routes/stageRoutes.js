const express = require('express');
const router = express.Router();
const StageEntry = require('../models/StageEntry');

/**
 * @swagger
 * tags:
 *   name: Stages
 *   description: The stage managing API
 */

// ==========================================
// C - CREATE (POST)
// ==========================================

/**
 * @swagger
 * /api/stages:
 *   post:
 *     summary: Create a new stage
 *     tags: [Stages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StageEntry'
 *     responses:
 *       201:
 *         description: The stage was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StageEntry'
 *       400:
 *         description: Validation error
 */
router.post('/', async (req, res) => {
    try {
        const newEntry = new StageEntry(req.body);
        const savedEntry = await newEntry.save();
        res.status(201).json(savedEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ==========================================
// R - READ ALL (GET)
// ==========================================

/**
 * @swagger
 * /api/stages:
 *   get:
 *     summary: Returns the list of all stages
 *     tags: [Stages]
 *     responses:
 *       200:
 *         description: The list of stages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StageEntry'
 */
router.get('/', async (req, res) => {
    try {
        const entries = await StageEntry.find().sort({ date: -1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ==========================================
// R - READ ONE (GET by ID)
// ==========================================

/**
 * @swagger
 * /api/stages/{id}:
 *   get:
 *     summary: Get a stage by ID
 *     tags: [Stages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The stage ID
 *     responses:
 *       200:
 *         description: The stage description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StageEntry'
 *       404:
 *         description: Stage not found
 */
router.get('/:id', async (req, res) => {
    try {
        const entry = await StageEntry.findById(req.params.id);
        if (!entry) return res.status(404).json({ message: 'Stage not found' });
        res.json(entry);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ==========================================
// U - UPDATE (PUT)
// ==========================================

/**
 * @swagger
 * /api/stages/{id}:
 *   put:
 *     summary: Update a stage by ID
 *     tags: [Stages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The stage ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StageEntry'
 *     responses:
 *       200:
 *         description: The stage was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StageEntry'
 *       404:
 *         description: Stage not found
 *       500:
 *         description: Server error
 */
router.put('/:id', async (req, res) => {
    try {
        // { new: true } returns the updated document
        // { runValidators: true } ensures rules like "maxLength" are checked again
        const updatedEntry = await StageEntry.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedEntry) return res.status(404).json({ message: 'Stage not found' });
        res.json(updatedEntry);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// ==========================================
// D - DELETE (DELETE)
// ==========================================

/**
 * @swagger
 * /api/stages/{id}:
 *   delete:
 *     summary: Remove a stage by ID
 *     tags: [Stages]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The stage ID
 *     responses:
 *       200:
 *         description: The stage was deleted
 *       404:
 *         description: Stage not found
 */
router.delete('/:id', async (req, res) => {
    try {
        const entry = await StageEntry.findByIdAndDelete(req.params.id);
        if (!entry) return res.status(404).json({ message: 'Stage not found' });
        
        res.json({ message: 'Stage deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ==========================================
// IMPORT MULTIPLE (BATCH / SEED)
// ==========================================

/**
 * @swagger
 * /api/stages/seed:
 *   post:
 *     summary: Import a list of stages (Batch Insert)
 *     tags: [Stages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/StageEntry'
 *     responses:
 *       201:
 *         description: All stages successfully imported
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StageEntry'
 *       400:
 *         description: Error importing data
 */
router.post('/seed', async (req, res) => {
    try {
        // req.body must be an ARRAY of objects
        const savedEntries = await StageEntry.insertMany(req.body);
        res.status(201).json(savedEntries);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;