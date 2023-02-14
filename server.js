const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

let data = [];    // Incoming data is stored in memory, can be implemented with a MongoDB database or other database instead

app.use(express.json());

app.post('/items', (req, res) => {     //Function to receive post requests, saves JSON data to data array.
    data.push(req.body);
    res.send(`Data received: ${JSON.stringify(req.body)}`);
    console.log(data)
});

app.get('/items', (req, res) =>{    //Function to receieve get requests, will send all data in array
    res.send(data);
});

app.get('/items/search', (req, res) => {  //Function to search data array.
    let filteredData = data

    if (req.query.name) {
        filteredData = filteredData.filter(item => item.patient.name === req.query.name);
    }
    if (req.query.hospital) {
        filteredData = filteredData.filter(item => item.hospital.name === req.query.hospital);
    }
    if (req.query.date) {
        filteredData = filteredData.filter(item => item.date === req.query.date);
    }
    if (req.query.bill) {
        filteredData = filteredData.filter(item => item.bill === req.query.bill);
    }

    res.json(filteredData); 
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
