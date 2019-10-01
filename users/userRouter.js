const express = require('express');
const User = require('./userDb');
const Post = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
    const { name } = req.body;
    User.insert({name})
    .then(user => res.status(201).json(user))
    .catch(err(err => {
        console.log(err);
        res.status(500).json({error: "Error inserting"})
    }))
});

router.post('/:id/posts', validateUser, validatePost, (req, res) => {
    const post = req.body;
    Post.insert(post)
    .then(post => {
        res.status(200).json(post);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: "Error adding post"})
    });
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

router.get('/:id', validateUserId, (req, res) => {
    // const { id } = req.params;
    res.status(200).json(user);
//     User.getById(id)
//     .then(user => {
//         if (user) {
//             res.status(200).json(user);
//         } else {
//             res.status(400).json({error: 'The user with this id could not be found'});
//         }
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error: 'User info could not be found'});
//     })
});

router.get('/:id/posts', validateUserId, (req, res) => {
    const { id } = req.params;
    User.getUserPosts(id)
    .then(posts => res.status(200).json(posts))
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "Error getting posts"});
    });
});

router.delete('/:id', validateUserId,(req, res) => {
    const { id } = req.user;
    Use.remove(id)
        .then(() => res.status(204).end)
        .catch(err => {
            console.log(err);
            res.status(500).json({error: "error deleting user"})
        })
});

router.put('/:id', validateUserId, (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
        User.update(id, {name})
        .then(updated => {
            if(updated) {
                User.getById(id)
                .then(user => res.status(200).json(user))
                .catch(err => {
                    console.log(err)
                    res.status(500).json({error: "error getting user"})
                });
            }
    })
   .catch(err => {
       console.log(err)
       res.status(500).json({error: " Error getting updated user"});
   });
});


//custom middleware

//HANDLE NEGATIVE RESPONSES IN MIDDLEWARE

function validateUserId(req, res, next) {
const { id } = req.params;
User.getById(id)
    .then(user => {
        req.user = user;
        if (user) {
            next();
        } else {
            res.status(404).json({error: "user with this id does not exist"})
        };
    });
};

function validateUser(req, res, next) {
    const {name} = req.body;
 if (!name) {
     return res.status(400).json({error: "name required"});
 }
if (typeof name !== 'string'){
    return res.status(400).json({error: "Name must be a string"});
}
next();
};

function validatePost(req, res, next) {
    const {id: user_id}= req.params;
    const {text} = req.body;
    if (req.body) {
        return res.status(400).json({error: "post requires body"})
    }
    if(!text) {
        return res.status(400).json({error: "post requires text"})
    }
    next();
};

module.exports = router;
