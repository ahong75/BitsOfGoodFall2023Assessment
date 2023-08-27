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
  } catch (err) {
    console.error('Error writing to database file:', err);
  }
}

export let database = readDatabaseFromFile();

// Object with same id must exist in database
export function databaseUpdate(updatedUser) {
  const index = database.findIndex(user => user.id === updatedUser.id)
  if (index == -1) return -1
  database[index] = updatedUser
  writeDatabaseToFile(database); 
}

export function databaseDelete(id) {
  const index = database.findIndex(user => user.id === id)
  database = database.filter((user) => user.id !== id);
  writeDatabaseToFile(database);
}
