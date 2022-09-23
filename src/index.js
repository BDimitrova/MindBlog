const express = require('express');

const { PORT } = require('./constans');

const app = express();

require('./config/hbsConfig')(app);
require('./config/expressConfig')(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => console.log(`The app is running on port http://localhost:${PORT}....`));