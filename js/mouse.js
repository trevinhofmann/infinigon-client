function Mouse() {

  this.leftDownCallbacks = [];
  this.rightDownCallbacks = [];
  this.leftUpCallbacks = [];
  this.rightUpCallbacks = [];

  this.x = 0;
  this.y = 0;

  window.oncontextmenu = function() { return false };

  var mouse = this;

  $(document).mousedown(function(e) {
    if (e.button == 0) {
      e.preventDefault();
      for (var i in mouse.leftDownCallbacks) {
        mouse.leftDownCallbacks[i]();
      }
    } else if(e.button == 2) {
      e.preventDefault();
      for (var i in mouse.rightDownCallbacks) {
        mouse.rightDownCallbacks[i]();
      }
    }
  });

  $(document).mouseup(function(e) {
    if (e.button == 0) {
      e.preventDefault();
      for (var i in mouse.leftUpCallbacks) {
        mouse.leftUpCallbacks[i]();
      }
    } else if(e.button == 2) {
      e.preventDefault();
      for (var i in mouse.rightUpCallbacks) {
        mouse.rightUpCallbacks[i]();
      }
    }
  });

  $(document).mousemove(function(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
  });

}

Mouse.prototype.onLeftDown = function(callback) {
  this.leftDownCallbacks.push(callback);
};

Mouse.prototype.onRightDown = function(callback) {
  this.rightDownCallbacks.push(callback);
};

Mouse.prototype.onLeftUp = function(callback) {
  this.leftUpCallbacks.push(callback);
};

Mouse.prototype.onRightUp = function(callback) {
  this.rightUpCallbacks.push(callback);
};