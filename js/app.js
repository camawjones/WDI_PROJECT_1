$(() => {
console.log('working');
  const $landingpad = $('.landing-pad');
  const $gamepage = $('.game-page');
  const $main = $('main');
  let $score = $('.score')
  $score = '0';

console.log('this is working');
  //TIMER BELOW
  let count=4;
  const $timer= $('.timer');

  var pressed = false;
  $(document).keydown(function(e) {
    if(!pressed){
      const width = $(this).width();
      switch (e.which) {
        case 37:
          $landingpad.stop().animate({
            left: '-=' + width
          }, 1500); //left arrow key
          break;
        case 39:
          $landingpad.stop().animate({
            left: '+=' + width
          }, 1500); //right arrow key
          break;
      }
    }
    pressed = true;
  }).keyup(function(){
    $landingpad.stop();
    pressed = false;
  });


  const counter=setInterval(timer, 1000);
  function timer() {
    count=count-1;
    if (count === 0){
      clearInterval(counter);
      $timer.text('');
      // createBox();
      setInterval(createBox, 1000);
      //counter ended, do something here
      return;
    }
    $timer.text(count);
  }

  function createBox() {
    // create dom div
    const $box = $('<div class="box"></div>');
    $box.css('left', Math.floor(Math.random() * $main.width()) + 1);
    Math.random() > 0.66 ? $box.addClass('martins') : $box.addClass('martians');

    $('.game-page').append($box);
    animateBox($box);
  }

  function animateBox($box) {
    $box.animate({'top': '653px'}, {
      duration: 3000,
      easing: 'linear',
      step: function() {

        var divPos = $(this).position();
        var padPos = $landingpad.position();
        if (divPos.bottom === padPos.top && divPos.left === padPos.left) {
          console.log('hit');
        }

      },
      complete: function() {
        $box.remove();
      }
    });
  }


  //MOVING DIV BELOW **********
  // var pressed = false;
  // $(document).keydown(function(e) {
  //   if(!pressed){
  //     const width = $(this).width();
  //     switch (e.which) {
  //       case 37:
  //         $landingpad.stop().animate({
  //           left: '-=' + width
  //         }, 1500); //left arrow key
  //         break;
  //       case 39:
  //         $landingpad.stop().animate({
  //           left: '+=' + width
  //         }, 1500); //right arrow key
  //         break;
  //     }
  //   }
  //   pressed = true;
  // }).keyup(function(){
  //   $landingpad.stop();
  //   pressed = false;
  // });

  // Snow Falling


  function fallingMartins() {
    var $Martins = $(),
      createMartins = function () {
        var qt = 1;
        for (var i = 0; i < qt; ++i) {
          var $Martin = $('<div class="Martins"></div>');
          $Martin.css({
            'left': (Math.random() * $('#site').width()) + 'px',
            'top': (- Math.random() * $('#site').height()) + 'px'
          });
          // add this snowflake to the set of snowflakes
          $Martins = $Martins.add($Martin);
        }
        $('main').prepend($Martins);
      },

      runMartinStorm = function() {
        $Martins.each(function() {

          var singleAnimation = function($Marty) {
            $Marty.animate({
              top: $('main').height()
            }, 3000, 'linear', function(){
            // this particular snow flake has finished, restart again
              $Marty.css({
                'top': (- Math.random() * $('main').height()) + 'px',
                'left': (Math.random() * $('main').width()) + 'px'


              });
              singleAnimation($Marty);
            });
          };
          singleAnimation($(this));
        });
      };

    createMartins();
    runMartinStorm();
  }

console.log($timer.length);

  // if($timer.valueOf() === '') {
  //   fallingMartins();
  // }
  //
  // setTimeout(function() {
  //   fallingMartins();
  // }, 4000);

  // function fallingMartians() {
  //   var $Martians = $(),
  //     createMartians = function () {
  //       var qt = 1;
  //       for (var i = 0; i < qt; ++i) {
  //         var $Martian = $('<div class="Martians"></div>');
  //         $Martian.css({
  //           'left': (Math.random() * $('main').width()) + 'px',
  //           'top': (- Math.random() * $('main').height()) + 'px'
  //         });
  //         // add this snowflake to the set of snowflakes
  //         $Martians = $Martians.add($Martian);
  //       }
  //       $('main').prepend($Martians);
  //     },
  //
  //     runMartianStorm = function() {
  //       $Martians.each(function() {
  //
  //         var singleAnimation = function($Marto) {
  //           $Marto.animate({
  //             top: $('main').height()
  //           }, 3000, 'linear', function(){
  //           // this particular snow flake has finished, restart again
  //             $Marto.css({
  //               'top': (- Math.random() * $('main').height()) + 'px',
  //               'left': (Math.random() * $('main').width()) + 'px'
  //
  //
  //             });
  //             singleAnimation($Marto);
  //           });
  //         };
  //         singleAnimation($(this));
  //       });
  //     };
  //
  //   createMartians();
  //   runMartianStorm();
  // }

  console.log($timer.length);

  // if($timer.valueOf() === '') {
  //   fallingMartins();
  // }

  // setTimeout(function() {
  //   fallingMartins();
  // }, 4000);
  //
  // setTimeout(function() {
  //   fallingMartians();
  // }, 6000);

  console.log($landingpad.css('left'));

  // $landingpad.css('left');
// if (valueOf($landingpad.style.left) === valueOf($Martins.style.left)
// {
//
// }


  // var rect1 = Crafty.e("2D, Canvas, Color").attr(dim1).color("red");
  //
  // var rect2 = Crafty.e("2D, Canvas, Color, Keyboard, Fourway").fourway(2).attr(dim2).color("blue");
  //
  // rect2.bind("EnterFrame", function () {
  //     if (rect1.x < rect2.x + rect2.w &&
  //         rect1.x + rect1.w > rect2.x &&
  //         rect1.y < rect2.y + rect2.h &&
  //         rect1.h + rect1.y > rect2.y) {
  //         // collision detected!
  //         this.color("green");
  //     } else {
  //         // no collision
  //         this.color("blue");
  //     }
  // });


  //Do code for showing the number of seconds here





  // $landingpad.on('keydown', function(e) {
  //   switch (e.which) {
  //     case 37:
  //       $landingpad.stop().animate({
  //         left: '-= 10'
  //       }); //left arrow key
  //       break;
  //     case 38:
  //       $landingpad.stop().animate({
  //         top: '-= 10'
  //       }); //up arrow key
  //       break;
  //     case 39:
  //       $landingpad.stop().animate({
  //         left: '+= 10'
  //       }); //right arrow key
  //       break;
  //     case 40:
  //       $landingpad.stop().animate({
  //         top: '+= 10'
  //       }); //bottom arrow key
  //       break;
  //   }
  // });
  //
  // $landingpad.keydown(function(event) {
  //   switch (event.keycode) {
  //     case 37: // left arrow key
  //       $landingpad.animate({ 'left': '-=100' });
  //       break;
  //     case 39: // right arrow key
  //       $landingpad.animate({ 'left': '+=100' });
  //       break;
  //   }
  // // });
  // $landingpad.focus();
  // $landingpad.keydown(function(){
  //
  //   $landingpad.css('background-color', 'yellow');
});
