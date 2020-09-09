import { getSection } from './modules/page.js';
import { SectionData } from './modules/SectionData.js';

(function () {
  const quotesParentSelector = '.view-section-quotes';
  const quotesData = '../data/quotes.json';
  const mediaParentSelector = '.view-section-media';
  const mediaData = '../data/media.json';

  /**
   * Set HTML with quote.
   *
   * @param {Object} quote
   */
  function setQuote(quote) {
    document.querySelector(
      `${quotesParentSelector} .views-field-body p`).innerHTML = quote.quote;
    document.querySelector(
      `${quotesParentSelector} .views-field-title span`).innerHTML = quote.author;
  }

  /**
   * Set HTML with quote.
   *
   * @param {Object} media
   */
  function setMedia(media) {
    document.querySelector(
      `${mediaParentSelector} .views-field-body p`).innerHTML = media.description;
    document.querySelector(
      `${mediaParentSelector} .views-field-field-extra-content .field-content`).innerHTML = media.extra_content;
    document.querySelector(
      `${mediaParentSelector} .views-field-title span`).innerHTML = media.title;
  }

  /**
   * Set pager HTML.
   *
   * @param {String} selector
   *   Parent element.
   * @param {Number} count
   *   Total quotes.
   * @param {Number} remaining
   *   Remaining quotes.
   */
  function setPager(selector, count, remaining) {
    document.querySelector(`${selector} .pager-current`).innerHTML = `${count -
    remaining} of ${count}`;
  }

  /**
   * Update HTML with new quote.
   *
   * @param {Object} sectionData
   */
  function updateQuotesHTML(sectionData) {
    setQuote(sectionData.getRandom());
    setPager(quotesParentSelector, sectionData.count(),
      sectionData.remaining());
  }

  /**
   * Update HTML with new media.
   *
   * @param {Object} sectionData
   */
  function updateMediaHTML(sectionData) {
    setMedia(sectionData.getRandom());
    setPager(mediaParentSelector, sectionData.count(), sectionData.remaining());
  }

  /**
   * Handle XML responds and listen for events.
   *
   * @param {Object} event
   */
  function handleQuotesResponse(event) {
    if (event.target.status === 200) {
      const json = JSON.parse(event.target.response);
      let sectionData = new SectionData(getSection(), json);
      updateQuotesHTML(sectionData);

      document.querySelector(
        `${quotesParentSelector} .pager-next a`).onclick = () => {
        updateQuotesHTML(sectionData);
        return false;
      };
    }
    else {
      console.log(`Request failed.  Returned status of ${xhr.status}`);
    }
  }

  /**
   * Handle XML responds and listen for events.
   *
   * @param {Object} event
   */
  function handleMediaResponse(event) {
    if (event.target.status === 200) {
      const json = JSON.parse(event.target.response);
      let sectionData = new SectionData(getSection(), json);
      updateMediaHTML(sectionData);

      document.querySelector(
        `${mediaParentSelector} .pager-next a`).onclick = () => {
        updateMediaHTML(sectionData);
        return false;
      };
    }
    else {
      console.log(`Request failed.  Returned status of ${xhr.status}`);
    }
  }

  /**
   * Request listiong of quotes and set handler.
   *
   * @param {String} url
   * @param {Function} handler
   */
  function requestData(url, handler) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.addEventListener('load', handler);
    xhr.send();
  }

  requestData(quotesData, handleQuotesResponse);
  requestData(mediaData, handleMediaResponse);

})();
