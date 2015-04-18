function Board(options) {

  if (!options) {
    throw new Error('options must be specified');
  }

  if (!options.size || !options.size.width || !options.size.height) {
    throw new Error('options.size must be specified');
  }

  this.size = {
    width: options.size.width,
    height: options.size.height
  };

  this.div = $('<div>', {
    class: 'board'
  });
  this.div.css('width', this.size.width+'px');
  this.div.css('height', this.size.height+'px');
  $('body').append(this.div);

  this.pieces = {};

}