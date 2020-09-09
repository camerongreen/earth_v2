/**
 * Get section name from URL.
 *
 * @returns {String} section
 */
export class SectionData {
  /**
   * Sets things!
   *
   * @param {String} section
   * @param {Array} data
   */
  constructor(section, data) {
    this.section = section;
    this.sectionData = [];
    this.dataKeys = [];
    this.setSectionData(data);
  }

  /**
   * Number of datas for section.
   *
   * @returns {number}
   */
  count() {
    return this.sectionData.length;
  }

  /**
   * Number of datas remaining for section.
   *
   * @returns {number}
   */
  remaining() {
    return this.dataKeys.length;
  }

  /**
   * Get a random data and remove it's index from remaining datas.
   *
   * @returns {Object}
   *   data object.
   */
  getRandom() {
    if (this.dataKeys.length === 0) {
      this.dataKeys = Object.keys(this.sectionData);
    }

    let randomIndex = Math.floor(Math.random() * this.dataKeys.length);
    let place = this.dataKeys[randomIndex];
    this.dataKeys.splice(randomIndex, 1);
    return this.sectionData[place];
  }

  /**
   * Go through all data, and set ones for this section.
   *
   * @param {Array} data
   */
  setSectionData(data) {
    for (let piece of data) {
      if (piece.section === this.section) {
        this.sectionData.push(piece);
      }
    }
  }
}
