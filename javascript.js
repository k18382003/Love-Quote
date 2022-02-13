let QuoteList = [];
let txtQuote = document.getElementById("text");
let txtArthor = document.getElementById("author");
let BtnAudio = document.getElementById("audio");
let BtnNextQuote = document.getElementById("new-quote");
let quoteContainer = document.getElementById("quote-container")
let loader = document.getElementById("loader");
let audioSrc = document.getElementById("myAudio");

// Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// show quote
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Get a random quote at a time
function newQuote(){
    let randomnum = Math.floor(Math.random() * QuoteList.length);
    const randomQuote = QuoteList[randomnum];
    if(!randomQuote.author)
    {
        txtArthor.textContent = "Unknown";
    }else{
        txtArthor.textContent = "Summer";
    }

    if(randomQuote.text.length > 100){
        txtQuote.classList.add("quote-longtext");
    }else{
        txtQuote.classList.remove("quote-longtext");
    }

    audioSrc.src = randomQuote.audio;
    txtQuote.textContent = randomQuote.text;
}

// Get quote from api (async/await 寫法)
async function getQuote(){
    const apiurl = 'https://type.fit/api/quotes';
    try{
        loading();
        const response = await fetch('./Quote.json');
        QuoteList = await response.json();
        complete();
        newQuote();
    }catch(err){
        complete();
        console.log('Something went wrong while loading quoteapi', err);
    }
}

// Get quote from api (promise 寫法)
// const quoteApipromise = fetch('https://type.fit/api/quotes');

// quoteApipromise.then(response => {
//     response.json().then(quoteJson =>{
//         QuoteList = quoteJson;
//         newQuote();
//     }).catch(err =>{
//         console.log('Something went wrong while loading quoteapi');
//     });
// });

// Handle loading
// async function gettingquotes(){
    

// }

function playAudio(){
    audioSrc.play();
}

BtnNextQuote.addEventListener('click', newQuote);
BtnAudio.addEventListener('click', playAudio);

getQuote();


  
