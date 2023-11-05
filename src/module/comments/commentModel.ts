import { db } from '../../config/config'
import sequelize from 'sequelize';

const comment = db.define('comment', {
    id: {
        type: sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }, user_id: {
        type: sequelize.INTEGER,
    },
    blog_id: {
        type: sequelize.INTEGER,

    },
    comment:
    {
        type: sequelize.STRING
    }
},
    {
        timestamps: true
    });



db.sync()
    .then(() => {
        console.log('Data connection established');
    })
    .catch((err: any) => {
        console.log(err);
    });

export default comment