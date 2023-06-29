import { useEffect, useState } from 'react';
import './App.css';
import { getColumns, getValuesFromColumn } from './utils/DataExtractor';
import XYChart from './components/XYChart';
import Select from './components/Select';

// we're reading the file locally
const fileSrc = '/data/results.txt';

function App() {
  const [columns, setColumns] = useState([]);
  const [dataX, setDataX] = useState([]);
  const [dataY, setDataY] = useState([]);
  // coordinates is an array of objects [{x: value, y: value}, ...]
  const [coordinates, setCoordinates] = useState([]);
  // options for the marker (radius and color)
  const [chartOptions, setChartOptions] = useState({});

  // get columns from file when the app loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = await getColumns(fileSrc);
        setColumns(headers);
      }
      catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  // update the coordinates when data for axes X or Y changes
  useEffect(() => {
    function updateCoordinates() {
      const newCoordinates = [];

      // iterate dataX and dataY to create new coordinate objects
      for (let i = 0; i < dataX.length; i++) {
        newCoordinates.push({ x: dataX[i], y: dataY[i] })
      }

      setCoordinates(newCoordinates);
    }

    updateCoordinates();
  }, [dataX, dataY])

  // get data for the selected column
  async function changeAxisData(column, axis) {
    // check if it's not the default (empty) select option
    if (column) {
      // get an array of values
      const values = await getValuesFromColumn(column, fileSrc);

      // update values of the given axis
      axis.toLowerCase() === 'x'
        ? setDataX(values)
        : setDataY(values);
    }
    else {
      axis.toLowerCase() === 'x'
        ? setDataX([])
        : setDataY([]);
    }
  }

  // change the radius or color of the circle representing a data point on the chart
  function updateChartOptions(property, value) {
    setChartOptions(prevState => {
      return {...prevState, [property]: value}
    })
  }

  // check if there's at least one coordinate in the list, in order to plot the chart
  const coordinatesAvailable = (
    Object.entries(coordinates).length > 0
    && coordinates[0].x !== undefined
    && coordinates[0].y !== undefined
  );

  return (
    <>
      <h1>Desafio: Desenvolvimento de Gráfico Interativo</h1>
      <Select
        id='x_axis'
        label='Dados Eixo X'
        options={columns}
        onChange={e => changeAxisData(e.target.value, 'x')}
      />
      <Select
        id='y_axis'
        label='Dados Eixo Y'
        options={columns}
        onChange={e => changeAxisData(e.target.value, 'y')}
      />
      {coordinatesAvailable && (
        <>
          <XYChart data={coordinates} options={chartOptions} />
          <Select
            id='marker_radius'
            label='Tamanho do Ponto'
            options={[2, 3, 4, 5]}
            onChange={e => updateChartOptions('radius', e.target.value)}
          />
          <Select
            id='marker_color'
            label='Cor do Ponto'
            options={['azul', 'preto', 'vermelho', 'verde']}
            onChange={e => updateChartOptions('color', e.target.value)}
          />
        </>
      )}
    </>
  )
}

export default App;
