import ColorfulCircle from '@games/ColorfulCircle';

const gameDefinitions: { [key in string]: React.FunctionComponent<{ level: number }> } = {
    ColorfulCircle,
};

export default gameDefinitions;
