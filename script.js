const quoteContainer = document.querySelector("#quoteContainer");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const newQuoteBtn = document.querySelector("#newQuote");
const twitterBtn = document.querySelector("#twitterButton");

const loader = document.querySelector("#loader");

let apiQuotes = [];

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
    // apiURL contains 8k+ quotes. apiURL2 contains 1.5k+ quotes.
    // I am only using apiURL, so I commented out apiURL2 

    try {
        const apiResponse = await fetch(apiURL);
        apiQuotes = await apiResponse.json();

        // Run/call the newQuote function
        newQuote();
        
        /* Log the json file which basically contains the items displayed on the webpage.
         in this case an array of quotes
        console.log(apiQuotes); */
        // Log the content of a particular index
        // console.log(apiQuotes[10]);
    } catch (error) {
        /* Do something with the error caught. Eg, display an alert on the screen 
         or pass it to a UI element created already. */
    }

    /* try {
        const apiResponse = await fetch(apiURL2);
        apiQuotes = await apiResponse.json();
        console.log(apiQuotes);
    } catch {} */
}

function newQuote() {
    loading(); // Call the loading function incase it takes sometime to load when
    // newQuoteBtn is pressed.

    /* Pick a random quote from apiQuotes array by: Generating random 
     numbers that are less than the length of the array. */
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
     // If Author field is blank, replace with string "Unknown"
    if(!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        // We don't want the entire quote object, we just want the "author" part of the
        // quote object hence, quote.author
        authorText.textContent = quote.author;
    }

    if(quote.text.length > 100) {
        // Add a new CSS class (that already exists in styles.css file) to 
        // quoteText element if the quote is long.
        quoteText.classList.add("longQuote");
    } else {
        // Remove the CSS class if the quote is a short one.
        quoteText.classList.remove("longQuote");
    }
    
    quoteText.textContent = quote.text;
    loadingComplete(); // Remove the loading animation after quoteText and authorText are set.
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
twitterBtn.addEventListener("click", tweetQuote);

// Run/call the function(s) below once the page loads
getQuotes();
