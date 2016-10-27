(function () {
  var content = document.getElementById('content');

  function insertParagraph() {
    for (var i = 0; i < 15; i++) {
      var p = document.createElement('p');
      p.innerHTML  = 'Integrate ideate fund responsive pivot engaging user centered design human-centered design parallax physical computing. Pivot unicorn long shadow actionable insight engaging food-truck waterfall is so 2000 and late long shadow paradigm thinker-maker-doer intuitive responsive SpaceTeam waterfall is so 2000 and late. Unicorn integrate cortado iterate engaging personas piverate Steve Jobs driven.'
      content.appendChild(p);
    }
  }

  function insertImage() {
    var img = document.createElement('img');
    img.src = 'https://source.unsplash.com/category/nature';
    img.classList.add('img-responsive');
    content.appendChild(img);
  }

  for (var i = 0; i <= 15; i++) {
    insertParagraph();
    if (i%2 == 0) {
      insertImage();
    }
  }

  var hf = new HowFar({
    onScroll: function (percentage) {

    },
    onFinish: function () {
      if (!this.finished) {
        alert('All Done!');
      }
    }
  });

  var addMore = document.getElementById('add-more');
  addMore.addEventListener('click', function () {
    insertParagraph();
    hf.update();
  });
})();
