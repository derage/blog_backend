const db = require('../models')
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    db.BlogPost.getPosts({})
        .then(response => next(null, response))
        .catch(next);
        // .then(response => {
        //     res.json(response);
        // })
        // .catch(err => {
        //     res.status(400).json({ error: err });
        // });
});

router.post('/', function(req, res, next) {
    db.BlogPost.savePost(req.body)
        // .then(response => next(null, response))
        // .catch(next);
        .then(function(post){
            res.json(post)
        })
        .catch(function(err){
            console.log(err)
            res.json({err: err.message})
        })
});

router.put('/:postId', function(req, res, next) {
    db.BlogPost.updatePost(req.params.postId, req.body)
        .then(response => next(null, response))
        .catch(next);
});

router.delete('/:postId', function(req, res, next) {
    db.BlogPost.deletePost(req.params.postId)
        .then(response => next(null, response))
        .catch(next);
});

module.exports = router;