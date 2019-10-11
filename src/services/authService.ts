import { AsyncStorage } from 'react-native';
import jwt_decode from 'jwt-decode';
import { TTokenPayload } from 'types/auth';

export const setToken = async (name: string, token: string) => {
    try {
        await AsyncStorage.setItem(name, token);
        return true;
    } catch (e) {
        return false;
    }
};

export const getToken = async (name: string) => {
    try {
        const token = await AsyncStorage.getItem(name);
        return token;
    } catch (e) {
        return null;
    }
};

export const decodeToken = (token: string): TTokenPayload => {
    return jwt_decode(token);
};
