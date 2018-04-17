const dynamo =  require("dynamodb")
const AWS = require( "aws-sdk")


const config = {
    region: AWS.config.region || process.env.SERVERLESS_REGION || 'us-east-1',
};

dynamo.AWS.config.update(config);

const posts = require("./posts")
const blogpost = new posts()

module.exports.BlogPost = blogpost
module.exports.dynamo = dynamo