const cluster = require("cluster");

const http = require('http');

//const express = require("express")
const puppeteer = require('puppeteer');
const fs = require("fs");
const pdf = require('pdf-parse');

//ab -c 50 -n 500 localhost:8000/   linux ubuntu


const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
}

const server = http.createServer(requestListener);
server.listen(8080);


if(cluster.isMaster){
  cluster.fork();
  cluster.fork();
}
else {



 
// (async () => {
//   const browser = await puppeteer.launch({
//       headless:false
//   });
//   const page = await browser.newPage();
//   await page.goto('https://google.com');
//   await page.screenshot({path: 'example.png'});
 
//   await browser.close();
// })();


let Parser = require('rss-parser');
let parser = new Parser();
 
(async () => {
 
  let feed = await parser.parseURL('https://rss.aftonbladet.se/rss2/small/pages/sections/aftonbladet/');
  //console.log(feed.link);
 let Link_list= [];

  feed.items.forEach( item => {
   // console.log(item.title + ' : ' + item.link)
 Link_list.push(item.link)
    //read link data 
    //and add it to txt file
    // and save it to S3
  });
 
 //console.log("link list", Link_list)

 const browser = await puppeteer.launch();
 const page = await browser.newPage();
/* await page.setCookie({
  "value": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MTAzMjE1MDEsInN1YiI6NCwiaWF0IjoxNTEwMjYxNTAxLCJqdGkiOiJLYnoxSmxDMDlDTXRndXBhQzRLRHRnIn0.NkgBUKof9VUm_FrEicDRP3I-G-tIEl0feXS-RAGtyj4",
  "expires": 1510321201,
  "domain": "dummy.com.0.0.0.0.nip.io",
  "name": "jwt_token"
}) */
 await page.keyboard.press("Enter");
  await page.goto(`${Link_list[0]}`);

 // await page.goto("https://rss.aftonbladet.se/rss2/small/pages/sections/aftonbladet/")
 //await page.screenshot({path: 'example.png'});
 //const csv  = await page.evaluate(() => document.body.innerHTML);
 
//const element = await page.$("*");
  const csv = await page.$eval('*', el => el.innerText);
  /* await page.evaluate(
      () =>  Array.from(document.querySelectorAll('*'))
                  .map(elem => elem.textContent)
    ); */

  
  const dateInfo =  new Date().toTimeString();
 const docId = "it will be programmed when I put it on S3 bucket";
 const url = Link_list[0];
// console.log(info);
    //console.log(csv); 
/*  await page.pdf({
   path:"./page.pdf",
   format:"A4"
  })   */
// await page.type('body', 'Hello'); 
//console.log(csv)
// let dataBuffer = fs.readFileSync('./page.pdf');
 
// let data = await pdf(dataBuffer)
//   let csv = JSON.stringify(data);
const csvHel = "Todays date :" + dateInfo + "\n" + "Doc Id: " +docId + "\n"
 + "Url: " + url + "\n " + csv



/*  let text = csvHel.split('\n')                               // split lines
            .map(line => line.split(/\s+/).join(','))  // split spaces then join with ,
            .join('\n') */                                // rejoin lines






 await fs.writeFileSync('./output2.csv', csvHel,'utf-8')
 await browser.close();
})();

}