const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000;
const routes = require('./routes');

//parse json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

routes(app);

app.listen(PORT, (err) => {
  if (err) { console.error(err); }
  console.log(`Server listening on port: ${PORT}`);
});
