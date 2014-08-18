'use strict';

require('pagelet').extend({
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
    })
  }
}).on(module);