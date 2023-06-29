import styles from './App.module.css';
import { useEffect, useState } from 'react';
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

      // update values and the name of the given axis
      if (axis.toLowerCase() === 'x') {
        setDataX(values);
        setChartOptions({...chartOptions, 'xLabel': column});
      }
      else {
        setDataY(values);
        setChartOptions({...chartOptions, 'yLabel': column});
      }
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
      return { ...prevState, [property]: value }
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
      <h1 className={styles.title}>Desafio: Desenvolvimento de Gráfico Interativo</h1>
      <div className={styles.chart}>
        <aside className={styles.chart_options}>
          <fieldset className={styles.fieldset}>
            <legend>Dados do gráfico</legend>
            <Select
              id='x_axis'
              label='Eixo X'
              options={columns}
              onChange={e => changeAxisData(e.target.value, 'x')}
            />
            <Select
              id='y_axis'
              label='Eixo Y'
              options={columns}
              onChange={e => changeAxisData(e.target.value, 'y')}
            />
          </fieldset>
          <fieldset disabled={!coordinatesAvailable} className={styles.fieldset} >
            <legend>Estilos para o gráfico</legend>
            <Select
              id='marker_radius'
              label='Tamanho do Ponto'
              options={[2, 3, 4, 5]}
              onChange={e => updateChartOptions('radius', e.target.value)}
            />
            <Select
              id='marker_color'
              label='Cor do Ponto'
              options={['Azul', 'Preto', 'Vermelho', 'Verde']}
              onChange={e => updateChartOptions('color', e.target.value)}
            />
          </fieldset>
        </aside>
        <main className={styles.chart_area}>
          {coordinatesAvailable && <XYChart data={coordinates} options={chartOptions} />}
        </main>
      </div>
      <footer className={styles.footer}>Desafio Blatron | Matheus Ricardo Uihara Zingarelli</footer>
    </>
  )
}

export default App;
