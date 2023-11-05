import sequelize from "sequelize";
import {db} from '../../config/config'
const logins =db.define('login',{
    Name:{
            type:sequelize.STRING
    },
    Email:{

        type:sequelize.STRING
    },
    roll:{
        type:sequelize.STRING
    },

    password:
    {
        type:sequelize.STRING
    }

},{
    timestamps:true,
    freezeTableName:true
})


// logins.sync({force:true}) .then(() => {
//         console.log('Data connection established..............');
//       })
//       .catch((err: any) => {
//         console.log(err);
//       });

export default logins
