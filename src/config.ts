import dotenv from 'dotenv'
dotenv.config();

export const config ={    

    server:{
    
        port: process.env.PORT || 3000,

    mysql_host: process.env.MYSQL_HOST,
    mysql_password: process.env.MYSQL_PASSWORD,
    mysql_database: process.env.MYSQL_DATABASE,
    mysql_user: process.env.MYSQL_USER,


    }

}


