import sequelize from 'sequelize'
// import * as sequelize from sequelize
import  db  from '../../config/config' // Adjust the path according to your project structure





const User = db.define('user', {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  // image:{
  //   type:sequelize.BLOB
  // },
  Name: {
    type: sequelize.STRING // Use the appropriate data type for the name field
  },
  Email: {
    type: sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password:
  {
    type: sequelize.STRING,

  }

},
  {
    timestamps: true
  });
  // User.sync({ alter: true })
// Sync the model
// db.sync()
//   .then(() => {
//     console.log('Data connection established');
//   })
//   .catch((err: any) => {
//     console.log(err);
//   });




export default User