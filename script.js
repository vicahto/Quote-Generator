const quoteContainer = document.querySelector("#quoteContainer");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const newQuoteBtn = document.querySelector("#newQuote");
const btnPreviousQuote = document.querySelector("#btnPreviousQuote");
const btnPresentQuote = document.querySelector("#btnPresentQuote");
const twitterBtn = document.querySelector("#twitterButton");

const loader = document.querySelector("#loader");

let apiQuotes = [];
let previousAndPresentQuote = [];

let i;

// Function to show loader and hide quoteContainer
function loading() {
    loader.hidden = false; // .hidden is a html attribute to hide any html element
    quoteContainer.hidden = true;
}

// Function to hide loader and show quoteContainer
function loadingComplete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Get quotes from an API
async function getQuotes() {
    loading(); // Call the loading function while we fetch the quotes from the API.

    const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    // const apiURL2 = "https://type.fit/api/quotes";
    // apiURL contains 8k+ quotes. apiURL2 contains 1.5k+ quotes. I am only using apiURL, so I commented out apiURL2 

    try {
        const apiResponse = await fetch(apiURL);
        apiQuotes = await apiResponse.json();

        // Run/call the newQuote function
        newQuote();
        
        // Log the json file which basically contains the items displayed on the webpage, in this case an array of quotes
        // console.log(apiQuotes);
        // Log the content of a particular index
        // console.log(apiQuotes[10]);
    } catch (error) {
        /* Do something with the error caught. Eg, display an alert on the screen or pass it to a UI element created already. */
    }

    /* try {
        const apiResponse = await fetch(apiURL2);
        apiQuotes = await apiResponse.json();
        console.log(apiQuotes);
    } catch() {} */
}

function newQuote() {
    loading(); // Call the loading function incase it takes sometime to load when newQuoteBtn is pressed.

    /* Pick a random quote from apiQuotes array by: Generating random numbers that are less than the length of the array. */
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    // Pouplate previousAndPresentQuote array variable as new quotes are generated.
    previousAndPresentQuote.push(quote);
    // Remove quote in index 0 if we have up to 7 quotes
    if(previousAndPresentQuote.length == 7) {
        previousAndPresentQuote.shift();
    }
    i = 2;
    updateUIelements(quote);
    loadingComplete(); // Remove the loading animation after quoteText and authorText are set.
}

// Function to show previously viewed quotes
function previousQuote() {
    loading();
    // First check if we have more than 1 quote in the array holding previous quotes.
    if (previousAndPresentQuote.length <= 1) {
        alert("No previous quote. Please get a new quote first");
    } else {
        let previousQuote = historyCheck(i);
        i++;
        updateUIelements(previousQuote);
    }
    loadingComplete();
}

// This function works with previousQuote function
function historyCheck (int) {
    let prevQuote;
    if(previousAndPresentQuote.length >= int) {
        prevQuote = previousAndPresentQuote[previousAndPresentQuote.length-int];
    } else {
        alert("No more previous quotes to show");
        // Show the quote that was showing before
        i = previousAndPresentQuote.length;
        prevQuote = previousAndPresentQuote[previousAndPresentQuote.length - i];
    }
    return prevQuote;
}

//Goes forward to the present quote
function presentQuote() {
    loading();
    let presentQuote = previousAndPresentQuote[previousAndPresentQuote.length - 1] 
    i = 2;
    updateUIelements(presentQuote);
    loadingComplete();
}

function updateUIelements (obj) {
    // If Author field is blank, replace with string "Unknown"
    if(!obj.author) {
          authorText.textContent = "Unknown";
    } else {
            // We just want to display the "author" part of the quote object hence, quote.author
            authorText.textContent = obj.author;
        }
    
        if(obj.text.length > 100) {
            // Add a new CSS class (that already exists in styles.css file) to quoteText element if the quote is long.
            quoteText.classList.add("longQuote");
        } else {
            // Remove the CSS class if the quote is a short one.
            quoteText.classList.remove("longQuote");
        }
        quoteText.textContent = obj.text;
}

// Post a quote on Twitter
function tweetQuote() {
    // Use a 'template string' (backticks ``) because it enables us pass in variables 
    // into the string. (The values of the variables will be converted to strings also)
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL, "_blank"); // _blank opens window in a new tab
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
newQuoteBtn.addEventListener("click", newQuote);
btnPreviousQuote.addEventListener("click", previousQuote);
btnPresentQuote.addEventListener("click", presentQuote);
twitterBtn.addEventListener("click", tweetQuote);

// Run/call the function(s) below once the page loads
getQuotes();