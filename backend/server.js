const app = require('./app');
const dotenv = require('dotenv');
const connectDataBase  = require('./config/database');

dotenv.config({
    path:'backend/config/config.env'
})

connectDataBase();

app.listen(9002,()=>{
    console.log('listening on port 9002');
})