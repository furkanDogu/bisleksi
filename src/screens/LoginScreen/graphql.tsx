import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { NavigationStackProp } from 'react-navigation-stack';
import gql from 'graphql-tag';

import LoginScreen from '.';

const MUTATION_LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            access_token
            refresh_token
        }
    }
`;

interface ILoginScreenGQLProps {
    navigation: NavigationStackProp;
}

const LoginScreenGQL = ({ navigation }: ILoginScreenGQLProps) => {
    const [login, { error, data, loading }] = useMutation(MUTATION_LOGIN);

    return (
        <LoginScreen
            navigation={navigation}
            login={values => login({ variables: values })}></LoginScreen>
    );
};

LoginScreenGQL.navigationOptions = {
    header: null,
};

export default LoginScreenGQL;
