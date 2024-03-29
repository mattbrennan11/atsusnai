/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
    "aws_project_region": "us-east-1",
    "aws_cloud_logic_custom": [
        {
            "name": "partycountapi",
            "endpoint": "https://0rxrw7mny9.execute-api.us-east-1.amazonaws.com/staging",
            "region": "us-east-1"
        },
        {
            "name": "partyapi",
            "endpoint": "https://k2oueyp3s2.execute-api.us-east-1.amazonaws.com/staging",
            "region": "us-east-1"
        },
        {
            "name": "faqapi",
            "endpoint": "https://gwrtt7ng68.execute-api.us-east-1.amazonaws.com/staging",
            "region": "us-east-1"
        },
        {
            "name": "councillorsapi",
            "endpoint": "https://ybpene4cl6.execute-api.us-east-1.amazonaws.com/staging",
            "region": "us-east-1"
        },
        {
            "name": "discussionapi",
            "endpoint": "https://u7094jl2y1.execute-api.us-east-1.amazonaws.com/staging",
            "region": "us-east-1"
        }
    ],
    "aws_cognito_identity_pool_id": "us-east-1:1b7a2397-da9c-4cb8-9622-578be703af78",
    "aws_cognito_region": "us-east-1",
    "aws_user_pools_id": "us-east-1_eHnRSN3jK",
    "aws_user_pools_web_client_id": "747qokjfqkbueg3r489gqtbkep",
    "oauth": {},
    "aws_cognito_username_attributes": [],
    "aws_cognito_social_providers": [],
    "aws_cognito_signup_attributes": [
        "EMAIL"
    ],
    "aws_cognito_mfa_configuration": "OFF",
    "aws_cognito_mfa_types": [
        "SMS"
    ],
    "aws_cognito_password_protection_settings": {
        "passwordPolicyMinLength": 8,
        "passwordPolicyCharacters": []
    },
    "aws_cognito_verification_mechanisms": [
        "EMAIL"
    ],
    "aws_user_files_s3_bucket": "councillorsbucket",
    "aws_user_files_s3_bucket_region": "us-east-1",
    "aws_dynamodb_all_tables_region": "us-east-1",
    "aws_dynamodb_table_schemas": [
        {
            "tableName": "partycount-staging",
            "region": "us-east-1"
        },
        {
            "tableName": "party-staging",
            "region": "us-east-1"
        },
        {
            "tableName": "faq-staging",
            "region": "us-east-1"
        },
        {
            "tableName": "councillors-staging",
            "region": "us-east-1"
        },
        {
            "tableName": "discussion-staging",
            "region": "us-east-1"
        }
    ]
};


export default awsmobile;
