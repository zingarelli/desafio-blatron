import { Circle } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { extent } from 'd3-array';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { format } from 'd3-format';

// hardcoded example
// const data = [
//     { x: 3.17487e-06, y: 9.39626e-07 },
//     { x: 3.25783e-06, y: 1.04915e-06 },
//     { x: 3.53491e-06, y: 1.38624e-06 },
//     { x: 3.83897e-06, y: 1.71812e-06 },
//     { x: 4.27607e-06, y: 1.99716e-06 },
//     { x: 4.54426e-06, y: 3.28585e-06 },
//     { x: 4.98355e-06, y: 4.31875e-06 },
//     { x: 5.58070e-06, y: 6.86171e-06 },
//     { x: 5.93676e-06, y: 9.65592e-06 },
//     { x: 8.12075e-06, y: 1.35906e-05 },
//     { x: 9.20511e-06, y: 2.03098e-05 },
//     { x: 1.16847e-05, y: 2.98979e-05 },
//     { x: 1.56254e-05, y: 4.42284e-05 },
//     { x: 2.09746e-05, y: 6.64333e-05 },
//     { x: 3.21013e-05, y: 9.56941e-05 },
// ];

export default function XYChart({ data }) {
    const margin = {
        top: 30, 
        right: 60,
        bottom: 40, 
        left: 60
    }

    // chart dimensions
    const width =  600;
    const height = 450;

    // plot area dimensions (smaller than chart, to make room for axes X and Y)
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    /* 
        Helper functions to map the data (domain) to the range of the chart.
        The function extent() returns min and max values for the passed data,
        the second argument is a callback function to point where the values
        are when the data is an object.
    */
    const scaleX = scaleLinear({ 
        range: [margin.left, innerWidth + margin.left],
        domain: extent(data, d => d.x),
    });

    const scaleY = scaleLinear({ 
        range: [innerHeight + margin.top, margin.top],
        domain: extent(data, d => d.y),
    });

    return (
        <svg width={width} height={height}>
            {/* X and Y Axes */}
            <AxisBottom 
                scale={scaleX}
                label='Axis X'
                top={height-margin.bottom}
                numTicks={5}
            />

            <AxisLeft 
                scale={scaleY}
                label='Axis Y'
                left={margin.left}
                numTicks={5}
            />
            
            {data.map((point, idx) => (
                // cx and cy are the coordinates
                // r is the radius of the circle
                <Circle 
                    key={idx}
                    cx={scaleX(point.x)}
                    cy={scaleY(point.y)}
                    r={2}
                />
            ))}
        </svg>
    )
}