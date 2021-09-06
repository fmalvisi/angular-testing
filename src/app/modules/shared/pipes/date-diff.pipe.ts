import {Pipe, PipeTransform} from '@angular/core';

const thresholds = [
  { limit: 30 * 86400, type: 'month', plural: 'mesi', singular: 'un mese' },
  { limit: 7 * 86400, type: 'week', plural: 'settimane', singular: 'una settimana' },
  { limit: 86400, type: 'day', plural: 'giorni', singular: 'un giorno' },
  { limit: 3600, type: 'hour', plural: 'ore', singular: 'un\'ora' },
  { limit: 60, type: 'minute', plural: 'minuti', singular: 'un minuto' },
];

@Pipe({
  name: 'dateDiff',
  pure: false
})
export class DateDiffPipe implements PipeTransform {

  transform(value: any[]): any {
    if (!value || value.length === 0) {
      return '';
    }
    const [ start, end = Date.now() ] = value;
    let timeDiff = Math.floor((new Date(start).getTime() - new Date(end).getTime()) / 1000);
    for (const { limit, plural, singular } of thresholds) {
      if (Math.abs(timeDiff) >= limit) {
        timeDiff = Math.round(Math.abs(timeDiff) / limit) * Math.sign(timeDiff);
        if (timeDiff < 0) {
          return timeDiff === -1 ? `${singular} fa` : `${-timeDiff} ${plural} fa`;
        } else {
          return timeDiff === 1 ? `tra ${singular}` : `tra ${timeDiff} ${plural}`;
        }
      }
    }
    return timeDiff < 0 ? 'pochi istanti fa' : 'tra pochi istanti';
  }
}
