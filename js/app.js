// let speedUpBox;

$(() => {
  console.log('working');
  let $landingpad = $('.landing-pad');
  const $gamepage = $('.game-page');
  const $main = $('main');
  let score = 0;
  const $scoreDisp = $('.scoreDisp');
  let landingPosition = null;
  const width = $('main').width();
  const interval = 1000;


  console.log('this is working');
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
                landingPosition = parseInt($landingpad.css('left'));
                if (parseInt($landingpad.css('left')) < 0 ) {
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
                landingPosition = parseInt($landingpad.css('left'));
                if (parseInt($landingpad.css('left')) > width - $landingpad.width()) {
                  $(document).trigger('keyup');
                }
              }
            }); //right arrow key
          break;
      }
    }
    pressed = true;
  }).keyup(function(){
    $landingpad.stop();
    pressed = false;

    if (parseInt($landingpad.css('left')) < 0) {
      $landingpad.css('left', '0').stop();
    }

    if (parseInt($landingpad.css('left')) > width - $landingpad.width()) {
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

      //counter ended, do something here
      return;
    }
    $timer.text(count);
  }
  function speedUp(t) {
    setTimeout(function(){
      setInterval(createBox,(interval-200));
    }, t);
  }
  speedUp(10000);
  speedUp(15000);
  speedUp(20000);
  speedUp(25000);



  // // function speedUp() {
  //   const scoreNum = parseInt($scoreDisp.text());
  //   if (scoreNum >= 2000){
  //     setInterval(createBox, 200);
  //   }
  // }
  // speedUp(score);
  // }
  //
  // setTimeout(function speedUpBox(n){
  //   setInterval(createBox, n);
  // }, 4000);
  //
  //
  //
  // if(score >= 5000) {
  //   speedUpBox(700);
  // } else if (score >= 10000) {
  //   speedUpBox(400);
  // } else {
  //   speedUpBox(300);
  // }






  function createBox() {
    // create dom div
    const $box = $('<div class="box"></div>');
    $box.css('left', Math.floor(Math.random() * ($main.width() - 50)) + 1);
    Math.random() > 0.66 ? $box.addClass('martians') : $box.addClass('martins');

    $('.game-page').append($box);
    animateBox($box);
  }

  function animateBox($box) {
    $box.animate({'top': '653px'}, {
      duration: 3000,
      easing: 'linear',
      step: function collision() {
        const x1 = $box.position();
        const x2 = $landingpad.position();
        const a1 = $box.height();
        const a2 = $landingpad.height();
        const b1 = $box.width();
        const b2 = $landingpad.width();
        x1.bottom = x1.top + a1;
        $lis = $('li');
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
          $('.mylist li:last-child').remove();
        }

      },
      // var positionbox = $box.position();
      // var positionpad = $landingpad.position();
      // var xbox = $main.width() - positionbox.left;
      // var d = dist($landingpad.x,$landingpad.y,$box.x,$box.y)


      complete: function() {
        $box.remove();
      }
    });
  }






});
