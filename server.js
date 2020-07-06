const express = require('express')
const app = express()
const port = 3000
var path = require('path');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))