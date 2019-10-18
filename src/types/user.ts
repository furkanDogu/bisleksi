export type TUser = {
    _id: string;
    name: string;
    surname: string;
    email: string;
    gameInfo: { gameId: string; scores: number[] }[];
};
