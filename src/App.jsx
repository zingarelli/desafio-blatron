import { useEffect, useState } from 'react';
import './App.css';
import getResults from './utils/DataExtractor';
import XYChart from './components/XYChart';

// we're reading the file locally
const fileSrc = '/data/results.txt';

function App() {
  const [results, setResults] = useState(null);

  // get data from file when the app loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getResults(fileSrc);
        setResults(data);
      }
      catch (err) {
        console.log(err);
      } 
    }

    fetchData();
  }, [])

  console.log(results);

  return (
    <>
      <h1>Desafio: Desenvolvimento de Gráfico Interativo</h1>
      <XYChart />
    </>
  )
}

export default App;
