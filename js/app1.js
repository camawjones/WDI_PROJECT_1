$(() => {

  // ONE BLOCK
  //
  // Pick a place to create the block from
  // Create it and chose type
  // Make it fall
  // Use the step function to check if a collision happens with panel
  // Or check if it hits the bottom
  // When the collision happens, destroy.



const $landingpad = $('.landing-pad');
const $gamepage = $('.game-page');
const $main = $('main');

//TIMER BELOW
let count = 4;
let $timer = $('.timer');

const counter = setInterval(timer, 1000);
function timer() {
  count=count-1;
  if (count === 0){
    clearInterval(counter);
    $timer.text('');
    //counter ended, do something here
    return;
  }
  $timer.text(count);
}



function fallingObj() {

    var $placeFallers = function () {
      let divPickerNum = Math.floor(Math.random() * 2);
      if (divPickerNum === 1) {
        $('main').append('<div class="Martians fallers"></div>');
      } else {
        $('main').append('<div class="Martins fallers"></div>');
      }
      const $fallers = $('main').append('<div class="Martians fallers"></div>') || $('main').append('<div class="Martins fallers"></div>');

      $fallers.css({
        'left': (Math.random() * $('main').width()) + 'px',
        'top': '-50px'
      });
      // $Martins = $Martins.add($Martin);
      $('main').prepend($fallers);
    };

    runFallers = function() {
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



    $placeFallers();

  }

});
