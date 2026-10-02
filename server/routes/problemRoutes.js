const express = require('express');
const router = express.Router();
const {
  getProblems,
  createProblem,
  getProblem,
  updateProblem,
  deleteProblem
} = require('../controllers/problemController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.route('/').get(getProblems).post(createProblem);
router.route('/:id').get(getProblem).put(updateProblem).delete(deleteProblem);

module.exports = router;
