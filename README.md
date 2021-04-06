# Vehicle Registration

Follow the following steps:

* Create a MySQL database named "vehicle_registration" with 4 tables namely "user", "vehicles", "states", "vehicle_registration"
* Schema:

  "user" table:

  id: {  
    &emsp;type: int,  
    &emsp;autoIncrement: true,  
    &emsp;allowNull: false,  
    &emsp;primaryKey: true  
  },  
  name: {  
    &emsp;type: varchar(50),  
    &emsp;allowNull: false,  
  },  
  email: {  
    &emsp;type: varchar(50),  
    &emsp;allowNull: false,  
    &emsp;unique: true  
  },  
  password: {  
    &emsp;type: varchar(100), 
    &emsp;allowNull: false  
  },  
  stateId: {  
    &emsp;type: int,  
    &emsp;allowNull: false,  
    &emsp;foreignKey: state table -> id column  
  },  
  status: {  
    &emsp;type: tinyint,  
    &emsp;allowNull: false  
  }  

  "states" table:  

  id: {  
    &emsp;type: int,  
    &emsp;autoIncrement: true,  
    &emsp;allowNull: false,  
    &emsp;primaryKey: true  
  },  
  stateName: {  
    &emsp;type: varchar(50),  
    &emsp;allowNull: false,  
    &emsp;unique: true  
  },  
  dateCreated: {  
    &emsp;type: datetime,  
    &emsp;allowNull: true  
  },  
  dateModified: {  
    &emsp;type: datetime,  
    &emsp;allowNull: true  
  },  
  status: {  
    &emsp;type: tinyint,  
    &emsp;allowNull: false  
  }  

  "vehicles" table:  

  id: {  
    &emsp;type: int,  
    &emsp;autoIncrement: true,  
    &emsp;allowNull: false,  
    &emsp;primaryKey: true  
  },  
  name: {  
    &emsp;type: varchar(50),  
    &emsp;allowNull: false,  
    &emsp;unique: true  
  },  
  type: {  
    &emsp;type: varchar(50),  
    &emsp;allowNull: false  
  }  

  "vehicle_registration" table:

  id: {  
    &emsp;type: int,  
    &emsp;autoIncrement: true,  
    &emsp;allowNull: false,  
    &emsp;primaryKey: true  
  },  
  userId: {  
    &emsp;type: int,  
    &emsp;allowNull: false  
  },  
  vehicleId: {  
    &emsp;type: varchar(50),  
    &emsp;allowNull: false  
  },  
  registrationDate: {  
    &emsp;type: datetime,  
    &emsp;allowNull: false  
  },  
  expiryDate: {  
    &emsp;type: datetime,  
    &emsp;allowNull: false  
  }  

* Run migration/migration.js file to migrate to the database
* To create CSV file, run CSV/csv.js file
* to Run the main application, run app.js file