const express = require('express');

const app = express();
const PORT = 5000;

require('./config/hbsConfig')(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => console.log(`The app is running on port http://localhost:${PORT}....`));