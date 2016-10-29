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

export function registerContentEvent(dom) {
  for (let anchor of dom.querySelectorAll('.content a')) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      ipcRenderer.send('open:externalURL', { url: e.target.href });
    });
  }
}
