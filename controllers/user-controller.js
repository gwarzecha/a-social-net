const { json } = require('express');
const { User } = require('../models');

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .then(dbUserData => {
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // GET a single user by _id
  getUserById({ params }, res) {
    User.findOne({ _id: params.userId })
      .populate([
        {
          path: 'thoughts',
          select: '-__v'
        },
        {
          path: 'friends',
          select: '-__v'
        }
      ])
      .select('-__v')
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // CREATE a new user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(404).json(err));
  },

  // Update a user by _id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.userId },
      body,
      { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  // DELETE a user by _id
  deleteUser({ params }, res) {
    User.findOneAndDelete(
      { _id: params.userId }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },

  createFriend({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  },
  //uopdate user by deleting the exisiting friends from it 
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData)
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
  }
};

module.exports = userController;