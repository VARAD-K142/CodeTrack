const CodingProblem = require('../models/CodingProblem');

// @desc    Get dashboard stats for logged-in user
// @route   GET /api/dashboard/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const problems = await CodingProblem.find({ userId });

    const total = problems.length;
    const completed = problems.filter((p) => p.status === 'Completed').length;
    const inProgress = problems.filter((p) => p.status === 'In Progress').length;
    const notStarted = problems.filter((p) => p.status === 'Not Started').length;

    const easy = problems.filter((p) => p.difficulty === 'Easy').length;
    const medium = problems.filter((p) => p.difficulty === 'Medium').length;
    const hard = problems.filter((p) => p.difficulty === 'Hard').length;

    const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Language-wise counts
    const languageCounts = {};
    problems.forEach((p) => {
      languageCounts[p.language] = (languageCounts[p.language] || 0) + 1;
    });
    const languageStats = Object.entries(languageCounts).map(([name, count]) => ({
      name,
      count
    }));

    // Platform-wise counts
    const platformCounts = {};
    problems.forEach((p) => {
      platformCounts[p.platform] = (platformCounts[p.platform] || 0) + 1;
    });
    const platformStats = Object.entries(platformCounts).map(([name, count]) => ({
      name,
      count
    }));

    // Recent 5 problems
    const recentProblems = await CodingProblem.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        total,
        completed,
        inProgress,
        notStarted,
        easy,
        medium,
        hard,
        completionPercentage,
        languageStats,
        platformStats,
        recentProblems
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Unable to load dashboard statistics' });
  }
};

module.exports = { getDashboardStats };
