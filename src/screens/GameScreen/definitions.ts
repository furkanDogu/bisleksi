import { NavigationStackProp } from 'react-navigation-stack';

import ColorfulCircle from '@games/ColorfulCircle';
import { WithApolloClient } from '@apollo/react-hoc';

const gameDefinitions: {
    [key in string]: React.FunctionComponent<
        WithApolloClient<{ level: number; navigation: NavigationStackProp }>
    >;
} = {
    ColorfulCircle,
};

export default gameDefinitions;
