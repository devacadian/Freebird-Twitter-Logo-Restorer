const TWITTER_BLUE = '#1DA1F2';
const WHITE = '#ffffff';
const TWITTER_FAVICON_URL = 'https://abs.twimg.com/favicons/twitter.ico';
const POLL_INTERVAL_MS = 100;
const TITLE_SUFFIX_REGEX = / \/ X$/;

const X_LOGO_PATH = 'M21.742 21.75l-7.563-11.179 7.056-8.321h-2.456l-5.691 6.714-4.54-6.714H2.359l7.29 10.776L2.25 21.75h2.456l6.035-7.118 4.818 7.118h6.191-.008zM7.739 3.818L18.81 20.182h-2.447L5.29 3.818h2.447z';
const TWITTER_LOGO_PATH = 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z';

const X_HOME_PATH_PREFIX = 'M21.591 7.146L12.52 1.157';
const HOME_PATHS = {
  inactive: 'M12 9c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4zm0 6c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2zm0-13.304L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM19 19.5c0 .276-.224.5-.5.5h-13c-.276 0-.5-.224-.5-.5V8.429l7-4.375 7 4.375V19.5z',
  active: 'M12 1.696L.622 8.807l1.06 1.696L3 9.679V19.5C3 20.881 4.119 22 5.5 22h13c1.381 0 2.5-1.119 2.5-2.5V9.679l1.318.824 1.06-1.696L12 1.696zM12 16.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5z',
};

const SELECTORS = {
  xLogo: `svg path[d="${X_LOGO_PATH}"]`,
  favicon: 'link[rel="shortcut icon"]',
  allSvgPaths: 'svg path',
  inlineTweetButtonLabel: 'button[data-testid="tweetButtonInline"] div span span',
  modalTweetButtonLabel: 'button[data-testid="tweetButton"] div span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3 > span',
  pillLabel: 'div[data-testid="pillLabel"].css-1rynq56.r-dnmrzs.r-1udh08x.r-3s2u2q.r-bcqeeo.r-qvutc0.r-37j5jr.r-a023e6.r-rjixqe.r-16dba41.r-1kihuf0.r-13hce6t',
  emptyStateBodyText: 'div[data-testid="empty_state_body_text"].css-1rynq56.r-bcqeeo.r-qvutc0.r-37j5jr.r-fdjqy7.r-a023e6.r-rjixqe.r-16dba41.r-1nxhmzv',
  hoverLabel: 'div[data-testid="HoverLabel"] span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3',
  sidebarTweetButtonLabel: 'a[data-testid="SideNav_NewTweet_Button"] span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3',
  textTargets: 'span.css-1jxf684.r-bcqeeo.r-1ttztb7.r-qvutc0.r-poiln3, .public-DraftEditorPlaceholder-inner',
};

const CUSTOM_TWEET_BUTTON_CSS = `
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

const TEXT_REPLACEMENTS = new Map([
  ['View post engagements', 'View tweet engagements'],
  ['View post activity', 'View tweet activity'],
  ['Embed post', 'Embed tweet'],
  ['Live on X', 'Live on Twitter'],
  ['Sign in to X', 'Sign in to Twitter'],
  ['View post analytics', 'View tweet analytics'],
  ['You shared a post', 'You shared a tweet'],
  ['Post Analytics', 'Tweet Analytics'],
  ['Share post via …', 'Share tweet via …'],
  ['Post engagements', 'Tweet engagements'],
  ['Post your reply', 'Post your tweet'],
  ['Welcome to X!', 'Welcome to Twitter!'],
  ['No Reposts yet', 'No Retweets yet'],
  ['Report post', 'Report tweet'],
  ['Not interested in this post', 'Not interested in this tweet'],
  ['Reposts', 'Retweets'],
  ['Save post', 'Save tweet'],
  ['These posts are protected', 'These tweets are protected'],
  ['Undo repost', 'Undo retweet'],
  ['X Rules', 'Twitter Rules'],
  [
    'Share someone else’s post on your timeline by reposting it. When you do, it’ll show up here.',
    'Share someone else’s tweet on your timeline by retweeting it. When you do, it’ll show up here.',
  ],
]);

const FALLBACK_TEXT_REPLACEMENTS = [
  ['Posts', 'Tweets'],
  ['Repost', 'Retweet'],
  [/posts/g, 'tweets'],
];

const EMPTY_STATE_TEXT_REPLACEMENTS = new Map([
  ['X suspends', 'Twitter suspends'],
  ['posts', 'tweets'],
]);

let initialized = false;
let modificationIntervalId = null;

function init() {
  if (initialized) {
    return;
  }

  initialized = true;
  injectCustomTweetButtonStyle();
  replaceLogoAndFavicon();
  observeTitleChanges();
  continuousObserveModifications();
}

function injectCustomTweetButtonStyle() {
  const style = document.createElement('style');
  style.innerHTML = CUSTOM_TWEET_BUTTON_CSS;
  document.head.appendChild(style);
}

function replaceLogoAndFavicon() {
  const logo = document.querySelector(SELECTORS.xLogo);
  if (logo) {
    logo.setAttribute('d', TWITTER_LOGO_PATH);
    logo.setAttribute('fill', TWITTER_BLUE);
  }

  const favicon = document.querySelector(SELECTORS.favicon);
  if (favicon) {
    favicon.href = TWITTER_FAVICON_URL;
  }

  document.querySelectorAll(SELECTORS.allSvgPaths).forEach(updateHomeIconPath);
  updateTitle();
}

function updateHomeIconPath(path) {
  const pathData = path.getAttribute('d') || '';
  if (!pathData.startsWith(X_HOME_PATH_PREFIX)) {
    return;
  }

  const nextPath = window.location.pathname === '/home' ? HOME_PATHS.active : HOME_PATHS.inactive;
  path.setAttribute('d', nextPath);
}

function updateTitle() {
  const titleElement = document.querySelector('title');
  if (titleElement && TITLE_SUFFIX_REGEX.test(titleElement.textContent)) {
    titleElement.textContent = titleElement.textContent.replace(TITLE_SUFFIX_REGEX, ' / Twitter');
  }
}

function observeTitleChanges() {
  const targetNode = document.head;
  const config = { childList: true, subtree: true };
  const callback = function(mutationsList) {
    for (const mutation of mutationsList) {
      if (mutation.target.nodeName === 'TITLE') {
        updateTitle();
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

function replaceText(element, from, to) {
  if (element && element.textContent.includes(from)) {
    element.textContent = element.textContent.replace(from, to);
  }
}

function restoreButtonColors(button) {
  if (!button) {
    return;
  }

  button.style.backgroundColor = TWITTER_BLUE;

  const textContainer = button.querySelector('div');
  if (textContainer) {
    textContainer.style.color = WHITE;
  }
}

function modifyPostToTweet() {
  const elementInline = document.querySelector(SELECTORS.inlineTweetButtonLabel);
  const elementModal = document.querySelector(SELECTORS.modalTweetButtonLabel);
  const elementPillLabel = document.querySelector(SELECTORS.pillLabel);
  const elementEmptyState = document.querySelector(SELECTORS.emptyStateBodyText);
  const elementHoverLabel = document.querySelector(SELECTORS.hoverLabel);

  replaceText(elementInline, 'Post', 'Tweet');
  replaceText(elementHoverLabel, 'Post', 'Tweet');
  restoreButtonColors(elementInline?.closest('button'));

  replaceText(elementModal, 'Post', 'Tweet');
  restoreButtonColors(elementModal?.closest('button'));

  replaceText(elementPillLabel, 'posted', 'tweeted');
  replaceEmptyStateText(elementEmptyState);
  restoreSidebarTweetButton();
}

function replaceEmptyStateText(elementEmptyState) {
  if (!elementEmptyState) {
    return;
  }

  Array.from(elementEmptyState.childNodes).forEach(node => {
    if (node.nodeType !== Node.TEXT_NODE) {
      return;
    }

    for (const [from, to] of EMPTY_STATE_TEXT_REPLACEMENTS) {
      replaceText(node, from, to);
    }
  });
}

function restoreSidebarTweetButton() {
  const elementSidebar = document.querySelector(SELECTORS.sidebarTweetButtonLabel);
  if (!elementSidebar) {
    return;
  }

  elementSidebar.classList.add('custom-tweet-button');

  const sidebarButton = elementSidebar.closest('a');
  if (!sidebarButton) {
    return;
  }

  sidebarButton.style.backgroundColor = TWITTER_BLUE;

  const innerDiv = sidebarButton.querySelector('div');
  if (!innerDiv) {
    return;
  }

  innerDiv.style.color = WHITE;

  const svgIcon = innerDiv.querySelector('svg');
  if (!svgIcon) {
    return;
  }

  svgIcon.style.color = WHITE;
  svgIcon.style.fill = WHITE;
  svgIcon.querySelectorAll('path').forEach(path => {
    path.setAttribute('fill', WHITE);
  });
}

function modifyTextContent() {
  const elements = document.querySelectorAll(SELECTORS.textTargets);

  elements.forEach(element => {
    const exactReplacement = TEXT_REPLACEMENTS.get(element.textContent);
    if (exactReplacement) {
      element.textContent = exactReplacement;
      return;
    }

    for (const [from, to] of FALLBACK_TEXT_REPLACEMENTS) {
      if (typeof from === 'string' && element.textContent.includes(from)) {
        element.textContent = element.textContent.replace(from, to);
        return;
      }

      if (from instanceof RegExp) {
        const nextText = element.textContent.replace(from, to);
        if (nextText !== element.textContent) {
          element.textContent = nextText;
          return;
        }
      }
    }
  });
}

function continuousObserveModifications() {
  if (modificationIntervalId) {
    return;
  }

  modificationIntervalId = setInterval(() => {
    modifyTextContent();
    modifyPostToTweet();
    replaceLogoAndFavicon();
  }, POLL_INTERVAL_MS);
}

if (document.readyState === 'loading') {
  window.addEventListener('load', init, { once: true });
} else {
  init();
}
