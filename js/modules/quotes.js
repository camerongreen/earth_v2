/**
 * Get section name from URL.
 *
 * @returns {String} section
 */
export class Quotes {
  /**
   * Sets things!
   *
   * @param {String} section
   * @param {Array} quotes
   */
  constructor(section, quotes) {
    this.section = section;
    this.sectionQuotes = [];
    this.quoteKeys = [];
    this.setSectionQuotes(quotes);
  }

  /**
   * Number of quotes for section.
   *
   * @returns {number}
   */
  count() {
    return this.sectionQuotes.length;
  }

  /**
   * Number of quotes remaining for section.
   *
   * @returns {number}
   */
  remaining() {
    return this.quoteKeys.length;
  }

  /**
   * Get a random quote and remove it's index from remaining quotes.
   *
   * @returns {Object}
   *   Quote object.
   */
  getRandomQuote() {
    if (this.quoteKeys.length === 0) {
      this.quoteKeys = Object.keys(this.sectionQuotes);
    }

    let randomIndex = Math.floor(Math.random() * this.quoteKeys.length);
    let place = this.quoteKeys[randomIndex];
    this.quoteKeys.splice(randomIndex, 1);
    return this.sectionQuotes[place];
  }

  /**
   * Go through all quotes, and set ones for this section.
   *
   * @param {Array} quotes
   */
  setSectionQuotes(quotes) {
    for (let quote of quotes) {
      if (quote.section === this.section) {
        this.sectionQuotes.push(quote);
      }
    }
  }
}
