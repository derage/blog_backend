import dynamo from "dynamodb"
import AWS from "aws-sdk"


const config = {
    region: AWS.config.region || process.env.SERVERLESS_REGION || 'us-east-1',
};

