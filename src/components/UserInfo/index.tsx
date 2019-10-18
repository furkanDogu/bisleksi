import React, { createContext, useState } from 'react';

import { TUser } from '@appTypes/user';

type TUserInfoContext = { user: TUser | undefined; setUser: (user: TUser) => void };

export const UserInfoContext = React.createContext<TUserInfoContext>({
    user: undefined,
    setUser: () => {},
});

const UserInfoProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<TUser>();
    return (
        <UserInfoContext.Provider value={{ user: user, setUser }}>
            {children}
        </UserInfoContext.Provider>
    );
};

export default UserInfoProvider;
