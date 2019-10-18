import colors from '@assets/colors';
import style from './style';
import { gameNames, categoryNames } from '@utils/constants';

export const categoryDefinitions = [
    {
        text: 'Hafıza Oyunları',
        imagePath: require('../../images/memory_category.jpg'),
        bgColor: colors.TURQUOISE,
        navigationTag: categoryNames.Memory,
        viewStyle: style.firstCategory,
    },
    {
        text: 'Motor Beceriler',
        imagePath: require('../../images/memory_category.jpg'),
        bgColor: colors.TURQUOISE,
        navigationTag: categoryNames.Motor,
    },
    {
        text: 'Okuma-Yazma Oyunları',
        imagePath: require('../../images/memory_category.jpg'),
        bgColor: colors.TURQUOISE,
        navigationTag: categoryNames.ReadWrite,
    },
    {
        text: 'Sayı Oyunları',
        imagePath: require('../../images/memory_category.jpg'),
        bgColor: colors.TURQUOISE,
        navigationTag: categoryNames.Numbers,
    },
    {
        text: 'Ses Farkındalığı Oyunları',
        imagePath: require('../../images/memory_category.jpg'),
        bgColor: colors.TURQUOISE,
        navigationTag: categoryNames.Voice,
    },
];

export const gameDefinitions: { [key in string]: any[] } = {
    [categoryNames.Memory]: [
        {
            text: 'Renkli Çember',
            imagePath: require('../../images/memory_category.jpg'),
            bgColor: colors.GREEN,
            navigationTag: gameNames.ColorfulCircle,
            viewStyle: style.firstCategory,
        },
    ],
    [categoryNames.Motor]: [],
    [categoryNames.Numbers]: [],
    [categoryNames.ReadWrite]: [],
    [categoryNames.Voice]: [],
};
