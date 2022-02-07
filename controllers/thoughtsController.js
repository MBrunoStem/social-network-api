const { Thoughts, Users } = require('../models');

const thoughtsController = {
    getAllThoughts (req, res) {
        Thoughts.find()
        .then(async(thoughtsData) => {
            res.json(thoughtsData)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },

    getThoughtById (req, res) {
        Thoughts.findOne({
            _id: req.params.userId
        })
        .populate("Users")
        .populate("Reactions")
        .then(async(thoughtsData) => {
            if (!thoughtsData) {
                return res.status(404).json({message: "Thought not found"})
            }
            res.json(thoughtsData)
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },

    removeThought (req, res) {
        Thoughts.findOneAndDelete({
            _id: req.params.userId
        })
        .then(async(thoughtsData) => {
            if (!thoughtsData) {
                return res.status(404).json({message: "Thought not found"})
            }
            return Thoughts.deleteMany({_id: {$in: thoughtsData.Thoughts}})
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
          });
    },

    addThought (req, res) {
        Thoughts.create(req.body)
        .then((thoughtsData) => res.json(thoughtsData))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },

    updateThought (req, res) {
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $set: req.body },
            { runValidators: true, new: true }
          )
            .then((thoughtsData) =>
              !thoughtsData
                ? res.status(404).json({ message: 'No Thought with this id!' })
                : res.json(thoughtsData)
            )
            .catch((err) => res.status(500).json(err));
        },
};

module.exports = thoughtsController;