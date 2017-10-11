const baseBoxWidth = 50;
let duration = 3000;

$(() => {
  const $landingpad = $('.landing-pad');
  const $main = $('main');
  let score = 0;
  const $scoreDisp = $('.scoreDisp');
  const width = $('main').width();
  const interval = 1000;

  //TIMER BELOW
  let count=4;
  const $timer= $('.timer');
  var pressed = false;

  $(document).keydown(function(e) {
    if(!pressed){
      switch (e.which) {
        case 37:
          $landingpad.animate(
            {
              left: '-=' + width
            }, {
              duration: 1500,
              step: function() {
                if (checkForLeftEdge($landingpad)) {
                  $(document).trigger('keyup');
                }
              }
            });
          break;
        case 39:
          $landingpad.stop().animate(
            {
              left: '+=' + width
            }, {
              duration: 1500,
              step: function() {
                if (checkForRightEdge($landingpad, $main)) {
                  $(document).trigger('keyup');
                }
              }
            });
          break;
      }
    }
    pressed = true;
  }).keyup(function(){
    $landingpad.stop();
    pressed = false;

    if (checkForLeftEdge($landingpad)) {
      $landingpad.css('left', '0').stop();
    }

    if (checkForRightEdge($landingpad, $main)) {
      $landingpad.css('left', `${width - $landingpad.width()}px`).stop();
    }
  });

  const counter=setInterval(timer, 1000);
  function timer() {
    count=count-1;
    if (count === 0){
      clearInterval(counter);
      $timer.text('');
      // createBox();
      setInterval(createBox, interval);

      return;
    }
    $timer.text(count);
  }

  function speedUp(t) {
    setTimeout(function(){
      changeWidth($landingpad, 0.85);
      duration -= duration * 0.2;

    }, t);
  }

  speedUp(10000);
  speedUp(40000);
  speedUp(60000);
  speedUp(90000);

  function createBox() {
    // create dom div
    const $box = $('<div class="box"></div>');
    $box.css('left', chooseRandomPosition($main));
    Math.random() > 0.96 ? $box.addClass('martians') : $box.addClass('martins');

    $('.game-page').append($box);
    animateBox($box);
  }

  function animateBox($box) {
    $box.animate({'top': '653px'}, {
      duration: duration,
      easing: 'linear',
      step: function collision() {
        const x1 = $box.position();
        const x2 = $landingpad.position();
        const a1 = $box.height();
        const b1 = $box.width();
        const a2 = $landingpad.height();
        const b2 = $landingpad.width();
        x1.bottom = x1.top + a1;
        x2.bottom = x2.top + a2;
        const boxDimensions = x2.top<(x1.top + a1) && x2.top && x1.left>(x2.left-b1) &&x1.left<(x2.left+b2);

        if(boxDimensions && $box.hasClass('martins')){

          $($box).stop().fadeOut();
          setTimeout(() => {
            $($box).remove();
          }, 500);
          score += 1000;
          $scoreDisp.text(score);

        } else if(boxDimensions && $box.hasClass('martians')){

          $($box).stop().fadeOut();
          setTimeout(() => {
            $($box).remove();
          }, 500);
          score += 1000;
          $scoreDisp.text(score);
          $('.mylist').append('<li class="lives"><i class="fa fa-heart" aria-hidden="true"></i></li>');

        } else if($box.hasClass('martins') && x1.top - a1 > x2.top && !boxDimensions){
          $('li:last-child').remove();
          $box.remove();
        }
      },
      complete: function() {
        $box.remove();
      }
    });
  }
});

function checkForLeftEdge($element) {
  return parseInt($element.css('left')) < 0;
}

function checkForRightEdge($element, main) {
  return parseInt($element.css('left')) > main.width() - $element.width();
}

function chooseRandomPosition($element) {
  return Math.floor(Math.random() * ($element.width() - baseBoxWidth)) + 1;
}

function changeWidth($element, xChange) {
  const width = $element.width();
  $element.animate({'width': width * xChange}, {
    duration: '500',
    easing: 'linear'
  });
}


// function () {
//   if (parseInt($landingpad.css('left')) < 0 ) {
//     $(document).trigger('keyup');
//   }
// }
