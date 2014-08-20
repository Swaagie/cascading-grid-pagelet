'use strict';

var Pagelet = require('pagelet')
  , range = require('r...e')
  , shuffle = require('knuth-shuffle').knuthShuffle
  , pagelet;

//
// Extend the default pagelet and store the extended instance. This allows
// the constructor to access the __super__ property.
//
pagelet = Pagelet.extend({
  view: 'view.hbs',
  css: 'css.styl',

  //
  // Dimensions of the block container, used to calculate the
  // relative width and height in percentages.
  //
  width: '100%',
  height: '600px',

  //
  // Collection of objects, each object represents one block. Blocks have a
  // default width and height of (25/3)%. meaning the
  //
  blocks: [{
    title: 'Web frameworks',
    sub: 'Popular Node.JS frameworks',
    link: '/explore/frameworks',
    height: 4,
    width: 7,
    hover: [
      {
        caption: 'modules',
        icon: 'file',
        n: 12
      },
      {
        caption: 'contributors',
        icon: 'users',
        n: 20
      }
    ]
  }],

  //
  // Called on GET.
  //
  get: function get(render) {
    render(null, {
      blocks: this.blocks,
      dimension: {
        height: this.height,
        width: this.width
      }
    });
  },

  get random() {
    return shuffle(range(0, 7).toArray());
  },

  get bg() {
    var cascade = this
      , color, pattern;

    return function bg() {
      if (!color || !color.length) color = cascade.random;
      if (!pattern || !pattern.length) pattern = cascade.random;

      return [
        'bg-pattern-',
        color.shift(),
        ' bg-color-',
        pattern.shift()
      ].join('');
    };
  },

  constructor: function constructor() {
    pagelet.__super__.constructor.apply(this);
    this.temper.require('handlebars').registerHelper('bg', this.bg);
  }
}).on(module);