const express = require('express');

const { PORT } = require('./constans');
const router = require('./router');

const app = express();


require('./config/hbsConfig')(app);
require('./config/expressConfig')(app);

app.use(router);

app.listen(PORT, () => console.log(`The app is running on port http://localhost:${PORT}....`));