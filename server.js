const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;
const routes = require('./routes');

//parse json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
