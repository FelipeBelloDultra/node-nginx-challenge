const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(cors());

const config = {
  host: "mysql",
  user: "root",
  password: "root",
  database: "fullcycle",
};

async function runQuery(sqlQuery) {
  const connection = mysql.createConnection(config);

  const result = await new Promise((resolve, reject) => {
    connection.query(sqlQuery, (err, result) => {
      if (err) return reject(err);

      return resolve(result);
    });
  });

  connection.end();

  return result;
}

function populateDatabase() {
  runQuery(`
    CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (id));
  `);
  runQuery(`
    INSERT INTO people (name) values ('Felipe'), ('FullCycle');
  `);
}

app.get("/", async (_, res) => {
  const allPeople = await runQuery("SELECT * FROM people;");

  const peopleList = `
    <ul>
      ${allPeople
        .map(
          ({ name }) => `
            <li>${name}</li>
          `
        )
        .join(" - ")}
    </ul>
  `;

  res.send(`<h1>Full Cycle Rocks!</h1> ${peopleList}`);
});

app.listen(3000, () => {
  populateDatabase();
});
