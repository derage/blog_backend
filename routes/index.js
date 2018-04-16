var express = require('express');
var router = express.Router();

const BlogStorage = require('./BlogStorage');
const AWS = require('aws-sdk');

const config = {
    region: AWS.config.region || process.env.SERVERLESS_REGION || 'eu-west-1',
};

const dynamodb = new AWS.DynamoDB.DocumentClient(config);


const storage = new BlogStorage(dynamodb);

/* GET home page. */
router.get('/', function(req, res, next) {
    storage.getPosts({})
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            res.status(400).json({ error: err });
        });
});

router.post('/', function(req, res, next) {
    storage.savePost(req.body)
        .then(function(post){
            res.json(post)
        })
        .catch(function(err){
            res.send(err)
        })
});

router.put('/:postId', function(req, res, next) {
    storage.updatePost(req.params.postId, req.body)
        .then(response => next(null, response))
        .catch(next);
});

router.delete('/:postId', function(req, res, next) {
    storage.deletePost(req.params.postId)
        .then(response => next(null, response))
        .catch(next);
});

module.exports = router;