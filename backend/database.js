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
  fs.writeFileSync(databaseFilePath, JSON.stringify(data, null, 2), 'utf8');
}

export let database = readDatabaseFromFile();

// Object with same id must exist in database
export function databaseUpdate(newUser) {
  database = database.map((user) => (user.id === newUser.id ? newUser : user));
  writeDatabaseToFile(database); 
}

export function databaseDelete(id) {
  database = database.filter((user) => user.id !== id);
  writeDatabaseToFile(database);
}
