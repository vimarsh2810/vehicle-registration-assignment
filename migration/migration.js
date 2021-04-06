const db = require('../utils/connection');
const stateList = require('../data/state-list');

const stateArray = stateList.slice(0);

const migrate = (stateArray) => {
  stateArray.forEach((state, index) => {
    const sql = `INSERT INTO states (stateName, dateCreated, dateModified, status) VALUES ('${state.StateName}', '${state.DateCreated}', '${state.DateModified}', '${state.Status}')`;
    db.query(sql, (err, result) => {
      if(err) {
        console.log(`Insertion for ${state.StateName} failed!`);
        console.log(err.message);
      }
      else {
        console.log(`InsertId: ${result.insertId}`);
      }
    });
  });
}

migrate(stateArray);