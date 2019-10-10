import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import LoginScreen from '.';

const MUTATION_LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password)
    }
`;

export default () => {
    const [login, { error, data, loading }] = useMutation(MUTATION_LOGIN);

    return <LoginScreen login={values => login({ variables: values })}></LoginScreen>;
};
