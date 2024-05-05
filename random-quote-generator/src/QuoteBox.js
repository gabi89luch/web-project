import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteBox = () => {
  const [quote, setQuote] = useState({ text: '', author: '' });

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote({
        text: response.data.content,
        author: response.data.author
      });
    } catch (error) {
      console.error('Error fetching quote: ', error);
      setQuote({ text: 'Failed to fetch quote', author: '' });
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div id="quote-box" className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg flex flex-col items-center justify-center">
      <p id="text" className="text-xl font-semibold">{quote.text}</p>
      <p id="author" className="text-lg text-gray-600 mt-4">{quote.author}</p>
      <button id="new-quote" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">New Quote</button>
      <a id="tweet-quote" className="mt-2 text-blue-500 hover:text-blue-600 transition" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(quote.text + " - " + quote.author)}`} target="_top">Tweet</a>
    </div>
  );
};

export default QuoteBox;
