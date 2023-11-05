import sequelize from 'sequelize'
// import * as sequelize from sequelize
import { db } from '../../config/config' // Adjust the path according to your project structure





const blog = db.define('blog', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: sequelize.INTEGER,

    },
    title:
    {
        type: sequelize.STRING
    },
    description: {
        type: sequelize.STRING
    },
    image: {
        type: sequelize.BLOB
    },
},
    {
        timestamps: true
    });
// Sync the model
// db.sync()
//     .then(() => {
//         console.log('Data connection established');
//     })
//     .catch((err: any) => {
//         console.log(err);
//     });



export default blog