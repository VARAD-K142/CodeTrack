const CodingProblem = require('../models/CodingProblem');
const mongoose = require('mongoose');

const validId = (id) => mongoose.Types.ObjectId.isValid(id);

// @desc    Get all problems for logged-in user
// @route   GET /api/problems
// @access  Private
const getProblems = async (req, res) => {
  try {
    const problems = await CodingProblem.find({ userId: req.user._id }).sort({
      createdAt: -1
    });
    res.json({ success: true, count: problems.length, problems });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to load problems' });
  }
};

// @desc    Create a new coding problem
// @route   POST /api/problems
// @access  Private
const createProblem = async (req, res) => {
  try {
    const { title, language, difficulty, platform, status, problemUrl, notes } = req.body;

    if (!title || !language || !difficulty || !platform || !status) {
      return res
        .status(400)
        .json({ success: false, message: 'Please provide title, language, difficulty, platform and status' });
    }

    if (problemUrl && problemUrl.trim() !== '') {
      try {
        new URL(problemUrl);
      } catch {
        return res
          .status(400)
          .json({ success: false, message: 'Please provide a valid problem URL (include https://)' });
      }
    }

    const problem = await CodingProblem.create({
      userId: req.user._id,
      title: title.trim(),
      language,
      difficulty,
      platform,
      status,
      problemUrl: problemUrl ? problemUrl.trim() : '',
      notes: notes ? notes.trim() : ''
    });

    res.status(201).json({ success: true, problem });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join('. ') });
    }
    res.status(500).json({ success: false, message: 'Unable to create problem' });
  }
};

// @desc    Get a single problem
// @route   GET /api/problems/:id
// @access  Private
const getProblem = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid problem ID' });
    const problem = await CodingProblem.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    res.json({ success: true, problem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to load problem' });
  }
};

// @desc    Update a coding problem
// @route   PUT /api/problems/:id
// @access  Private
const updateProblem = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid problem ID' });
    const problem = await CodingProblem.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    const { title, language, difficulty, platform, status, problemUrl, notes } = req.body;

    if (problemUrl && problemUrl.trim() !== '') {
      try {
        new URL(problemUrl);
      } catch {
        return res
          .status(400)
          .json({ success: false, message: 'Please provide a valid problem URL (include https://)' });
      }
    }

    if (title !== undefined) problem.title = title.trim();
    if (language !== undefined) problem.language = language;
    if (difficulty !== undefined) problem.difficulty = difficulty;
    if (platform !== undefined) problem.platform = platform;
    if (status !== undefined) problem.status = status;
    if (problemUrl !== undefined) problem.problemUrl = problemUrl.trim();
    if (notes !== undefined) problem.notes = notes.trim();

    const updated = await problem.save();
    res.json({ success: true, problem: updated });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join('. ') });
    }
    res.status(500).json({ success: false, message: 'Unable to update problem' });
  }
};

// @desc    Delete a coding problem
// @route   DELETE /api/problems/:id
// @access  Private
const deleteProblem = async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ success: false, message: 'Invalid problem ID' });
    const problem = await CodingProblem.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    await problem.deleteOne();
    res.json({ success: true, message: 'Problem deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to delete problem' });
  }
};

module.exports = { getProblems, createProblem, getProblem, updateProblem, deleteProblem };
