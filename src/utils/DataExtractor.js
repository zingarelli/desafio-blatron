// Fetch text data (from a file, or API endpoint)
async function fetchTxtData(url) {
    try{
        const resp = await fetch(url);
        const data = await resp.text();
        return data;
    }
    catch (err) {
        throw new Error(`Error fetching data: ${err}`);
    }
}

// extract all the results and return them in an object in the format:
// {nameOfTheColumn : [...values]}
export async function getAllResults(url) {
    try{
        const data = await fetchTxtData(url);
        
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
                    // convert to float before adding to the array
                    results[header].push(parseFloat(value));
                })
            }

        })
        
        return results;
    }
    catch (err) {
        console.log(err);
    }
}

// return all the columns (headers) in an array
// columns are separated by tabs (\t)
export async function getColumns(url) {
    try {
        const data = await fetchTxtData(url);
        
        // first line in the file contains the name for each column (headers)
        // using trim() to remove any white spaces from the last column
        return data.split('\n')[0].trim().split('\t');        
    } 
    catch (err) {
        console.log(err);
    }
}

// return an array with the values of a single column
export async function getValuesFromColumn(column, url) {
    try {
        const data = await getAllResults(url);
        return data[column];
    }
    catch (err) {
        console.log(err);
    }
}