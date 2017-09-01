const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3000;

//parse json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//define '/' route
app.get('/', (req, res) => {
  res.send('What\'s good?!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
