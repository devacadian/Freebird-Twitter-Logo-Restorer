window.addEventListener('load', function() {
  replaceLogoAndFavicon();  // Try replacing the logo immediately
  replaceButtonText();
  observeForButtonTextChanges();     // Try replacing the button text immediately
  setTimeout(replaceLogoAndFavicon, 500);  
  setTimeout(replaceButtonText, 500);     // Try again after 0.5 seconds
  setTimeout(replaceLogoAndFavicon, 1000);
  setTimeout(replaceButtonText, 1000);    // Try again after 1 second
  setTimeout(replaceLogoAndFavicon, 2000);
  setTimeout(replaceButtonText, 2000);    // Try again after 2 seconds
  setTimeout(replaceLogoAndFavicon, 3000);
  setTimeout(replaceButtonText, 3000);    // Try again after 3 seconds
  setTimeout(replaceLogoAndFavicon, 4000);
  setTimeout(replaceButtonText, 4000);    // Try again after 4 seconds
  setTimeout(replaceLogoAndFavicon, 5000);
  setTimeout(replaceButtonText, 5000);    // Try again after 5 seconds
});

function replaceLogoAndFavicon() {
  // Twitter uses SVG for their logos, so we target the SVG path
  let logo = document.querySelector('svg path[d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"]');
  if (logo) {
    // Replace the logo SVG path
    logo.setAttribute('d', 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z');
    // Set the logo color
    logo.setAttribute('fill', '#1DA1F2');
  }
  

  // Replace the favicon
  let favicon = document.querySelector('link[rel="shortcut icon"]');
  if (favicon) {
    favicon.href = 'https://abs.twimg.com/favicons/twitter.ico';  // Replace with your new favicon ICO
  }

  // Update the tab title
  let titleElement = document.querySelector('title');
  if (titleElement && titleElement.textContent.includes('X')) {
    titleElement.textContent = titleElement.textContent.replace('X', 'Twitter');
  }
}

  function replaceButtonText() {
    // Find all span elements containing the text 'Post'
    let buttonSpans = document.querySelectorAll('span.css-901oao.css-16my406.r-poiln3.r-bcqeeo.r-qvutc0');
    buttonSpans.forEach(span => {
        if (span.textContent.trim() === 'Post') {
            span.textContent = 'Tweet';
        }
    });
}

function observeForButtonTextChanges() {
  // Select the node that will be observed for mutations
  let targetNode = document.body;

  // Options for the observer (which mutations to observe)
  let config = { attributes: false, childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  let callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        replaceButtonText();
      }
    }
  };

  // Create an observer instance linked to the callback function
  let observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}