const { Users } = require('../models')

const uController = {

    createUser({body}, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => res.status(400).json(err))
    },

    getAllUsers(req, res) {
        Users({})
        .populate({path: 'thoughts'})
        .populate({path: 'friends'})
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            res.status(500).json(err)
        })
    }




}