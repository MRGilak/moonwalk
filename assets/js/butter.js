/* butter.js — small smooth scrolling wrapper
   Usage: include this script and add id="butter" to the element that wraps page content
*/
(function(root){
  var Butter = function() {
    var self = this;

    this.defaults = {
      wrapperId: 'butter',
      wrapperDamper: 0.08,
      cancelOnTouch: true
    };

    this.validateOptions = function(ops) {
      for (var prop in ops) {
        if (self.defaults.hasOwnProperty(prop)) {
          Object.defineProperty(self.defaults, prop, {value: Object.getOwnPropertyDescriptor(ops, prop).value});
        }
      }
    };

    this.wrapperDamper = 0.0001;
    this.wrapperId = 'butter';
    this.cancelOnTouch = true;
    this.wrapper = null;
    this.wrapperOffset = 0;
    this.animateId = null;
    this.resizing = false;
    this.active = false;
    this.wrapperHeight = 0;
  };

  Butter.prototype = {
    init: function(options) {
      if (options) this.validateOptions(options);
      if (this.active) return;

      this.active = true;
      this.resizing = false;
      this.wrapperDamper = this.defaults.wrapperDamper;
      this.wrapperId = this.defaults.wrapperId;
      this.cancelOnTouch = this.defaults.cancelOnTouch;

      this.wrapper = document.getElementById(this.wrapperId);
      if (!this.wrapper) return;

      // Do not enable on touch devices or when user prefers reduced motion
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      this.wrapper.style.position = 'fixed';
      this.wrapper.style.width = '100%';
      this.wrapper.style.top = '0';
      this.wrapper.style.left = '0';

      this.wrapperHeight = this.wrapper.clientHeight;
      document.body.style.height = this.wrapperHeight + 'px';

      this.onResizeBound = this.resize.bind(this);
      this.onTouchBound = this.cancel.bind(this);

      window.addEventListener('resize', this.onResizeBound);
      if (this.cancelOnTouch) window.addEventListener('touchstart', this.onTouchBound);

      this.wrapperOffset = 0.0;
      this.animateId = window.requestAnimationFrame(this.animate.bind(this));
    },

    wrapperUpdate: function() {
      var scrollY = (document.scrollingElement != undefined) ? document.scrollingElement.scrollTop : (document.documentElement.scrollTop || 0.0);
      this.wrapperOffset += (scrollY - this.wrapperOffset) * this.wrapperDamper;
      this.wrapper.style.transform = 'translate3d(0,' + (-this.wrapperOffset.toFixed(2)) + 'px, 0)';
    },

    checkResize: function() {
      if (this.wrapperHeight != this.wrapper.clientHeight) this.resize();
    },

    resize: function() {
      var self = this;
      if (!self.resizing) {
        self.resizing = true;
        window.cancelAnimationFrame(self.animateId);
        window.setTimeout(function() {
          self.wrapperHeight = self.wrapper.clientHeight;
          if (parseInt(document.body.style.height) != parseInt(self.wrapperHeight)) {
            document.body.style.height = self.wrapperHeight + 'px';
          }
          self.animateId = window.requestAnimationFrame(self.animate.bind(self));
          self.resizing = false;
        }, 120);
      }
    },

    animate: function() {
      this.checkResize();
      this.wrapperUpdate();
      this.animateId = window.requestAnimationFrame(this.animate.bind(this));
    },

    cancel: function() {
      if (this.active) {
        window.cancelAnimationFrame(this.animateId);
        window.removeEventListener('resize', this.onResizeBound);
        if (this.cancelOnTouch) window.removeEventListener('touchstart', this.onTouchBound);
        if (this.wrapper) this.wrapper.removeAttribute('style');
        document.body.removeAttribute('style');
        this.active = false;
        this.wrapper = null;
        this.wrapperOffset = 0;
        this.resizing = true;
        this.animateId = null;
      }
    }
  };

  root.butter = new Butter();

  // Auto-init when DOM is ready
  document.addEventListener('DOMContentLoaded', function(){
    try {
      if (root.butter && typeof root.butter.init === 'function') {
        root.butter.init({ wrapperDamper: 0.08, cancelOnTouch: true });
      }
    } catch (e) {
      console.error('butter init failed', e);
    }
  });

})(this);
