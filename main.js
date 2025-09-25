document.addEventListener('DOMContentLoaded', function() {
    const quoteElement = document.getElementById('quote');
    const generateBtn = document.getElementById('generateBtn');
    const likeBtn = document.getElementById('likeBtn');
    const likedQuotesList = document.getElementById('likedQuotesList');

    let likedQuotes = [];
    let currentQuote = null;

    // Event listener for generating a random quote
    generateBtn.addEventListener('click', getRandomQuote);

    // Event listener for liking a quote
    likeBtn.addEventListener('click', likeQuote);

    // Function to fetch a random quote from the db.json API
    function getRandomQuote() {
        fetch('http://localhost:3001/quotes')
            .then(response => response.json())
            .then(data => {
                // data is an array of quotes
                const randomIndex = Math.floor(Math.random() * data.length);
                currentQuote = data[randomIndex];

                // display quote text + author
                quoteElement.textContent = `"${currentQuote.text}" — ${currentQuote.author}`;
            })
            .catch(error => {
                console.error('Error fetching quote:', error);
                quoteElement.textContent = "Oops! Could not load a quote.";
            });
    }

    // Function to like a quote
    function likeQuote() {
        if (currentQuote) {
            likedQuotes.push(currentQuote);
            displayLikedQuotes();
        } else {
            alert('Generate a quote first!');
        }
    }

    // Function to display liked quotes
    function displayLikedQuotes() {
        likedQuotesList.innerHTML = '';
        likedQuotes.forEach(quote => {
            const li = document.createElement('li');
            li.textContent = `"${quote.text}" — ${quote.author}`;
            likedQuotesList.appendChild(li);
        });
    }
});




