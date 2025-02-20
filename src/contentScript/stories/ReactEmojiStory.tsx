import { useEffect } from 'react';
import constants from '../../configs/constants';
interface Emoji {
  value: string;
  image_url: string;
  image_anim_url: string;
  url: string;
}
const ReactEmojiStory = () => {
  function getEmojiNameFromUrl(url: string): string {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    const emojiName = fileName.split('_')[0].replace(/-/g, ' ');
    return emojiName;
  }

  function loadModal(EMOJI_LIST: Emoji[]) {
    const fb_dtsg = getFbdtsg();
    const user_id = getUserId();

    const btnReact = document.createElement('div');
    btnReact.setAttribute('class', 'btn-react');
    btnReact.innerHTML = `
    <svg class="icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="12" y1="4" x2="12" y2="20" stroke="white" stroke-width="3" stroke-linecap="round"></line>
        <line x1="4" y1="12" x2="20" y2="12" stroke="white" stroke-width="3" stroke-linecap="round"></line>
    </svg>
    `;

    const emojiGroup = document.createElement('ul');
    emojiGroup.setAttribute('class', 'emoji-group');

    const menuContainer = document.createElement('div');
    menuContainer.setAttribute('class', 'menu-container');

    const title = document.createElement('span');
    title.setAttribute('class', 'title');
    title.textContent = constants.name;
    title.setAttribute('tooltip', 'If you reacted but don’t see your reaction on the story, try refreshing the page (F5).');

    const subTitle = document.createElement('span');
    subTitle.setAttribute('class', 'sub-title');
    subTitle.innerHTML = 'Developed by ' + constants.author;

    const linkWithTooltip = subTitle.querySelector('a[tooltip]');

    menuContainer.appendChild(title);
    menuContainer.appendChild(subTitle);

    let timeout: NodeJS.Timeout;

    btnReact.addEventListener('mouseover', () => {
      btnReact.style.transform = 'scale(1.2)';
      btnReact.style.border = '1.5px solid white';
      menuContainer.classList.add('show');
      rotateIcon(45);
      clearTimeout(timeout);
    });

    btnReact.addEventListener('mouseout', () => {
      timeout = setTimeout(() => {
        if (!menuContainer.matches(':hover')) {
          menuContainer.classList.remove('show');
        }
        rotateIcon(0);
        btnReact.style.border = '1.5px solid #474747';
      }, 500);
      btnReact.style.transform = 'scale(1)';
    });

    menuContainer.addEventListener('mouseover', () => {
      clearTimeout(timeout);
    });

    menuContainer.addEventListener('mouseout', () => {
      timeout = setTimeout(() => {
        menuContainer.classList.remove('show');
        btnReact.style.border = '1.5px solid #474747';
        rotateIcon(0);
      }, 500);
      btnReact.style.transform = 'scale(1)';
    });

    function rotateIcon(degrees: number) {
      const icon = btnReact.querySelector('.icon') as HTMLElement;
      icon.style.transition = 'transform 0.5s';
      icon.style.transform = `rotate(${degrees}deg)`;
    }

    const emojiHistory: Emoji[] = JSON.parse(localStorage.getItem('emojiHistory') || '[]');

    groupEmoji(fb_dtsg, user_id, emojiGroup, emojiHistory);

    const filteredEmojiList = EMOJI_LIST.filter(emoji =>
      !emojiHistory.some(historyItem => historyItem.value === emoji.value)
    );

    groupEmoji(fb_dtsg, user_id, emojiGroup, filteredEmojiList);

    menuContainer.appendChild(emojiGroup);

    const moreReactions = document.createElement('div');
    moreReactions.setAttribute('class', 'more-reactions');
    moreReactions.appendChild(btnReact);
    moreReactions.appendChild(menuContainer);

    const timeoutCheckStoriesFooter = setInterval(() => {
      const storiesFooter = document.getElementsByClassName('x11lhmoz x78zum5 x1q0g3np xsdox4t x10l6tqk xtzzx4i xwa60dl xl56j7k xtuxyv6');
      if (storiesFooter.length > 0) {
        clearInterval(timeoutCheckStoriesFooter);
        storiesFooter[storiesFooter.length - 1].appendChild(moreReactions);
      }
    }, 100);
  }

  (function () {
    'use strict';

    let isMoreReactionsAdded = false;

    function setupContentEditableTracking() {
      const textArea = document.querySelector('[contenteditable="true"][role="textbox"].notranslate._5rpu') as HTMLElement;
      const moreReactions = document.querySelector('.more-reactions') as HTMLElement;
      if (!moreReactions) return;

      if (textArea) {
        textArea.addEventListener("focus", () => {
          if (moreReactions.parentElement) {
            moreReactions.parentElement.removeChild(moreReactions);
            isMoreReactionsAdded = false;
          }
        });

        textArea.addEventListener("blur", () => {
          if (!isMoreReactionsAdded) {
            const timeoutCheckStoriesFooter = setInterval(() => {
              const storiesFooter = document.getElementsByClassName('x11lhmoz x78zum5 x1q0g3np xsdox4t x10l6tqk xtzzx4i xwa60dl xl56j7k xtuxyv6');
              const reactions = document.getElementsByClassName('x78zum5 xl56j7k');

              let targetDiv: Element | null = null;

              for (let i = 0; i < reactions.length; i++) {
                const element = reactions[i] as HTMLElement;
                const width = element.offsetWidth;

                if (width === 336) {
                  targetDiv = element;
                  break;
                }
              }

              if (storiesFooter.length > 0 && targetDiv) {
                clearInterval(timeoutCheckStoriesFooter);

                if (!isMoreReactionsAdded) {
                  storiesFooter[storiesFooter.length - 1].appendChild(moreReactions);
                  isMoreReactionsAdded = true;
                }
              }
            }, 100);
          }
        });
      }
    }

    window.addEventListener('load', setupContentEditableTracking);

    const observer = new MutationObserver(() => {
      setupContentEditableTracking();
    });

    observer.observe(document.body, { childList: true, subtree: true });
  })();

  let storyState = false;

  function getButton(): HTMLElement | undefined {
    const buttons = document.querySelectorAll('[role="button"]');
    return Array.from(buttons).find(button =>
      button.querySelector('div.x1ypdohk.xdj266r.xw3qccf.xat24cr.xsgj6o6')
    ) as HTMLElement | undefined;
  }

  function groupEmoji(fb_dtsg: string, user_id: string, emojiGroup: HTMLElement, emojiList: Emoji[]) {
    let tooltipTimeout: NodeJS.Timeout;
    const svgPath = 'svg path[d="m18.477 12.906-9.711 5.919A1.148 1.148 0 0 1 7 17.919V6.081a1.148 1.148 0 0 1 1.766-.906l9.711 5.919a1.046 1.046 0 0 1 0 1.812z"]';

    emojiList.forEach(emoji => {
      const emojiLi = document.createElement('li');
      emojiLi.setAttribute('class', 'emoji');
      emojiLi.setAttribute('value', emoji.value);

      const emojiContent = document.createElement('span');
      emojiContent.setAttribute('class', 'emoji-content');
      emojiContent.textContent = emoji.value;
      emojiContent.style.textShadow = '0 0 4px #0000005a';

      const emojiImage = document.createElement('img');
      emojiImage.setAttribute('class', 'emoji-image');
      emojiImage.setAttribute('src', emoji.image_url);
      emojiLi.appendChild(emojiImage);

      const emojiImageAnim = document.createElement('img');
      emojiImageAnim.setAttribute('class', 'emoji-image-anim');
      emojiImageAnim.setAttribute('src', emoji.image_anim_url);
      emojiLi.appendChild(emojiImageAnim);

      const tooltip = document.createElement('div');
      tooltip.classList.add('info-emoji');
      tooltip.textContent = getEmojiNameFromUrl(emoji.image_url);

      emojiLi.addEventListener('mouseenter', () => {
        const stopButton = getButton();

        if (stopButton) {
          const svgCheck = document.querySelector(svgPath);
          if (!svgCheck && !storyState) {
            stopButton.click();
            storyState = true;
          }
        }

        tooltipTimeout = setTimeout(() => {
          tooltip.style.opacity = '1';
          tooltip.style.transform = 'translateY(0)';
        }, 500);

        document.body.appendChild(tooltip);

        const rect = emojiLi.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        const leftPosition = rect.left + window.pageXOffset + (rect.width / 2) - (tooltipRect.width / 2);
        const topPosition = rect.bottom + window.pageYOffset + 5;

        tooltip.style.left = `${leftPosition}px`;
        tooltip.style.top = `${topPosition}px`;

        const rightEdge = leftPosition + tooltipRect.width;
        const bottomEdge = topPosition + tooltipRect.height;

        if (rightEdge > window.innerWidth) {
          tooltip.style.left = `${window.innerWidth - tooltipRect.width - 10}px`;
        }

        if (bottomEdge > window.innerHeight) {
          tooltip.style.top = `${rect.top + window.pageYOffset - tooltipRect.height - 5}px`;
        }

        const menuRect = emojiGroup.getBoundingClientRect();
        if (bottomEdge > menuRect.bottom) {
          tooltip.style.top = `${rect.top + window.pageYOffset - tooltipRect.height - 5}px`;
        } else if (topPosition < menuRect.top) {
          tooltip.style.top = `${rect.bottom + window.pageYOffset + 5}px`;
        }
      });

      emojiLi.addEventListener('mouseleave', () => {
        emojiImageAnim.addEventListener(
          'transitionend',
          () => {
            if (getComputedStyle(emojiImageAnim).opacity === '0') {
              emojiImageAnim.style.display = 'none';
              emojiImageAnim.setAttribute('src', '');
              emojiImageAnim.setAttribute('src', emoji.image_anim_url);
              emojiImageAnim.style.display = 'block';
            }
          },
          { once: true }
        );
        clearTimeout(tooltipTimeout);
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateY(10px)';
        setTimeout(() => {
          if (tooltip.parentElement) {
            tooltip.parentElement.removeChild(tooltip);
          }
        }, 200);
      });

      emojiLi.onclick = async function () {
        emojiLi.style.backgroundColor = 'rgba(165, 165, 165, 0.9)';
        emojiLi.style.borderRadius = '5px';
        emojiImageAnim.style.transform = 'scale(1.2)';
        setTimeout(() => {
          emojiLi.style.backgroundColor = '';
          emojiImageAnim.style.transform = 'scale(1)';
        }, 200);

        const storyId = getStoryId();
        try {
          saveEmojiToHistory(emoji.value, emoji.image_url, emoji.image_anim_url);
          await reactStory(user_id, fb_dtsg, storyId, emoji.value);
        } catch (e) {
          console.error(e);
        }
      };

      emojiGroup.appendChild(emojiLi);

      emojiGroup.addEventListener('mouseleave', () => {
        const playButton = getButton();
        if (playButton && storyState) {
          const svgCheck = document.querySelector(svgPath);
          if (svgCheck) {
            playButton.click();
          }
        }
        storyState = false;
      });
    });
  }

  function saveEmojiToHistory(emojiValue: string, emojiImageUrl: string, emojiImageAnimUrl: string) {
    let emojiHistory: Emoji[] = JSON.parse(localStorage.getItem('emojiHistory') || '[]');

    const emoji = { value: emojiValue, image_url: emojiImageUrl, image_anim_url: emojiImageAnimUrl, url: '' };

    const emojiIndex = emojiHistory.findIndex(item => item.value === emojiValue);

    if (emojiIndex !== -1) {
      emojiHistory.splice(emojiIndex, 1);
    }

    emojiHistory.unshift(emoji);

    if (emojiHistory.length > 10) {
      emojiHistory.pop();
    }

    localStorage.setItem('emojiHistory', JSON.stringify(emojiHistory));
  }

  var toasts: HTMLElement[] = [];

  function showToast(message: string) {
    const toast = document.createElement('div');
    toast.setAttribute('class', 'toast');
    toast.textContent = message;
    toast.style.overflow = 'hidden';

    const progressBar = document.createElement('div');
    progressBar.setAttribute('class', 'progress-bar');
    toast.appendChild(progressBar);

    document.body.appendChild(toast);
    toasts.push(toast);

    updateToastPositions();

    setTimeout(() => {
      progressBar.style.width = '0%';
    }, 100);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }

        const index = toasts.indexOf(toast);
        if (index > -1) {
          toasts.splice(index, 1);
          updateToastPositions();
        }
      }, 510);
    }, 3000);
  }

  function updateToastPositions() {
    toasts.forEach((toast, index) => {
      toast.style.bottom = `${70 + (index * 40)}px`;
    });
  }

  function getStoryId(): string {
    const htmlStory = document.getElementsByClassName('xh8yej3 x1n2onr6 xl56j7k x5yr21d x78zum5 x6s0dn4');
    return htmlStory[htmlStory.length - 1].getAttribute('data-id') || '';
  }

  function getFbdtsg(): string {
    const regex = /"DTSGInitialData",\[],{"token":"(.+?)"/gm;
    const resp = regex.exec(document.documentElement.innerHTML);
    return resp ? resp[1] : '';
  }

  function getUserId(): string {
    const regex = /c_user=(\d+);/gm;
    const resp = regex.exec(document.cookie);
    return resp ? resp[1] : '';
  }

  function reactStory(user_id: string, fb_dtsg: string, story_id: string, message: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const variables = {
        input: {
          lightweight_reaction_actions: {
            offsets: [0],
            reaction: message,
          },
          story_id,
          story_reply_type: 'LIGHT_WEIGHT',
          actor_id: user_id,
          client_mutation_id: 7,
        },
      };

      const body = new URLSearchParams();
      body.append('av', user_id);
      body.append('__user', user_id);
      body.append('__a', '1');
      body.append('fb_dtsg', fb_dtsg);
      body.append('fb_api_caller_class', 'RelayModern');
      body.append('fb_api_req_friendly_name', 'useStoriesSendReplyMutation');
      body.append('variables', JSON.stringify(variables));
      body.append('server_timestamps', 'true');
      body.append('doc_id', '3769885849805751');

      try {
        const response = await fetch('https://www.facebook.com/api/graphql/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body,
        });
        const res = await response.json();

        if (res.errors) {
          return reject(res);
        }

        showToast(`You reacted with an emoji ${message}`);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  useEffect(() => {
    (async () => {
      if (document.getElementsByClassName('btn-react').length > 0) return;
      try {
        const emojiJsonUrl = chrome.runtime.getURL('src/assets/data/emoji.json');
        const emojiJson = await fetch(emojiJsonUrl);
        const EMOJI_LIST: Emoji[] = await emojiJson.json();
        loadModal(EMOJI_LIST);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div>
      <style>
        {`
      ::-webkit-scrollbar {
        width: 4px;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #dcdcdcae;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
        background: #585858;
        border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: #3e3e3e;
        border-radius: 10px;
    }

    .more-reactions {
        position: relative;
        user-select: none;
    }

    .btn-react {
        height: 38px;
        width: 38px;
        border: 1.5px solid #474747;
        background: linear-gradient(135deg, #303030, #111111);
        display: flex;
        color: #ffffff;
        font-weight: 400;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        cursor: pointer;
        transform: translateY(3.5px);
        transition: all 0.15s ease-in-out;
        animation: fadein 0.2s;
        backdrop-filter: blur(15px);
    }

    @keyframes fadein {
        from {
        transform: translateY(100px);
        }

        to {
        transform: translateY(0);
        }
    }

    .toast {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(15px);
        color: #000000;
        padding: 8px 15px;
        font-size: 15px;
        font-weight: 500;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        z-index: 1000;
        transition: opacity 0.5s ease;
        overflow: hidden;
    }

    .progress-bar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background-color: #00a1f1;
        transition: all 3s ease-in-out;
    }

    .menu-container {
        position: absolute;
        padding: 0 5px 5px 5px;
        bottom: 60px;
        display: flex;
        right: 0;
        flex-flow: column nowrap;
        align-items: center;
        background-color: rgba(24, 24, 24, 0.7);
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.2s ease-in-out, visibility 0.2s ease;
        backdrop-filter: blur(15px);
    }


    .emoji-group {
        right: 0;
        width: 250px;
        height: 200px;
        padding: 0 15px 15px 15px;
        list-style: none;
        margin: 0;
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        overflow-y: scroll;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .info-emoji {
        position: absolute;
        background-color: #333;
        color: #fff;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.2s, transform 0.2s;
        pointer-events: none;
        z-index: 1000;
    }

    .title {
        font-size: 16px;
        font-weight: bold;
        white-space: nowrap;
        color: white;
        margin: 8px 12px 0px 12px;
        align-items: center;
    }

    .sub-title {
        font-size: 12px;
        color: #c0c0c0;
        align-items: center;
        margin-bottom: 8px;
        font-weight: bold;
    }

    .menu-container.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .menu-container.hide {
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
    }

    .emoji {
        height: 50px;
        width: 50px;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        font-size: 30px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out, border-radius 0.3s ease-in-out;
    }

    .emoji-image, .emoji-image-anim {
        position: absolute;
        vertical-align: middle;
        object-fit: cover;
        transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out;
        cursor: pointer;
    }

    .emoji-image {
        transform: translateY(1px);
        width: 34.8px;
        height: 34.8px;
        opacity: 1;
    }
    .emoji-image-anim {
        height: 34px;
        width: 34px;
        transform: translateY(2px);
        opacity: 0;
    }
    .emoji:hover .emoji-image {
        opacity: 0; /* Ẩn nội dung khi hover */
    }

    .emoji:hover .emoji-image-anim {
        opacity: 1; /* Hiển thị ảnh khi hover */
    }

    .emoji:hover {
        background-color: rgba(165, 165, 165, 0.5);
    }

    a {
        text-decoration-line: none;
    }

    a:hover {
        text-decoration-line: underline;
    }

    [tooltip] {
        position: relative;
        display: inline-block;
    }

    [tooltip]:before,
    [tooltip]:after {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        pointer-events: none;
        user-select: none;
        opacity: 0;
        transition: opacity 0.2s ease 0.2s;
    }

    [tooltip]:before {
        content: attr(tooltip);
        text-align: center;
        font-size: 12px;
        font-weight: normal;
        background-color: #323435;
        color: #eee;
        padding: 8px;
        width: max-content;
        max-width: 250px;
        white-space: normal;
        bottom: calc(80% + 10px);
        border-radius: 3px;
        box-shadow: 0 5px 15px -5px rgba(0, 0, 0, 0.65);
    }

    [tooltip]:after {
        content: "";
        bottom: calc(50% + 1px);
        border: 8px solid transparent;
        border-top-color: #323435;
    }

    [tooltip]:hover:before,
    [tooltip]:hover:after,
    [tooltip]:focus:before,
    [tooltip]:focus:after,
    [tooltip]:active:before,
    [tooltip]:active:after {
        opacity: 1;
    }

    [tooltip].tooltip-multiline:before {
        width: 100vw;
        max-width: 240px;
        white-space: normal;
    }

    [tooltip][class*="tooltip-bottom"]:before,
    [tooltip][class*="tooltip-bottom"]:after {
        transform: translateX(-50%);
    }

    [tooltip][class*="tooltip-bottom"]:before {
        bottom: auto;
        top: calc(80% + 10px);
    }

    [tooltip][class*="tooltip-bottom"]:after {
        bottom: auto;
        top: calc(50% + 1px);
        border-top-color: transparent;
        border-bottom-color: #323435;
    }

    [tooltip].tooltip-bottom-left:before {
        transform: translateX(-24px);
    }

    [tooltip].tooltip-bottom-right:before {
        left: auto;
        right: 50%;
        transform: translateX(24px);
    }

    [tooltip].tooltip-top-left:before {
        transform: translateX(-24px);
    }

    [tooltip].tooltip-top-right:before {
        left: auto;
        right: 50%;
        transform: translateX(24px);
    }

    [tooltip].show-tooltip:before,
    [tooltip].show-tooltip:after {
        opacity: 1;
        transition: opacity 0.2s ease;
    }
      `}
      </style>
    </div>
  );
}

export default ReactEmojiStory;
