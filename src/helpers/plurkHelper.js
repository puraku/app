import moment from 'moment';
import { ipcRenderer } from 'electron';

export function postedDateTagger(plurks) {
  return plurks.map((plurk, index) => {
    const previousPlurk = plurks[index - 1];

    return {
      ...plurk,
      showPostedDate: !(previousPlurk && (formatDate(previousPlurk) === formatDate(plurk)))
    };
  });
}

export function formatDate(plurk) {
  const formatedDate = moment.parseZone(plurk.posted).format('YYYY-MM-DD');

  if (moment().format('YYYY-MM-DD') === formatedDate) {
    return 'Today';
  } else {
    return formatedDate;
  }
}

function handleContentClick (e) {
  e.preventDefault();

  if (typeof e.target.href === 'undefined') {
    let img = new Image();
    img.onload = function () {
      ipcRenderer.send(
        'open:externalImage',
        {
          url: e.target.parentElement.href,
          height: this.height,
          width: this.width
        }
      );
    };
    img.src = e.target.parentElement.href;
  } else {
    ipcRenderer.send('open:externalURL', { url: e.target.href });
  }
}

export function registerContentEvent(dom) {
  for (let anchor of dom.querySelectorAll('.content a')) {
    anchor.removeEventListener('click', handleContentClick);
    anchor.addEventListener('click', handleContentClick);
  }
}

export function unregisterContentEvent(dom) {
  for (let anchor of dom.querySelectorAll('.content a')) {
    anchor.removeEventListener('click', handleContentClick);
  }
}

export function mouseWheelHandler ({ plurksContainer, profile, originalHeight, self }) {
  return function (e) {
    e.preventDefault();

    const deltaY = e.deltaY;

    const maxNameTranslate = 82;
    const maxContentTranslate = 60;

    let contentMoved;
    let nameMoved;

    // prevent overscrolling
    if (self.scrollLength + deltaY < 0) {
      self.scrollLength = 0;
    } else if (self.scrollLength + deltaY > plurksContainer.scrollHeight - 3 * originalHeight) {
      self.scrollLength = plurksContainer.scrollHeight - 3 * originalHeight;
    } else {
      self.scrollLength += deltaY;
    }

    // handle virtual scroll value
    if (self.scrollLength < originalHeight) {
      nameMoved = self.scrollLength / originalHeight * maxNameTranslate;
      contentMoved = self.scrollLength / originalHeight * maxContentTranslate;

      this.scrollTop = 0;
    } else {
      nameMoved = maxNameTranslate;
      contentMoved = maxContentTranslate;
      this.scrollTop = self.scrollLength - originalHeight;
    }

    const op = self.scrollLength > 0 ? '-' : '+';
    profile.style.height = `calc(14em ${op} ${Math.abs(self.scrollLength)}px)`;

    profile.querySelector('.display-name').style.transform = `translateY(-${nameMoved}px)`;

    profile.querySelector('.avatar').style.transform = `translateY(-${contentMoved}px)`;
    profile.querySelector('.nickname').style.transform = `translateY(-${contentMoved}px)`;

    const opacityPercentage = contentMoved / maxContentTranslate * 100;
    profile.querySelector('.avatar img').style.filter = `opacity(${100 - opacityPercentage}%)`;
    profile.querySelector('.nickname').style.filter = `opacity(${100 - opacityPercentage}%)`;

    // console.log(`deltaY: ${deltaY}, scrollLength: ${self.scrollLength}, scrollTop: ${this.scrollTop}, originalHeight: ${originalHeight}, scrollHeight: ${plurksContainer.scrollHeight}`);
  };
}


