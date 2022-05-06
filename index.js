import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';
import {
  csv,
  arc,
  pie,
  scaleBand,
  scaleLinear,
  max,
} from 'd3';

const width = window.innerWidth;
const height = window.innerHeight;
const margin = {
  top: 20,
  bottom: 20,
  right: 20,
  left: 200,
};
const csvUrl =
  'https://gist.githubusercontent.com/mbdev3/5afb40dbdcd3d75d69dd38b9d61bbb11/raw/3b771570b7278d39e8c6c54148a2ac602019e09b/wpp2020.csv';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.population = +d['2020'];
      return d;
    };
    csv(csvUrl, row).then((data) => {
      setData(data.slice(0, 10));
    });
  }, []);

  if (!data) {
    return <pre>loading..</pre>;
  }

  const innerHeight =
    height - margin.top - margin.bottom;
  const innerWidth =
    width - margin.right - margin.left;
  const yScale = scaleBand()
    .domain(data.map((d) => d.country))
    .range([0, innerHeight]);
  const xScale = scaleLinear()
    .domain([0, max(data, (d) => d.population)])
    .range([0, innerWidth]);
  const dy = innerHeight /data.length /2
  console.log(dy)
  return (
    <svg width={width} height={height}>
      <g
        transform={`translate(${margin.left},${margin.top})`}
      >
        {xScale.ticks().map((tickValue) => (
          <g key ={tickValue}
            transform={`translate(${xScale(
              tickValue
            )},0)`}
          >
            <line
              y2={innerHeight}
              stroke="black"
            />
            <text
              style={{ textAnchor: 'middle' }}
              y={innerHeight + 5}
              dy="0.71rem"
            >
              {tickValue}
            </text>
          </g>
        ))}
        {yScale.domain().map((tickValue) => (
          
            
            <text
              key ={tickValue}
              style={{ textAnchor: 'end' }}
              x={-5}
            	dy=".32em"
             
             y = {yScale(tickValue)+yScale.bandwidth()/2}
            >
              {tickValue}
            </text>
          
        ))}
        {data.map((d) => (
          <rect
            key ={d.country}
            x={0}
            y={yScale(d.country)}
            width={xScale(d.population)}
            height={yScale.bandwidth()}
          />
        ))}
      </g>
    </svg>
  );
};

const rootElement = document.getElementById(
  'root'
);
ReactDOM.render(<App />, rootElement);
