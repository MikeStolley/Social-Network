const { Users } = require('../models')

const uController = {

    createUser({body}, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err))
    },

    getAllUsers(req, res) {
        Users.find({})
        .populate({path: 'thoughts'})
        .populate({path: 'friends'})
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            res.status(500).json(err)
        })
    },

    getUsersById({params}, res) {
        Users.findOne({_id: params.id })
        .populate({path: 'thoughts'})
        .populate({path: 'friends'})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'None found' })
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },

    updateUser({params, body}, res) {
        Users.findOneAndUpdate({_id: params.id }, body, {new: true, runValidators: true})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'None found' })
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },

    deleteUser({params}, res) {
        Users.findOneAndDelete({_id: params.id })
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'None found' })
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    }
};

module.exports = uController;