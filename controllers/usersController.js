const { Users, Thoughts } = require('../models');
const thoughtsController = require('./thoughtsController');

const usersController = {
    getAllUsers(req, res) {
        Users.find()
        .then(async(usersData) => {
            res.json(usersData)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },
    
    getUserById(req, res) {
        Users.findOne({
            _id: req.params.userId
        })
        // .populate("Friends")
        .populate("Thoughts")
        .then(async(usersData) => {
            if (!usersData) {
                return res.status(404).json({message: "User not found"})
            }
            res.json(usersData)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },

    removeUser(req, res) {
        Users.findOneAndDelete({
            _id: req.params.userId
        })
        .then(async(usersData) => {
            if (!usersData) {
                return res.status(404).json({message: "User not found"})
            }
            return Thoughts.deleteMany({_id: {$in: usersData.Thoughts}})
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },

    addUser(req, res) {
        Users.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        Users.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
          )
            .then((usersData) =>
              !usersData
                ? res
                    .status(404)
                    .json({ message: 'No User found with that id!' })
                : res.json(usersData)
            )
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = usersController; 