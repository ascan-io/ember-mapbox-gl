'use strict';

const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');

module.exports = {
  name: require('./package').name,

  treeForStyles(tree) {
    const mapboxDirName = require('path').dirname(require.resolve('mapbox-gl'));
    const mapboxGlTree = new Funnel(mapboxDirName, {
      files: [ 'mapbox-gl.css' ],
      destDir: 'app/styles'
    });

    if (tree) {
      const MergeTrees = require('broccoli-merge-trees');

      return new MergeTrees([ tree, mapboxGlTree ]);
    }

    return mapboxGlTree;
  },

  treeForVendor() {
    const mapboxDirName = require('path').dirname(require.resolve('mapbox-gl'));

    let mapboxGl = fastbootTransform(new Funnel(mapboxDirName, {
      files: ['mapbox-gl.js'],
      destDir: 'mapbox-gl'
    }));

    return mergeTrees([mapboxGl]);
  },

  included(app) {
    this._super.included.apply(this, arguments);

    let options = app.options[this.name] || {};

    app.import('app/styles/mapbox-gl.css');

    if (!options.excludeJS) {
      app.import('vendor/mapbox-gl/mapbox-gl.js');
    }
  }
};
