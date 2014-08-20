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
  // Amount of blocks that are displayed.
  //
  n: 8,

  //
  // Collection of objects, each object represents one block. Blocks have a
  // default width and height of (25/3)%. Height and width are relative and
  // dependant on the total height and width. E.g. 12 square blocks of height
  // and width 1 can be placed horizontal and/or vertical.
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

  /**
   * Called on GET, provide data to render blocks.
   *
   * @param {Function} render completion callback.
   * @api public
   */
  get: function get(render) {
    render(null, {
      blocks: this.blocks.slice(0, this.n),
      dimension: {
        height: this.height,
        width: this.width
      }
    });
  },

  /**
   * Generate random array of numbers. Currently 8 blocks are supported.
   *
   * @returns {Array} randomly shuffled array.
   * @api public
   */
  get random() {
    return shuffle(range(0, this.n - 1).toArray());
  },

  /**
   * Getter that provides a Handlebars helper function. This will randomly
   * generate a set of classes used to set a background color and pattern.
   *
   * @returns {Function} Handlebars helper.
   * api public
   */
  get bg() {
    var cascade = this
      , color, pattern;

    return function bg() {
      if (!color || !color.length) color = cascade.random;
      if (!pattern || !pattern.length) pattern = cascade.random;

      return [
        'bg bg-pattern-',
        color.shift(),
        ' bg-color-',
        pattern.shift()
      ].join('');
    };
  },

  /**
   * Override the default constructor to register the handlebar
   * background helper function once.
   *
   * @api private
   */
  constructor: function constructor() {
    pagelet.__super__.constructor.apply(this);
    this.temper.require('handlebars').registerHelper('bg', this.bg);
  }
}).on(module);