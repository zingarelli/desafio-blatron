import { Circle } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { extent } from 'd3-array';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { format } from 'd3-format';

// TODO: pass data as props
const data = [
    { x: 0.00000e+00, y: +1.00000e+01 },
    { x: 1.00000e+00, y: +1.58000e+01 },
    { x: 2.00000e+00, y: +2.51000e+01 },
    { x: 3.00000e+00, y: +3.98000e+01 },
    { x: 4.00000e+00, y: +6.31000e+01 },
    { x: 5.00000e+00, y: +1.00000e+02 },
    { x: 6.00000e+00, y: +1.58500e+02 },
    { x: 7.00000e+00, y: +2.51200e+02 },
    { x: 8.00000e+00, y: +3.98100e+02 },
    { x: 9.00000e+00, y: +6.31000e+02 },
    { x: 1.00000e+01, y: +1.00000e+03 },
    { x: 1.10000e+01, y: +1.58490e+03 },
    { x: 1.20000e+01, y: +2.51190e+03 },
    { x: 1.30000e+01, y: +3.98110e+03 },
    { x: 1.40000e+01, y: +6.30960e+03 },
];

export default function XYChart() {
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
        the second argument is a callback function to which value to extract
        when the data is an object    
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
                tickFormat={format('.2f')}
            />

            <AxisLeft 
                scale={scaleY}
                label='Axis Y'
                left={margin.left}
                numTicks={5}
                tickFormat={format('.2f')}
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