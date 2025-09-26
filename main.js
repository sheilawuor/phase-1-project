
document.addEventListener('DOMContentLoaded', function () {
  const quoteElement = document.getElementById('quote');
  const generateBtn = document.getElementById('generateBtn');
  const likeBtn = document.getElementById('likeBtn');
  const downloadBtn = document.getElementById('downloadBtn');
  const likedQuotesList = document.getElementById('likedQuotesList');

  let quotesCache = [];
  let currentQuote = null;
  let likedQuotes = [];

  // Fetch quotes from db.json (json-server must be running: json-server --watch db.json --port 3001)
  fetch('http://localhost:3001/quotes')
    .then(res => res.json())
    .then(data => {
      quotesCache = data; // db.json returns an array of quotes
      if (quotesCache.length > 0) {
        showRandomQuote();
      } else {
        quoteElement.textContent = "No quotes available.";
      }
    })
    .catch(err => {
      console.error('Error fetching quotes:', err);
      quoteElement.textContent = "Could not load quotes. Is json-server running?";
    });

  // Render one quote
  function renderQuote(quote) {
    if (!quote) return;
    quoteElement.textContent = `"${quote.text}" — ${quote.author}`;
    currentQuote = quote;
  }

  // Show random quote
  function showRandomQuote() {
    if (quotesCache.length === 0) return;
    const idx = Math.floor(Math.random() * quotesCache.length);
    renderQuote(quotesCache[idx]);
  }

  // Event: Generate
  function getRandomQuote() {
    if (quotesCache.length === 0) {
      quoteElement.textContent = "Loading quotes...";
      return;
    }
    showRandomQuote();
  }

  // Event: Like
  function likeQuote() {
    if (!currentQuote) {
      alert("Generate a quote first!");
      return;
    }

    if (!likedQuotes.includes(currentQuote)) {
      likedQuotes.push(currentQuote);
      displayLikedQuotes();
      alert("Quote liked!");
    } else {
      alert("Already liked this one.");
    }
  }

  // Show liked quotes
  function displayLikedQuotes() {
    likedQuotesList.innerHTML = "";
    likedQuotes.forEach(q => {
      const li = document.createElement("li");
      li.textContent = `"${q.text}" — ${q.author}`;
      likedQuotesList.appendChild(li);
    });
  }

  // Event: Download (as PDF with jsPDF)
  function downloadQuote() {
    if (!currentQuote) {
      alert("Generate a quote first!");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Quotify - Your Quote", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`"${currentQuote.text}"`, 20, 40, { maxWidth: 170 });
    doc.text(`— ${currentQuote.author}`, 20, 60);

    doc.save("quote.pdf");
  }

  // Attach listeners
  generateBtn.addEventListener("click", getRandomQuote);
  likeBtn.addEventListener("click", likeQuote);
  downloadBtn.addEventListener("click", downloadQuote);
});

