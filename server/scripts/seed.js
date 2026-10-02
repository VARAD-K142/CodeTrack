/**
 * Seed Script - Adds sample coding problems for a demo user.
 * Usage: node scripts/seed.js
 * Creates a demo user (demo@codetrack.com / demo1234) if not exists,
 * then adds 10 sample problems if they don't already exist.
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const CodingProblem = require('../models/CodingProblem');

const sampleProblems = [
  {
    title: 'Two Sum',
    language: 'Python',
    difficulty: 'Easy',
    platform: 'LeetCode',
    status: 'Completed',
    problemUrl: 'https://leetcode.com/problems/two-sum/',
    notes: 'Use a hashmap to store complements. O(n) time complexity.'
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    language: 'Java',
    difficulty: 'Medium',
    platform: 'LeetCode',
    status: 'Completed',
    problemUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    notes: 'Sliding window approach with a HashSet.'
  },
  {
    title: 'Merge Sort Implementation',
    language: 'C++',
    difficulty: 'Medium',
    platform: 'GeeksforGeeks',
    status: 'Completed',
    problemUrl: 'https://www.geeksforgeeks.org/merge-sort/',
    notes: 'Divide and conquer. O(n log n) time, O(n) space.'
  },
  {
    title: 'Binary Search Tree Validation',
    language: 'JavaScript',
    difficulty: 'Medium',
    platform: 'LeetCode',
    status: 'In Progress',
    problemUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
    notes: 'Inorder traversal should yield sorted array.'
  },
  {
    title: 'Fibonacci Number',
    language: 'C',
    difficulty: 'Easy',
    platform: 'HackerRank',
    status: 'Completed',
    problemUrl: 'https://www.hackerrank.com/challenges/fibonacci-modified/problem',
    notes: 'Dynamic programming approach. Store previous two values.'
  },
  {
    title: 'Graph BFS Traversal',
    language: 'Java',
    difficulty: 'Medium',
    platform: 'CodeChef',
    status: 'In Progress',
    problemUrl: 'https://www.codechef.com/problems/BFS',
    notes: 'Use a queue. Mark visited nodes to avoid cycles.'
  },
  {
    title: 'Trapping Rain Water',
    language: 'Python',
    difficulty: 'Hard',
    platform: 'LeetCode',
    status: 'Not Started',
    problemUrl: 'https://leetcode.com/problems/trapping-rain-water/',
    notes: ''
  },
  {
    title: 'N-Queens Problem',
    language: 'C++',
    difficulty: 'Hard',
    platform: 'Codeforces',
    status: 'Not Started',
    problemUrl: 'https://codeforces.com/problemset/problem/5/B',
    notes: 'Backtracking approach needed.'
  },
  {
    title: 'Reverse Linked List',
    language: 'JavaScript',
    difficulty: 'Easy',
    platform: 'LeetCode',
    status: 'Completed',
    problemUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    notes: 'Iterative: use three pointers (prev, curr, next).'
  },
  {
    title: 'Kadane Algorithm - Maximum Subarray',
    language: 'Python',
    difficulty: 'Medium',
    platform: 'InterviewBit',
    status: 'Completed',
    problemUrl: 'https://www.interviewbit.com/problems/max-sum-contiguous-subarray/',
    notes: "Track currentMax and globalMax. Classic Kadane's algorithm."
  }
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create or find demo user
    let demoUser = await User.findOne({ email: 'demo@codetrack.com' });
    if (!demoUser) {
      demoUser = await User.create({
        name: 'Demo User',
        email: 'demo@codetrack.com',
        password: 'demo1234'
      });
      console.log('Demo user created: demo@codetrack.com / demo1234');
    } else {
      console.log('Demo user already exists');
    }

    // Check if problems already seeded
    const existingCount = await CodingProblem.countDocuments({ userId: demoUser._id });
    if (existingCount > 0) {
      console.log(`Demo user already has ${existingCount} problems. Skipping seed.`);
      process.exit(0);
    }

    // Insert sample problems
    const problemsWithUserId = sampleProblems.map((p) => ({
      ...p,
      userId: demoUser._id
    }));

    await CodingProblem.insertMany(problemsWithUserId);
    console.log(`Successfully seeded ${sampleProblems.length} sample problems for demo user!`);
    console.log('\nDemo credentials:');
    console.log('  Email:    demo@codetrack.com');
    console.log('  Password: demo1234');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
};

seed();
