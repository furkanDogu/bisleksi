import React from 'react';
import { Path } from 'react-native-svg';
import * as shape from 'd3-shape';
const d3 = { shape };

interface ISliceProps {
    color: string;
    index: number;
    data: any;
}

const Slice: React.FC<ISliceProps> = ({ data, index, color }) => {
    const arcGenerator = d3.shape
        .arc()
        .outerRadius(100)
        .padAngle(0)
        .innerRadius(50)
        .cornerRadius(2)
        .padAngle(0.2)
        .padRadius(20);

    const createPieArc = (index: number, data: any) => {
        const arcs = d3.shape
            .pie()
            //@ts-ignore
            .value(item => item.number)
            .startAngle(0)
            .endAngle(Math.PI * 2)(data);
        //@ts-ignore
        return arcGenerator(arcs[index]);
    };

    return <Path d={createPieArc(index, data)} fill={color} />;
};

export default Slice;
