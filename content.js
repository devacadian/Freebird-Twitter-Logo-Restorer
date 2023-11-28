window.addEventListener('load', function() {
    let style = document.createElement('style');
    style.innerHTML = `
    @media (min-width: 1300px) {
      .custom-tweet-button {
        visibility: hidden;
        position: relative;
      }
  
      .custom-tweet-button::after {
        content: "Tweet";
        visibility: visible;
        position: relative;
        top: -10px;
      }
    `;
    document.head.appendChild(style);
  replaceLogoAndFavicon(); 
  observeTitleChanges();  
  continuousObserveModifications(); 
  continuousObserveModifyPostToTweet(); 
  continuousObserveReplaceLogoAndFavicon();
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

  
  // Replace the home icon
  let svgPaths = document.querySelectorAll('svg path');

  svgPaths.forEach(function(path) {
    if (path.getAttribute('d').startsWith('M21.591 7.146L12.52 1.157')) {
      // Replace the SVG path
      path.setAttribute('d', 'M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z');
    }
  });


  // Update the tab title
  let titleElement = document.querySelector('title');
  if (titleElement && titleElement.textContent.includes('X')) {
    titleElement.textContent = titleElement.textContent.replace('X', 'Twitter');
  }
}




function updateTitle() {
  let titleElement = document.querySelector('title');
  if (titleElement && titleElement.textContent.includes('X')) {
    titleElement.textContent = titleElement.textContent.replace('X', 'Twitter');
  }
}



function observeTitleChanges() {
  // Select the node that will be observed for mutations (the head element where the title resides)
  let targetNode = document.head;

  // Options for the observer (which mutations to observe)
  let config = { childList: true, subtree: true };

  // Callback function to execute when mutations are observed
  let callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
      if (mutation.target.nodeName === 'TITLE') {
        updateTitle();
      }
    }
  };

  // Create an observer instance linked to the callback function
  let observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);
}



function modifyPostToTweet() {
  // Targeting the specific inline tweet button
  const elementInline = document.querySelector('div[data-testid="tweetButtonInline"] span.css-1qaijid.r-bcqeeo.r-qvutc0.r-poiln3');
  // Targeting the specific modal tweet button
  const elementModal = document.querySelector('div[data-testid="tweetButton"] span.css-1qaijid.r-bcqeeo.r-qvutc0.r-poiln3');

  // Function to replace 'Post' with 'Tweet' for inline tweet button
  if (elementInline && elementInline.textContent.includes('Post')) {
    elementInline.textContent = elementInline.textContent.replace('Post', 'Tweet');
  }

  // Function to replace 'Post' with 'Tweet' for modal tweet button
  if (elementModal && elementModal.textContent.includes('Post')) {
    elementModal.textContent = elementModal.textContent.replace('Post', 'Tweet');
  }

  // Targeting the specific sidebar tweet button
  const elementSidebar = document.querySelector('a[data-testid="SideNav_NewTweet_Button"] span.css-1qaijid.r-bcqeeo.r-qvutc0.r-poiln3');
  if (elementSidebar && elementSidebar.textContent.includes('Post')) {
    elementSidebar.classList.add('custom-tweet-button');
  }
}


function modifyTextContent() {
  // Combine other text modification functions
  const elements = document.querySelectorAll('span.css-1qaijid.r-bcqeeo.r-qvutc0.r-poiln3');

  elements.forEach(element => {
    switch (element.textContent) {
      case 'View post engagements':
        element.textContent = 'View tweet engagements';
        break;
      case 'Embed post':
        element.textContent = 'Embed tweet';
        break;
      case 'Live on X':
        element.textContent = 'Live on Twitter';
        break;
      case 'View post analytics':
        element.textContent = 'View tweet analytics';
        break;
     case 'You shared a post':
          element.textContent = 'You shared a tweet';
          break;
     case 'Post Analytics':
        element.textContent = 'Tweet Analytics';
        break;
     case 'Share post via …':
          element.textContent = 'Share tweet via …';
          break;
      case 'Post engagements':
        element.textContent = 'Tweet engagements';
        break;
      case 'No Reposts yet':
        element.textContent = 'No Retweets yet';
        break;
        case 'Report post':
          element.textContent = 'Report tweet';
          break;
      case 'Reposts':
        element.textContent = 'Retweets';
        break;
      case "Share someone else’s post on your timeline by reposting it. When you do, it’ll show up here.":
        element.textContent = "Share someone else’s tweet on your timeline by retweeting it. When you do, it’ll show up here.";
        break;
      default:
        if (element.textContent.includes('Posts')) {
          element.textContent = element.textContent.replace('Posts', 'Tweets');
        } else if (element.textContent.includes('Repost')) {
          element.textContent = element.textContent.replace('Repost', 'Retweet');
        }
        break;
    }
  });
}

function continuousObserveModifications() {
  // Combine all modification functions into a single continuous observation
  setInterval(() => {
    modifyTextContent();
  }, 100);
}

function continuousObserveModifyPostToTweet() {
  setInterval(modifyPostToTweet, 100);
}

function continuousObserveReplaceLogoAndFavicon() {
  setInterval(replaceLogoAndFavicon, 100);
}

continuousObserveModifications();