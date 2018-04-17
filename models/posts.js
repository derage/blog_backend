const dynamo =  require("dynamodb")
const Joi = require("joi")

class BlogPost {
    constructor() {
        this.model = dynamo.define('BlogPost', {
            hashKey : 'id',
            schema : {
                id : dynamo.types.uuid(),
                email   : Joi.string().email(),
                title   : Joi.string(),
                content : Joi.binary(),
                details : Joi.string(),
                tags   : dynamo.types.stringSet(),
                timestamps : true,
            }
        })
        this.model.config({tableName: process.env.TABLE_NAME})

    }

    getPosts() {
        const model = this.model
        return new Promise(function (fulfill, reject){
            let returnhash = model.scan().loadAll()
            fulfill(returnhash)
        });
    }

    savePost(post) {
        const model = this.model
        return new Promise(function (fulfill, reject){
            const date = Date.now();
            // const id = date.toString();
            const payload = Object.assign({}, post,  id, date );
            console.log(`created ${payload}`)
            model.create(payload,function (err, createdPost) {
                if(err){
                    reject(err)
                } else {
                    fulfill(createdPost)
                }

            })
        });

    }

    updatePost(post) {
        return this.model.update(post).promise()
            .then((post) => ({ post: post }));
    }

    deletePost(id) {
        return this.model.destroy(id).promise();
    }
}

module.exports = BlogPost;
