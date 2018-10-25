import { Promise } from 'rsvp';
import Config from '../../config/environment';
import QUnit from 'qunit';

const MapboxGl = mapboxgl;

MapboxGl.accessToken = Config['mapbox-gl'].accessToken;

export default function createMap() {
  return new Promise((resolve) => {
    const map = new MapboxGl.Map({
      container: document.createElement('div'),
      style: Config['mapbox-gl'].map.style
    });

    map.style.once('data', () => resolve(map));

    const onErr = (data) => {
      QUnit.onUnhandledRejection((data && data.error) || data || 'Empty error event from mapbox-gl-js');
    };

    map.style.on('error', onErr);
    map.on('error', onErr);
  });
}
