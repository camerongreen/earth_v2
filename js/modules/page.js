/**
 * Get section name from URL.
 *
 * @returns {String} section
 */
export function getSection() {
  return getSectionPath().pop();
}

/**
 * Returns the full path to a section as an Array.
 *
 * @return Array pathSections
 */
export function getSectionPath() {
  var path = window.location.pathname;
  var parts = path.split('/');
  var docLocation = [];
  for (let part of parts) {
    docLocation.push(part);
    if (['e', 'a', 'r', 't', 'h', 'about'].indexOf(part) !== -1) {
      break;
    }
  }

  return docLocation;
}

/**
 * Get section URL.
 *
 * @returns {String} sectionUrl
 */
export function getSectionUrl() {
  return getSectionPath().join('/');
}

