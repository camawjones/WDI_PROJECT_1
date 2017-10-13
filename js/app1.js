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
let startAnimation;
let $footer;
let $instructions;
let $starwars;

const speeds = [
  20000,
  40000,
  60000,
  80000,
  100000
];
let timeOutOne;
let timeOutTwo;
let timeOutThree;
let timeOutFour;
let timeOutFive;

let pressed = false;
let gameContainerWidth = null;
let $landingpad = null;
let $timer = null;
let countdownInterval = null;
let $gameover = null;


function setup() {
  $timer = $('.timer');
  $starwars = $('.starwars');
  $landingpad = $('.landing-pad');
  $scoreDisp = $('.scoreDisp');
  $main = $('main');
  $gameover = $('.gameover');
  $score = $('.score');
  $mylist = $('.mylist');
  gameContainerWidth = $('main').width();
  $instructions = $('.insructions');
  $footer = $('.footer');



  width = $main.width();
  $score.hide();
  $landingpad.hide();
  $mylist.hide();
  $starwars.hide();
  // $starwars.hide();

  $gameover.hide();


  // setSpeeds();
  $play = $('.play');
  $replay = $('.replay');
  $play.on('click', startGame);
  $replay.on('click', restart);
  $instructions.on('click', showInstructions);
}

function startGame() {
  // HERE
  $footer = $('footer');

  $footer.hide();
  setTimeout(() => {
    $footer.remove();
  }, 500);
  $mylist.show();
  $landingpad.show();
  $score.show();
  $('.banner').hide();
  $('.logo').hide();
  $(document).keydown(handleKeyDown);
  $(document).keyup(handleKeyUp);
  countdownInterval = setInterval(timer, 1000);
  // setSpeeds();
}

function restart(){
  // $(document).keydown(handleKeyDown);
  // $(document).keyup(handleKeyUp);
  $gameover.hide();
  $scoreDisp.text('');
  count = 4;
  score = 0;
  duration = 3000;
  for (var i = 0; i < 3; i++) {
    $('.mylist').append('<li class="lives"></li>');
  }
  $('.box').remove();
  countdownInterval = setInterval(timer, 1000);
}

function showInstructions(){

  $footer.hide();
  setTimeout(() => {
    $('footer').remove();
  }, 500);
  $('.banner').hide();
  $('.logo').hide();
  $play.hide();
  $starwars.show();

}

function timer(){
  count = count-1;
  if (count === 0){
    console.log('fired');
    clearInterval(countdownInterval);
    $timer.text('');
    setSpeeds();
    startAnimation = setInterval(createBox, interval);
    // createBox();
    return;
  }
  $timer.text(count);
  console.log(count);
}

function createBox(){
  if($('li').length > 0) {
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
          $('.mylist').append('<li class="lives"></li>');
        }

        // ?
      } else if(boxDimensions && $box.hasClass('widthwide')) {
        checkForCollision($box, 2000);

        // Increase landing pad
        changeWidthWide($landingpad, 1.3);
        setTimeout(function (){
          changeWidthWide($landingpad,1 );
        }, 15000);

      }
      else if($box.hasClass('martins') && x1.top - a1 > x2.top && !boxDimensions){

        // Taking a life
      }
    },
    complete: function() {
      if($box.hasClass('martins')){
        $('li:last-child').remove();

        if ($('li').length === 0) {
          $('.finalscore').text($scoreDisp.text());
          $gameover.show();

          clearTimeout(timeOutOne);
          clearTimeout(timeOutTwo);
          clearTimeout(timeOutThree);
          clearTimeout(timeOutFour);
          clearTimeout(timeOutFive);
          clearInterval(startAnimation);

          $('.box').stop().remove();
        }
      }
      $box.remove();
    }
  });
}

function setSpeeds() {
  timeOutOne = setTimeout(functionSame, speeds[0]);
  timeOutTwo = setTimeout(functionSame, speeds[1]);
  timeOutThree = setTimeout(functionSame, speeds[2]);
  timeOutFour = setTimeout(functionSame, speeds[3]);
  timeOutFive = setTimeout(functionSame, speeds[4]);

  function functionSame() {
    duration -= duration * 0.25;
  }
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
  if (checkForRightEdge($landingpad)) $landingpad.css('left', `${width -   $landingpad.width()}px`).stop();
}

function checkForLeftEdge($element) {
  return parseInt($element.css('left')) < 0;
}

function checkForRightEdge($element) {
  return parseInt($element.css('left')) > gameContainerWidth - $element.width();
}

function chooseRandomPosition($element) {
  return Math.floor(Math.random() * ($element - 150)) + 1;
}

function changeWidthWide($element, xChange) {
  // const width = $element.width();
  $element.animate({'width': (150 * xChange) + 'px'}, {
    duration: '200',
    easing: 'linear'
  });
}
