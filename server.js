const fs = require('fs');
const path = require('path');
const express = require('express');

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');
const zookeeperRoutes = require('./routes/apiRoutes/zookeeperRoutes');

const PORT = process.env.PORT || 3001;
const app = express();    //instantiates the server
const { animals } = require('./data/animals.json');
const { zookeepers } = require('./data/zookeepers.json');

//-----------the app.use lines are all MIDDLEWARE
//-----NEXT 4 LINES HAVE TO BE SETUP EVERY TIME TO ACCEPT POST DATA
//parse incoming string or array data
app.use(express.urlencoded({ extended: true}));
//parse incoming JSON data
app.use(express.json());
app.use('/api',apiRoutes);
app.use('/', htmlRoutes);
//MAKE SUPPORT FILES PUBLIC SO WE DONT HAVE TO MAKE A TON OF ROUTES
app.use(express.static('public'));




app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});