import { useEffect, useState } from 'react';
import './App.css';
import { getColumns, getValuesFromColumn } from './utils/DataExtractor';
import XYChart from './components/XYChart';

// we're reading the file locally
const fileSrc = '/data/results.txt';

function App() {
  const [columns, setColumns] = useState([]);
  const [dataX, setDataX] = useState([]);
  const [dataY, setDataY] = useState([]);
  // coordinates is an array of objects [{x: value, y: value}, ...]
  const [coordinates, setCoordinates] = useState([]);

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
        newCoordinates.push({x: dataX[i], y: dataY[i]})      
      }
  
      setCoordinates(newCoordinates);
    }

    updateCoordinates();
  }, [dataX, dataY])

  // get data for the selected column
  async function changeAxisData(e, axis) {
    const column = e.target.value;

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

  // check if there's at least one coordinate in the list
  function isThereCoordinates() {
    return (
      Object.entries(coordinates).length > 0
      && coordinates[0].x !== undefined
      && coordinates[0].y !== undefined
    );
  }

  return (
    <>
      <h1>Desafio: Desenvolvimento de Gráfico Interativo</h1>
      <label htmlFor="x-axis">Dados Eixo X</label>
      <select id="x-axis" onChange={e => changeAxisData(e, 'x')}>
        <option value="">Selecione uma opção</option>
        {columns.map(column => (
          <option value={column} key={column}>{column}</option>
        ))}
      </select>
      <label htmlFor="y-axis">Dados Eixo Y</label>
      <select id="y-axis" onChange={e => changeAxisData(e, 'y')}>
        <option value="">Selecione uma opção</option>
        {columns.map(column => (
          <option value={column} key={column}>{column}</option>
        ))}
      </select>
      {isThereCoordinates() && <XYChart data={coordinates} />}
    </>
  )
}

export default App;
