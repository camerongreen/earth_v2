(function () {
  function getQuotes() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../data/quotes.json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        JSON.parse(xhr.responseText);
      }
      else {
        console.log('Request failed.  Returned status of ' + xhr.status);
      }
    };
    xhr.send();
  }

  const quotes = getQuotes();

  const view = document.querySelector('.view-section-quotes');

  view.querySelector('.pager-next a').click(() => {
    console.log(quotes);
  });
})();
