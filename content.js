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
});


function replaceLogoAndFavicon() {
  // Twitter uses SVG for their logos, so we target the SVG path
  let logo = document.querySelector('svg path[d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"]');
  if (logo) {
    // Replace the logo SVG path
    logo.setAttribute('d', 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z');
    // Set the logo color
    chrome.storage.sync.get('logoColor', function(data) {
      var color = data.logoColor || '#1D9BF0'; // Default to original blue if no color is set
      logo.setAttribute('fill', color);});
  }

  // Replace the favicon
  let favicon = document.querySelector('link[rel="shortcut icon"]');
  if (favicon) {
    favicon.href = 'https://abs.twimg.com/favicons/twitter.ico';  // Replace with your new favicon ICO
  }

  
  // Replace the home icon
  let svgPaths = document.querySelectorAll('svg path');

  svgPaths.forEach(function(path) {
    // Check if the current URL is not '/home'
    if (window.location.pathname !== '/home') {
        if (path.getAttribute('d').startsWith('M21.591 7.146L12.52 1.157')) {
            // Set the SVG path when the URL is not '/home'
            path.setAttribute('d', 'M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z');
        }
    } else {
        // Set the original SVG path when the URL is '/home'
        if (path.getAttribute('d').startsWith('M21.591 7.146L12.52 1.157')) {
            path.setAttribute('d', 'M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z');
        }
    }
});


  // Update the tab title
  let titleElement = document.querySelector('title');
  if (titleElement && titleElement.textContent.includes('X')) {
    let regex = / \/ X$/;
    if (regex.test(titleElement.textContent)) {
      // Replace ' / X' with ' / Twitter' at the end of the title
      titleElement.textContent = titleElement.textContent.replace(regex, ' / Twitter');
    }
  }
}




function updateTitle() {
  let titleElement = document.querySelector('title');
  if (titleElement) {
    // Use a regex to target ' / X' at the end of the title
    let regex = / \/ X$/;
    if (regex.test(titleElement.textContent)) {
      // Replace ' / X' with ' / Twitter' at the end of the title
      titleElement.textContent = titleElement.textContent.replace(regex, ' / Twitter');
    }
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
  const elementInline = document.querySelector('button[data-testid="tweetButtonInline"] div span span');
  
  // Targeting the specific modal tweet button
  const elementModal = document.querySelector('button[data-testid="tweetButton"] div span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3 > span');
  
  const elementPillLabel = document.querySelector('div[data-testid="pillLabel"].css-1rynq56.r-dnmrzs.r-1udh08x.r-3s2u2q.r-bcqeeo.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-1kihuf0.r-13hce6t');

  const elementEmptyState = document.querySelector('div[data-testid="empty_state_body_text"].css-1rynq56.r-bcqeeo.r-qvutc0.r-37j5jr.r-fdjqy7.r-a023e6.r-rjixqe.r-16dba41.r-1nxhmzv');

  const elementHoverLabel = document.querySelector('div[data-testid="HoverLabel"] span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3');


  // Function to replace 'Post' with 'Tweet' for inline tweet button
  if (elementInline && elementInline.textContent.includes('Post')) {
    elementInline.textContent = elementInline.textContent.replace('Post', 'Tweet');
  }

  if (elementHoverLabel && elementHoverLabel.textContent.includes('Post')) {
    elementHoverLabel.textContent = elementHoverLabel.textContent.replace('Post', 'Tweet');
  }

  // Function to replace 'Post' with 'Tweet' for modal tweet button
  if (elementModal && elementModal.textContent.includes('Post')) {
    elementModal.textContent = elementModal.textContent.replace('Post', 'Tweet');
  }

    // Function to replace 'Post' with 'Tweet' for the specific element with 'pillLabel' test ID
    if (elementPillLabel && elementPillLabel.textContent.includes('posted')) {
      elementPillLabel.textContent = elementPillLabel.textContent.replace('posted', 'tweeted');
    }

     
    if (elementEmptyState) {
      Array.from(elementEmptyState.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          // Check and replace the specific part of the text
          if (node.textContent.includes('X suspends')) {
            node.textContent = node.textContent.replace('X suspends', 'Twitter suspends');
          }

          if (node.textContent.includes('posts')) {
            node.textContent = node.textContent.replace('posts', 'tweets');
          }


        }
      });
    }


  // Targeting the specific sidebar tweet button
  const elementSidebar = document.querySelector('a[data-testid="SideNav_NewTweet_Button"] span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3');
  if (elementSidebar && elementSidebar.textContent.includes('Post')) {
    elementSidebar.classList.add('custom-tweet-button');
  }
}

function modifyTextContent() {
  // Combine other text modification functions
  const elements = document.querySelectorAll('span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3');

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
      case 'Sign in to X':
        element.textContent = 'Sign in to Twitter';
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
      case 'Welcome to X!':
        element.textContent = 'Welcome to Twitter!';
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
      case 'Save post':
          element.textContent = 'Save tweet';
          break;
      case 'These posts are protected':
        element.textContent = 'These tweets are protected';
        break;
      case 'Undo repost':
        element.textContent = 'Undo retweet';
        break;
        case 'X Rules':
          element.textContent = 'Twitter Rules';
        break;
      case "Share someone else’s post on your timeline by reposting it. When you do, it’ll show up here.":
        element.textContent = "Share someone else’s tweet on your timeline by retweeting it. When you do, it’ll show up here.";
        break;
        default:
          if (element.textContent.includes('Posts')) {
            element.textContent = element.textContent.replace('Posts', 'Tweets');
          } else if (element.textContent.includes('Repost')) {
            element.textContent = element.textContent.replace('Repost', 'Retweet');
          } else if (element.textContent.toLowerCase().includes('posts')) {
            element.textContent = element.textContent.replace(/posts/g, 'tweets');
          }
          
          break;
      }
    });
  }

function continuousObserveModifications() {
  setInterval(() => {
    modifyTextContent();
    modifyPostToTweet();
    replaceLogoAndFavicon();
  }, 100);
}

continuousObserveModifications();