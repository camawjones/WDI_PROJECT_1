$(() => {
console.log('working');

  const $landingpad = $('.landing-pad');
  const $gamepage 

console.log('this is working');
  //TIMER BELOW
  let count=4;
  const $timer= $('.timer');

  const counter=setInterval(timer, 1000);
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

  function fallingMartins() {
      var $Martins = $(),
          createSnowflakes = function () {
              var qt = 20;
              for (var i = 0; i < qt; ++i) {
                  var $Martin = $('.Martin');
                  $Martin.css({
                      'left': (Math.random() * $('#site').width()) + 'px',
                      'top': (- Math.random() * $('#site').height()) + 'px'
                  });
                  // add this snowflake to the set of snowflakes
                  $Martins = $Martins.add($Martin);
              }
              $().prepend($snowflakes);
          }

  if( $timer.is(':empty') ) {
     fallingMartins();
  }
  //MOVING DIV BELOW **********
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

  function fallingMartins() {
      var $snowflakes = $(),
          createSnowflakes = function () {
              var qt = 20;
              for (var i = 0; i < qt; ++i) {
                  var $snowflake = $('<div class="snowflakes"></div>');
                  $snowflake.css({
                      'left': (Math.random() * $('#site').width()) + 'px',
                      'top': (- Math.random() * $('#site').height()) + 'px'
                  });
                  // add this snowflake to the set of snowflakes
                  $snowflakes = $snowflakes.add($snowflake);
              }
              $('#snowZone').prepend($snowflakes);
          },




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
