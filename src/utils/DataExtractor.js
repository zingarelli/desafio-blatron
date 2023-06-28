export default async function getResults(url) {
    try{
        const data = await fetchDataFromFile(url);
        
        // first line in the file contains the name for each column (headers)
        const columns = data.split('\n')[0].trim().split('\t');

        const results = {};

        /* 
            Iterate each line of the file and store the values from each 
            column in an object. Columns are separated by a tag in the file.
        */
        data.split('\n').map((line, idx) => {        
            // columns in the first line will be the keys in the object (headers)
            if (idx === 0) {
                line.trim().split('\t').map(header => results[header] = []);
            }
            // the other lines are values for each key in the object
            // they will be stored in arrays
            else {            
                line.trim().split('\t').map((value, idx) => {
                    // get the current column
                    const header = columns[idx];
                    results[header].push(value);
                })
            }

        })
        
        return results;
    }
    catch (err) {
        console.log(err);
    }
}

async function fetchDataFromFile(url) {
    try{
        const resp = await fetch(url);
        const data = await resp.text();
        return data;
    }
    catch (err) {
        throw new Error(`Error fetching data: ${err}`);
    }
}