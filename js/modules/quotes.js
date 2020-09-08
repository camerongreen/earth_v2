/**
 * Get section name from URL.
 *
 * @returns {String} section
 */
export class Quotes {
  constructor(section, quotes) {
    this.section = section;
    this.sectionQuotes = [];
    this.quoteKeys = [];
    this.setSectionQuotes(quotes);
  }

  count() {
    return this.sectionQuotes.length;
  }

  remaining() {
    return this.quoteKeys.length;
  }

  getRandomQuote() {
    if (this.quoteKeys.length === 0) {
      this.quoteKeys = Object.keys(this.sectionQuotes);
    }

    let randomIndex = Math.floor(Math.random() * this.quoteKeys.length);
    let place = this.quoteKeys[randomIndex];
    this.quoteKeys.splice(randomIndex, 1);
    return this.sectionQuotes[place];
  }

  setSectionQuotes(quotes) {
    for (let quote of quotes) {
      if (quote.section === this.section) {
        this.sectionQuotes.push(quote);
      }
    }
  }
}
