const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3500;
const router = require('./routes/todo.router');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));


app.use('/to-do', router);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
})