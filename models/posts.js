const dynamo =  require("dynamodb")
const Joi = require("joi")

function printResults (err, resp) {
  if(err) {
    console.log('Error running scan', err);
  } else {
    return resp.Items
  }
}

class BlogPost {
    constructor() {
        this.model = dynamo.define('BlogPost', {
            hashKey : 'id',
            rangeKey : 'createdAt',
            timestamps : true,
            schema : {
                id : dynamo.types.uuid(),
                email   : Joi.string().email(),
                title   : Joi.string(),
                content : Joi.binary(),
                details : Joi.string(),
                tags   : dynamo.types.stringSet(),
            },
            tableName: process.env.TABLE_NAME
        })
    }

    getPosts() {
        const model = this.model
        return new Promise(function (fulfill, reject){
            model.scan().loadAll().exec( (err, resp) =>{
                  if(err) {
                    console.log('Error running scan', err);
                    reject(err)
                  } else {
                    fulfill({Items: resp.Items})
                  }
            })
        });
    }
    savePost(post) {
         // OK why does this need to be here? What the heck? the method doesnt have access unless this is here?
        const model = this.model
        return new Promise(function (fulfill, reject){
            const date = Date.now();
            // const id = date.toString();
            const payload = Object.assign({}, post, date );
            model.create(payload,function (err, createdPost) {
                if(err){
                    reject(err)
                } else {
                    fulfill(createdPost)
                }

            })
        });

    }

    updatePost( id, body) {
        const model = this.model
        return new Promise(function (fulfill, reject){
            const payload = Object.assign({}, {id: id}, body );
            model.update(payload,function (err, createdPost) {
                if(err){
                    reject(err)
                } else {
                    fulfill(createdPost)
                }
            })
        }).then((post) => ({ post: post }));
    }

    deletePost(id) {
        const model = this.model
        return new Promise(function (fulfill, reject){
            model.destroy(id,function (err) {
                if(err){
                    reject(err)
                } else {
                    fulfill({id: id})
                }
            })
        }).then((post) => ({ post: post }));
    }
}

module.exports = BlogPost;
