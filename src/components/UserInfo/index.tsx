import React, { createContext, useState, SetStateAction } from 'react';

import { TUser } from '@appTypes/user';

type TUserInfoContext = {
    user: TUser | undefined;
    setUser: React.Dispatch<SetStateAction<TUser | undefined>>;
};

export const UserInfoContext = React.createContext<TUserInfoContext>({
    user: undefined,
    setUser: () => {},
});

const UserInfoProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState<TUser>();

    return (
        <UserInfoContext.Provider value={{ user, setUser }}>{children}</UserInfoContext.Provider>
    );
};

//@ts-ignore
UserInfoProvider.whyDidYouRender = {
    logOnDifferentValues: true,
    trackHooks: true,
};

export default UserInfoProvider;
