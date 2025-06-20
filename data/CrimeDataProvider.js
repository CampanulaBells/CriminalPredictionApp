const MS_IN_DAY = 24 * 60 * 60 * 1000;

function parseDate(dateStr) {
  return new Date(dateStr); // assumes 'MM/DD/YYYY'
}

export default class CrimeDataProvider {
  // Get historical crime events (filter by days if necessary)
  static getHistoricalEvents(days = null) {
    const events = [
      { id: 1, type: 'CRIMINAL DAMAGE', date: '10/06/2025', lat: 41.9170, lon: -87.7660 },
      { id: 2, type: 'BURGLARY', date: '10/06/2025', lat: 41.9190, lon: -87.7635 },
      { id: 3, type: 'THEFT', date: '10/08/2023', lat: 41.9180, lon: -87.7640 },
      { id: 4, type: 'ASSAULT', date: '10/06/2025', lat: 41.9150, lon: -87.7675 },
      { id: 5, type: 'VANDALISM', date: '10/06/2025', lat: 41.9192, lon: -87.7630 },
      { id: 6, type: 'ROBBERY', date: '10/06/2025', lat: 41.9197, lon: -87.7615 },
    ];

    if (!days) return events;

    const now = new Date('10/13/2025'); // match event dates
//    return events.filter(e => (now - new Date(e.date)) / (24 * 60 * 60 * 1000) <= days);
return events
  }

  // Get forecasted crime points (filter by days if necessary)
  static getForecastedPoints(days = 1) {
    const allForecast = [
      { id: 'f1', lat: 41.9170, lon: -87.7660, crimes: { 'CRIMINAL DAMAGE': 0.8, 'BURGLARY': 0.2 } },
      { id: 'f2', lat: 41.9190, lon: -87.7635, crimes: { 'THEFT': 0.9, 'ASSAULT': 0.1 } },
      { id: 'f3', lat: 41.9150, lon: -87.7675, crimes: { 'BURGLARY': 0.5, 'THEFT': 0.4 } },
      { id: 'f4', lat: 41.9180, lon: -87.7640, crimes: { 'ASSAULT': 0.6, 'THEFT': 0.4 } }, // Starting location
      { id: 'f5', lat: 41.9165, lon: -87.7652, crimes: { 'VANDALISM': 0.5, 'ROBBERY': 0.3 } },
      { id: 'f6', lat: 41.9202, lon: -87.7625, crimes: { 'ROBBERY': 0.6, 'CRIMINAL DAMAGE': 0.4 } },
    ];

//    return allForecast.filter(p => p.day <= days);
    return allForecast;
  }
}