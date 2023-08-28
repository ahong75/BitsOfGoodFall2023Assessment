import fs from 'fs';

const databaseFilePath = 'database.json';

function readDatabaseFromFile() {
  try {
    const data = fs.readFileSync(databaseFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

function writeDatabaseToFile(data) {
  try {
    fs.writeFileSync(databaseFilePath, JSON.stringify(data, null, 2), 'utf8');
    console.log('Data written to file successfully.');
  } catch (error) {
    console.error('Error writing data to file:', error);
    throw new Error('Failed to write data to file'); // Custom error message
  }
}

export let database = readDatabaseFromFile();

// Object with same id must exist in database
export function databaseUpdate(updatedUser) {
  const index = database.findIndex(user => user.id === updatedUser.id)
  if (index == -1) throw new Error('Object with given id does not exist')
  database[index] = updatedUser
  writeDatabaseToFile(database); 
}

export function databaseDelete(id) {
  const index = database.findIndex(user => user.id === id)
  console.log(id === database[0].id)
  if (index == -1) throw new Error('Object with given id does not exist')
  database = database.filter((user) => user.id !== id);
  writeDatabaseToFile(database);
}

export function databaseCreate(newUser) {
  console.log(database[0])
  database.unshift(newUser);
  writeDatabaseToFile(database);
}
