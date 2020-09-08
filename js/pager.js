import {getSection} from './modules/page.js';
import {Quotes} from './modules/quotes.js';

(function () {
  const parentSelector = '.view-section-quotes';

  /**
   * Set HTML with quote.
   *
   * @param {Object} quote
   */
  function setQuote(quote) {
    document.querySelector(`${parentSelector} .views-field-body p`).innerHTML = quote.quote;
    document.querySelector(`${parentSelector} .views-field-title span`).innerHTML = quote.author;
  }

  /**
   * Set pager HTML.
   *
   * @param {Number} count
   *   Total quotes.
   * @param {Number} remaining
   *   Remaining quotes.
   */
  function setPager(count, remaining) {
    document.querySelector(`${parentSelector} .pager-current`).innerHTML = `${count - remaining} of ${count}`;
  }

  /**
   * Handle XML responds and listen for events.
   *
   * @param {Object} event
   */
  function handleResponse(event) {
    if (event.target.status === 200) {
      const quotes = JSON.parse(event.target.response);
      let quoteObj = new Quotes(getSection(), quotes);
      setQuote(quoteObj.getRandomQuote());
      // Minus 1 from remaining as we already have the first quote.
      setPager(quoteObj.count(), quoteObj.remaining());

      document.querySelector(`${parentSelector} .pager-next a`).onclick = (e) => {
        setQuote(quoteObj.getRandomQuote());
        // Minus 1 from remaining as we already have the first quote.
        setPager(quoteObj.count(), quoteObj.remaining());
        return false;
      };
    }
    else {
      console.log(`Request failed.  Returned status of ${xhr.status}`);
    }
  }

  /**
   * Request listiong of quotes and set handler.
   */
  function requestQuotes() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/quotes.json');
    xhr.addEventListener('load', handleResponse);
    xhr.send();
  }

  requestQuotes();

})();
