import moment from 'moment';

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
