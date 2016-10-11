(() => {
  function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 0);
    var last,
        deferTimer;
    return function () {
      var context = scope || this;

      var now = +new Date,
          args = arguments;
      if (last && now < last + threshhold) {
        // hold on to it
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          last = now;
          fn.apply(context, args);
        }, threshhold);
      } else {
        last = now;
        fn.apply(context, args);
      }
    }
  }

  function noop() {}

  class HowFar {
    constructor(opts={}) {
      this.opts = {};
      this.opts.parent = opts.parent || 'body';
      this.opts.article = opts.article || 'article';
      this.opts.throttleAmt = opts.throttleAmt || 0;
      this.opts.onScroll = opts.onScroll || noop;
      this.opts.onFinish = opts.onFinish || noop;
      this.opts.containerBackground = opts.containerBackground || '#eeeeee' ;
      this.opts.template = opts.template || `<div class="reading-progress"><div class="reading-progress-bar"></div></div>`;
      this.insert();
    }

    insert() {
      let parent = document.querySelector(this.opts.parent);
      let child = document.createElement('div');
      child.innerHTML = this.opts.template;
      if (this.opts.after) {
        parent.appendChild(child.firstChild);
      } else {
        parent.insertBefore(child.firstChild, parent.firstChild);
      }

      this.listen();
    }

    listen() {
      this.scrollListener = throttle(this.update.bind(this), this.opts.throttleAmt);
      this.resizeListener = throttle(this.update.bind(this), this.opts.throttleAmt);
      window.addEventListener('scroll', this.scrollListener);
      window.addEventListener('resize', this.resizeListener);
    }

    update() {
      if (!this.article) {
        this.article = document.querySelector(this.opts.article);
      }
      if (!this.bar) {
        this.bar = document.querySelector('.reading-progress');
      }

      let articleTop = this.article.offsetTop,
          articleHeight = this.article.clientHeight,
          windowHeight = window.innerHeight,
          articleOffset = window.scrollY - articleTop,
          percentageComplete = (articleOffset/(articleHeight-windowHeight));

      this.bar.firstChild.style.transform = `scaleX(${percentageComplete})`;

      this.opts.onScroll.call(this, percentageComplete);

      if (percentageComplete >= 1) {
        this.opts.onFinish.call(this);
        this.finished = true;
      }
    }

    destroy() {
      window.removeEventListener('scroll', this.scrollListener);
      window.removeEventListener('resize', this.resizeListener);
      this.bar.remove();
    }
  }

  window.HowFar = HowFar;
})(window);
