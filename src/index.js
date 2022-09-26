const express = require('express');

const { PORT } = require('./constans');
const router = require('./router');
const initDatabase = require('./config/mongooseConfig');

const app = express();


require('./config/hbsConfig')(app);
require('./config/expressConfig')(app);

app.use(router);

initDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`The app is running on port http://localhost:${PORT}....`));
    })
    .catch((err) => {
        console.log('Connot connect database:', err);
    })