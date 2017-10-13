$(setup);



const baseBoxWidth = 50;
let duration = 3000;
// const $main = $('main');
let score = 0;
const interval = 1000;
let count = 4;
let $scoreDisp;
let $score;
let width;
let $main;
let $mylist;
let $play;
let $replay;
let $footer;
let $mycopy;
let $banner;
let $logo;
const speeds = [
  30000,
  60000,
  90000,
  120000,
  180000
];

let pressed = false;
let gameContainerWidth = null;
let $landingpad = null;
let $timer = null;
let countdownInterval = null;
// let $replay            = null;
let $gameover = null;
// let $lis                = null;

function setup() {
  $timer = $('.timer');
  $landingpad = $('.landing-pad');
  $scoreDisp = $('.scoreDisp');
  $main = $('main');
  $gameover = $('.gameover');
  $score = $('.score');
  $mylist = $('.mylist');
  gameContainerWidth = $('main').width();
  $mycopy = $mylist.clone(true);

  width = $main.width();
  $score.hide();
  $landingpad.hide();
  $mylist.hide();

  $gameover.hide();


  setSpeeds();
  $play = $('.play');
  $replay = $('.replay');
  $play.on('click', startGame);
  $replay.on('click', restart);
}

function startGame() {
  // HERE
  $banner = $('.banner');
  $footer = $('.footer');
  $mylist = $('.mylist');
  $landingpad = $('.landingpad');
  $score = $('.score');
  $logo = $('.logo');
  $banner.hide();
  $logo.hide();
  $footer.hide();
  $mylist.show();
  $landingpad.show();
  $score.show();
  $(document).keydown(handleKeyDown);
  $(document).keyup(handleKeyUp);
  countdownInterval = setInterval(timer, 1000);
}

// function restart(){
//   $(document).keydown(handleKeyDown);
//   $(document).keyup(handleKeyUp);
//   $scoreDisp.text('');
//   count = 4;
//   countdownInterval = setInterval(timer, 1000);
//   $mylist.replaceWith($mycopy);
// }

function timer() {
  count = count-1;
  if (count === 0){
    clearInterval(countdownInterval);
    $timer.text('');
    setInterval(createBox, interval);
    return;
  }
  $timer.text(count);
}

function createBox(){
  if($mylist.length > 0) {
    const $box = $('<div class="box"></div>');
    $box.css('left', chooseRandomPosition(gameContainerWidth));
    if (Math.random() > 0.96) {
      $box.addClass('life');
    } else if (Math.random() <= 0.96 && Math.random() >= 0.92) {
      $box.addClass('widthwide');
    } else {
      $box.addClass('martins');
    }
    $('.game-page').append($box);
    animateBox($box);
  } else{
    return;
  }
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

      // When a collision happens
      if (boxDimensions && $box.hasClass('martins')){
        checkForCollision($box, 1000);

      // ?
      } else if(boxDimensions && $box.hasClass('life')){
        checkForCollision($box, 2000);

        $($box).stop().fadeOut();
        // Adding a life
        if ($('li').length < 4) {
          $('.mylist').append('<li class="lives"><i class="fa fa-heart"></i></li>');
        }

      // ?
      } else if(boxDimensions && $box.hasClass('widthwide')) {
        checkForCollision($box, 2000);

        // Increase landing pad
        changeWidthWide($landingpad, 1.2);
        setTimeout(function (){
          changeWidthWide($landingpad,10/12 );
        }, 15000);

      } else if($box.hasClass('martins') && x1.top - a1 > x2.top && !boxDimensions){

        // Taking a life
        $('li:last-child').remove();
        if ($('li').length === 0) {
          $('.gameover').show();
          animateBox.stop();
          clearInterval(countdownInterval);
        }
        $box.remove();
      }
    },
    complete: function() {
      $box.remove();
    }
  });
}

function setSpeeds() {
  speeds.forEach(t => {
    setTimeout(function(){
      duration -= duration * 0.20;
    }, t);
  });
}

function handleKeyDown(e) {
  if(!pressed){
    switch (e.which) {
      case 37:
        animatePaddle('-', checkForLeftEdge);
        break;
      case 39:
        animatePaddle('+', checkForRightEdge);
        break;
    }
  }
  pressed = true;
}

function animatePaddle(operation, callback) {
  $landingpad.stop().animate(
    {
      left: `${operation}=` + gameContainerWidth
    }, {
      duration: 1500,
      step: function() {
        if (callback($landingpad)) {
          $(document).trigger('keyup');
        }
      }
    });
}

function checkForCollision($element, n){
  $element.stop().fadeOut();
  setTimeout(() => {
    $element.remove();
  }, 500);
  score += n;
  $scoreDisp.text(score);
}

function handleKeyUp() {
  $landingpad.stop();

  pressed = false;

  if (checkForLeftEdge($landingpad)) $landingpad.css('left', '0').stop();
  if (checkForRightEdge($landingpad)) $landingpad.css('left', `${width - $landingpad.width()}px`).stop();
}

function checkForLeftEdge($element) {
  return parseInt($element.css('left')) < 0;
}

function checkForRightEdge($element) {
  return parseInt($element.css('left')) > gameContainerWidth - $element.width();
}

function chooseRandomPosition($element) {
  return Math.floor(Math.random() * ($element - baseBoxWidth)) + 1;
}

function changeWidthWide($element, xChange) {
  // const width = $element.width();
  $element.animate({'width': $element.width() * xChange}, {
    duration: '200',
    easing: 'linear'
  });
}
