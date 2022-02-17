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
//const { matches } = require("lodash");

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

    let dom = new jsdom.JSDOM(html);
    let document = dom.window.document;

    let matches = [];
    let matchScoreDivs = document.querySelectorAll("div.match-score-block");
    //console.log(matchInfoDivs.length);  // correct result is coming i.e. 48

    for(let i=0; i<matchScoreDivs.length; i++){
        let match = {

        };

        let namePs = matchScoreDivs[i].querySelectorAll("p.name");
        // console.log(namePs[0].textContent);
        // console.log(namePs[1].textContent); //har p.name mein 2 names hain
        match.t1 = namePs[0].textContent;
        match.t2 = namePs[1].textContent;

        let scoreSpans = matchScoreDivs[i].querySelectorAll("div.score-detail > span.score");
        // match.t1s = scoreSpans[0].textContent;
        // match.t2s = scoreSpans[1].textContent;

        if(scoreSpans.length == 2){
            match.t1s = scoreSpans[0].textContent;
            match.t2s = scoreSpans[1].textContent;
        }else if(scoreSpans.length == 1){
            match.t1s = scoreSpans[0].textContent;
        }else {
            match.t1s = "";
            match.t2s = "";
        }


        let spanResult = matchScoreDivs[i].querySelector("div.status-text > span");
        match.result = spanResult.textContent;

        matches.push(match);


    }
    console.log(matches);

    /*let title = document.title;
    console.log(title);*/ //just to check jsdom is working
}).catch(function(err){
    console.log(err);
});