import gql from 'graphql-tag';

// FIXME: add here all required fields for user and create a context to keep user information in.
export const QUERY_USER = gql`
    query User($userId: String!) {
        user(userId: $userId) {
            _id
            name
        }
    }
`;
