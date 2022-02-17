//npm init -y
//npm install minimist
//npm install axios
//npm install jsdom
//npm install excel4node
//npm install pdf-lib

//node 1_CricinfoExtracter.js --excel=Worldcup.csv --dataFolder=data --source="https://www.espncricinfo.com/series/icc-cricket-world-cup-2019-1144415/match-results"

let minimist = require("minimist");
let axios = require("axios");
let jsdom = require("jsdom");
let excel4node = require("excel4node");
let pdf = require("pdf-lib");

let args = minimist(process.argv);

/*console.log(args.source);
console.log(args.excel);
console.log(args.dataFolder);*/

//downloading using axios
//read using jsdom
//make excel using excel4node
//make pdf using pdf-lib


//using axios I am downloading entire html page
let responseKaPromise = axios.get(args.source);
responseKaPromise.then(function(response){
    let html = response.data;
    //console.log(html);
}).catch(function(err){
    console.log(err);
});