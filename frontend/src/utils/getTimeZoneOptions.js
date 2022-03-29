import * as moment from 'moment-timezone';

const getTimeZoneOptions = (showTimezoneOffset) => {
  const timeZones = moment.tz.names();
  const offsetTmz = [];

  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const i in timeZones) {
    const tz = timeZones[i];
    const tzOffset = moment.tz(tz).format('Z');
    // eslint-disable-next-line radix
    const value = parseInt(
      tzOffset
        .replace(':00', '.00')
        .replace(':15', '.25')
        .replace(':30', '.50')
        .replace(':45', '.75')
    ).toFixed(2);

    const timeZoneOption = {
      label: showTimezoneOffset ? `${tz} (GMT${tzOffset})` : tz,
      value
    };
    offsetTmz.push(timeZoneOption);
  }

  return offsetTmz;
};

export default getTimeZoneOptions;
