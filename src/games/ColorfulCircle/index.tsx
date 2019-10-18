import React, { useContext } from 'react';
import { View, Text } from 'react-native';

import Pie from '@components/Pie';
import { UserInfoContext } from '@components/UserInfo';

import { TUser } from '@appTypes/user';

interface IColorfulCircleProps {
    level: number;
}

const ColorfulCircle: React.FC<IColorfulCircleProps> = ({ level }) => {
    const { user } = useContext(UserInfoContext);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Pie
                size={200}
                data={[
                    {
                        number: 1,
                        color: '#fc5c65',
                    },
                    {
                        number: 1,
                        color: '#fed330',
                    },
                    {
                        number: 1,
                        color: '#26de81',
                    },
                    {
                        number: 1,
                        color: '#4b7bec',
                    },
                    {
                        number: 1,
                        color: '#a55eea',
                    },
                ]}
            />
        </View>
    );
};

export default ColorfulCircle;
