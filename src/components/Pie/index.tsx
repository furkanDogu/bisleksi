import React from 'react';
import { G, Svg } from 'react-native-svg';

import Slice from './Slice';

interface IPieProps {
    data: any;
    size: number;
}

const Pie: React.FC<IPieProps> = ({ data, size }) => {
    return (
        <Svg width={size} height={size} viewBox={`-100 -100 200 200`}>
            <G>
                {data.map((item: any, index: number) => {
                    return <Slice index={index} color={item.color} data={data} key={index} />;
                })}
            </G>
        </Svg>
    );
};

export default Pie;
