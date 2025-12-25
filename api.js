const express = require("express");
const app = express();
const axios = require("axios");
const https = require("https");
const fs = require("fs");

const options = {
    key: fs.readFileSync(
      "../../etc/letsencrypt/live/v3008618.hosted-by-vdsina.ru/privkey.pem"
    ),
    cert: fs.readFileSync(
      "../../etc/letsencrypt/live/v3008618.hosted-by-vdsina.ru/fullchain.pem"
    ),
  };
  
https
    .createServer(options, app)
    .listen(3001, "v3008618.hosted-by-vdsina.ru", () => {
        console.log("Ура");
    });

app.get("/searchVendor/:mac", (req, res) => {
    axios.get(`https://api.maclookup.app/v2/macs/${req.params.mac}`)
        .then(response => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET");
            res.json(response.data.company == "" ? "Не известно" : response.data.company);
        })
})