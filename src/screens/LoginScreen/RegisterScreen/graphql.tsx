import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import RegisterScreen from '.';

const MUTATION_REGISTER = gql`
    mutation Register(
        $name: String!
        $surname: String!
        $email: String!
        $password: String!
        $birthday: String!
    ) {
        register(
            name: $name
            surname: $surname
            email: $email
            password: $password
            birthday: $birthday
        ) {
            access_token
            refresh_token
        }
    }
`;
interface IRegisterScreenGQLProps {
    isVisible: boolean;
    toggleVisible: () => void;
    navigation: NavigationStackProp;
}

const RegisterScreenGQL = ({ isVisible, toggleVisible, navigation }: IRegisterScreenGQLProps) => {
    const [register] = useMutation(MUTATION_REGISTER);
    return (
        <RegisterScreen
            {...{ isVisible, toggleVisible, navigation }}
            register={values => register({ variables: values })}></RegisterScreen>
    );
};

export default RegisterScreenGQL;
