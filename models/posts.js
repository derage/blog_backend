import dynamo from "dynamodb"


const BlogPost = dynamo.define('BlogPost', {
    hashKey : 'PostId',
    rangeKey : 'email',
    schema : {
        PostId : dynamo.types.uuid(),
        email   : Joi.string().email(),
        title   : Joi.string(),
        content : Joi.binary(),
        details : Joi.string(),
        tags   : dynamo.types.stringSet(),
        timestamps : true,
    }
});

module.exports = BlogPost;
