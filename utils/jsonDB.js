const fs = require('fs').promises;


async function readJSON(filePath) {

    try {

        const data = await fs.readFile(filePath, 'utf-8');

        return JSON.parse(data);

    } catch(error){

        if(error.code === 'ENOENT'){
            return [];
        }

        throw error;
    }

}



async function writeJSON(filePath, data){

    await fs.writeFile(
        filePath,
        JSON.stringify(data,null,2),
        'utf-8'
    );

}



async function insert(filePath, object){

    const data = await readJSON(filePath);

    data.push(object);

    await writeJSON(filePath,data);

    return object;

}



module.exports = {
    readJSON,
    writeJSON,
    insert
};