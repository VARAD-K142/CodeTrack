const mongoose = require('mongoose');

const codingProblemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    title: {
      type: String,
      required: [true, 'Problem title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    language: {
      type: String,
      required: [true, 'Programming language is required'],
      enum: {
        values: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'C#', 'Go', 'Other'],
        message: 'Invalid programming language'
      }
    },
    difficulty: {
      type: String,
      required: [true, 'Difficulty level is required'],
      enum: {
        values: ['Easy', 'Medium', 'Hard'],
        message: 'Difficulty must be Easy, Medium, or Hard'
      }
    },
    platform: {
      type: String,
      required: [true, 'Platform is required'],
      enum: {
        values: ['LeetCode', 'HackerRank', 'CodeChef', 'GeeksforGeeks', 'Codeforces', 'InterviewBit', 'Other'],
        message: 'Invalid platform'
      }
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: {
        values: ['Not Started', 'In Progress', 'Completed'],
        message: 'Status must be Not Started, In Progress, or Completed'
      },
      default: 'Not Started'
    },
    problemUrl: {
      type: String,
      trim: true,
      default: ''
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
      default: ''
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('CodingProblem', codingProblemSchema);
