const express = require("express");
const request = require("request-promise");
const cheerio = require("cheerio");

const app = express();

const URL = "https://httpbin.org/ip"


const FindData = async () => {
    const res = await request(
     URL);
     console.log(res)
   
}

FindData();

app.listen(8000, () => {
    console.log("server is running in port 8000")
})