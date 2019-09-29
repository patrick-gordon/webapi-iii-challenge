const express = require('express');
const User = require('./userDb');

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {
    User.get()
    .then(users => {
        res.status(200).json(users);
    })
.catch(err => {
    console.log(err);
    res.status(500).json({error: 'error getting users'});
})
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    User.getById(id)
    .then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).json({error: 'The user with this id could not be found'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'User info could not be found'});
    })
});

router.get('/:id/posts', (req, res) => {
});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    User.getById(id)
    .then(user => {
        if (user) {
            User.update(id, {name})
            .then(updated => {
                res.status(200).json(updated)
            })
        } else {
            res.status(400).json({error: 'user with this id could not be found'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: 'error with the server getting id'})
    })
});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
