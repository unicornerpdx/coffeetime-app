(function(global){

  function TinyStore (name, optionalStore) {
    this.version = '0.0.2';
    this.session = {};
    this.store = optionalStore || localStorage;
    this.name = name || 'TinyStore';

    try {
      if (this.store === localStorage && localStorage.getItem) {
        this.enabled = true;
      } else if (this.store === sessionStorage && sessionStorage.getItem) {
        this.enabled = true;
      } else if (this.store && typeof this.store === 'object') {
        this.enabled = true;
      }
    } catch (e) {
      this.enabled = false;
    }

    if (this.enabled) {
      try {
        this.session = JSON.parse(this.store[this.name]) || {};
      } catch (e) {}
    }

    this.save = function () {
      if (this.enabled) {
        this.store[this.name] = JSON.stringify(this.session);
      }
      return this.session;
    };

    this.set = function (key, value) {
      this.session[key] = value;
      this.save();
      return this.session[key];
    };

    this.get = function (key) {
      return this.session[key];
    };

    this.remove = function (key) {
      var value = this.session[key];
      delete this.session[key];
      this.save();
      return value;
    };

    this.clear = function () {
      this.session = {};
      if (this.enabled) {
        delete this.store[this.name];
      }
    };
  }

  global.TinyStore = TinyStore;

})(this);