const article = document.querySelector('.rich_media');
console.log("article:" + article)

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;

  const wordMatchRegExp = /\b\w+\b/g;
  const words = text.matchAll(wordMatchRegExp);
  console.log(text);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  console.log("wordCount:" + wordCount);
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement('p');
  // Use the same styling as the publish information in an article's header
  badge.classList.add('color-secondary-text', 'type--caption');
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector('h1');
  // Support for article docs with date
  const date = article.querySelector('time')?.parentNode;

  (date ?? heading).insertAdjacentElement('afterend', badge);
}

