const { Thoughts, Users } = require('../models');

const tController = {
    createThoughts({ params, body }, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({_id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(400).json({message: 'None found.'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },

    getThoughts(req, res) {
        Thoughts.find({})
        .populate({ path: 'reactions'})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            res.status(500).json(err)
        });
    },

    getThoughtsById({params}, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({ path: 'reactions'})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'None found.' })
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => {
            res.sendStatus(400);
        });
    },

    updateThoughts({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
        .populate({ path: 'reactions' })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'none found'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },

    deleteThoughts({ params }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id })
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'None found'})
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.status(400).json(err));
    },

    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtId}, {$push: {reactions: body}}, { new: true, runValidators: true })
        .populate({ path: 'reactions' })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'none found'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },

    deleteReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({message: 'none found'});
                return;
            }
            res.json(dbThoughtData)
        })
        .catch(err => res.json(err))
    },
} 

module.exports = tController;