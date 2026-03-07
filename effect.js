$(window).load(function () {
  $(".loading").fadeOut("fast");
  $(".container").fadeIn("fast");
});

$("document").ready(function () {
  var vw;
  var STEP_DELAY_SHORT = 2000;
  var STEP_DELAY_MEDIUM = 2500;
  var STEP_DELAY_LONG = 3000;
  var FLOAT_ANIMATION_DURATION = 3000;
  var BALLOON_BORDER_DURATION = 3000;
  var BALLOON_TEXT_FADE_DURATION = 2000;
  var MESSAGE_FADE_DURATION = 450;
  var MESSAGE_OUT_DELAY = 300;
  var MESSAGE_IN_DELAY = 450;

  $(window).resize(function () {
    vw = $(window).width() / 2;
    $("#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8").stop();
    $("#b11").animate({ top: 240, left: vw - 350 }, 500);
    $("#b22").animate({ top: 240, left: vw - 250 }, 500);
    $("#b33").animate({ top: 240, left: vw - 150 }, 500);
    $("#b44").animate({ top: 240, left: vw - 50 }, 500);
    $("#b55").animate({ top: 240, left: vw + 50 }, 500);
    $("#b66").animate({ top: 240, left: vw + 150 }, 500);
    $("#b77").animate({ top: 240, left: vw + 250 }, 500);
    $("#b88").animate({ top: 240, left: vw + 350 }, 500);
  });

  $("#turn_on").click(function () {
    $("#bulb_yellow").addClass("bulb-glow-yellow");
    $("#bulb_red").addClass("bulb-glow-red");
    $("#bulb_blue").addClass("bulb-glow-blue");
    $("#bulb_green").addClass("bulb-glow-green");
    $("#bulb_pink").addClass("bulb-glow-pink");
    $("#bulb_orange").addClass("bulb-glow-orange");
    $("body").addClass("peach");
    $(this)
      .fadeOut("slow")
      .delay(STEP_DELAY_SHORT)
      .promise()
      .done(function () {
        $("#play").fadeIn("slow");
      });
  });

  $("#play").click(function () {
    var audio = $(".song")[0];
    audio.play();
    $("#bulb_yellow").addClass("bulb-glow-yellow-after");
    $("#bulb_red").addClass("bulb-glow-red-after");
    $("#bulb_blue").addClass("bulb-glow-blue-after");
    $("#bulb_green").addClass("bulb-glow-green-after");
    $("#bulb_pink").addClass("bulb-glow-pink-after");
    $("#bulb_orange").addClass("bulb-glow-orange-after");
    $("body").css("background-color", "#FFF");
    $("body").addClass("peach-after");
    $(this)
      .fadeOut("slow")
      .delay(STEP_DELAY_MEDIUM)
      .promise()
      .done(function () {
        $("#bannar_coming").fadeIn("slow");
      });
  });

  $("#bannar_coming").click(function () {
    $(".bannar").addClass("bannar-come");
    $(this)
      .fadeOut("slow")
      .delay(STEP_DELAY_LONG)
      .promise()
      .done(function () {
        $("#balloons_flying").fadeIn("slow");
      });
  });

  function loopOne() {
    var randleft = 1000 * Math.random();
    var randtop = 500 * Math.random();
    $("#b1").animate(
      { left: randleft, bottom: randtop },
      FLOAT_ANIMATION_DURATION,
      function () {
        loopOne();
      }
    );
  }

  function loopTwo() {
    var randleft = 1000 * Math.random();
    var randtop = 500 * Math.random();
    $("#b2").animate(
      { left: randleft, bottom: randtop },
      FLOAT_ANIMATION_DURATION,
      function () {
        loopTwo();
      }
    );
  }

  function loopThree() {
    var randleft = 1000 * Math.random();
    var randtop = 500 * Math.random();
    $("#b3").animate(
      { left: randleft, bottom: randtop },
      FLOAT_ANIMATION_DURATION,
      function () {
        loopThree();
      }
    );
  }

  function loopFour() {
    var randleft = 1000 * Math.random();
    var randtop = 500 * Math.random();
    $("#b4").animate(
      { left: randleft, bottom: randtop },
      FLOAT_ANIMATION_DURATION,
      function () {
        loopFour();
      }
    );
  }

  function loopFive() {
    var randleft = 1000 * Math.random();
    var randtop = 500 * Math.random();
    $("#b5").animate(
      { left: randleft, bottom: randtop },
      FLOAT_ANIMATION_DURATION,
      function () {
        loopFive();
      }
    );
  }

  function loopSix() {
    var randleft = 1000 * Math.random();
    var randtop = 500 * Math.random();
    $("#b6").animate(
      { left: randleft, bottom: randtop },
      FLOAT_ANIMATION_DURATION,
      function () {
        loopSix();
      }
    );
  }

  function loopSeven() {
    var randleft = 1000 * Math.random();
    var randtop = 500 * Math.random();
    $("#b7").animate(
      { left: randleft, bottom: randtop },
      FLOAT_ANIMATION_DURATION,
      function () {
        loopSeven();
      }
    );
  }

  function loopEight() {
    var randleft = 1000 * Math.random();
    var randtop = 500 * Math.random();
    $("#b8").animate(
      { left: randleft, bottom: randtop },
      FLOAT_ANIMATION_DURATION,
      function () {
        loopEight();
      }
    );
  }

  $("#balloons_flying").click(function () {
    $(".balloon-border").animate({ top: -500 }, BALLOON_BORDER_DURATION);
    $("#b1,#b4,#b5,#b7").addClass("balloons-rotate-behaviour-one");
    $("#b2,#b3,#b6,#b8").addClass("balloons-rotate-behaviour-two");
    // $('#b3').addClass('balloons-rotate-behaviour-two');
    // $('#b4').addClass('balloons-rotate-behaviour-one');
    // $('#b5').addClass('balloons-rotate-behaviour-one');
    // $('#b6').addClass('balloons-rotate-behaviour-two');
    // $('#b7').addClass('balloons-rotate-behaviour-one');
    loopOne();
    loopTwo();
    loopThree();
    loopFour();
    loopFive();
    loopSix();
    loopSeven();
    loopEight();

    $(this)
      .fadeOut("slow")
      .delay(STEP_DELAY_MEDIUM)
      .promise()
      .done(function () {
        $("#cake_fadein").fadeIn("slow");
      });
  });

  $("#cake_fadein").click(function () {
    $(".cake").fadeIn("slow");
    $(this)
      .fadeOut("slow")
      .delay(STEP_DELAY_SHORT)
      .promise()
      .done(function () {
        $("#light_candle").fadeIn("slow");
      });
  });

  $("#light_candle").click(function () {
    $(".fuego").fadeIn("slow");
    $(this)
      .fadeOut("slow")
      .promise()
      .done(function () {
        $("#wish_message").fadeIn("slow");
      });
  });

  $("#wish_message").click(function () {
    vw = $(window).width() / 2;

    $("#b1,#b2,#b3,#b4,#b5,#b6,#b7,#b8").stop();
    $("#b1").attr("id", "b11");
    $("#b2").attr("id", "b22");
    $("#b3").attr("id", "b33");
    $("#b4").attr("id", "b44");
    $("#b5").attr("id", "b55");
    $("#b6").attr("id", "b66");
    $("#b7").attr("id", "b77");
    $("#b8").attr("id", "b88");
    $("#b11").animate({ top: 240, left: vw - 350 }, 500);
    $("#b22").animate({ top: 240, left: vw - 250 }, 500);
    $("#b33").animate({ top: 240, left: vw - 150 }, 500);
    $("#b44").animate({ top: 240, left: vw - 50 }, 500);
    $("#b55").animate({ top: 240, left: vw + 50 }, 500);
    $("#b66").animate({ top: 240, left: vw + 150 }, 500);
    $("#b77").animate({ top: 240, left: vw + 250 }, 500);
    $("#b88").animate({ top: 240, left: vw + 350 }, 500);
    $(".balloons").css("opacity", "0.9");
    $(".balloons h2").fadeIn(BALLOON_TEXT_FADE_DURATION);
    $(this)
      .fadeOut("slow")
      .delay(STEP_DELAY_SHORT)
      .promise()
      .done(function () {
        $("#story").fadeIn("slow");
      });
  });

  $("#story").click(function () {
    $(this).fadeOut("slow");
    $(".cake")
      .fadeOut("fast")
      .promise()
      .done(function () {
        $(".message").fadeIn("slow");
      });

    var i;

    function msgLoop(i) {
      $("p:nth-child(" + i + ")")
        .fadeOut(MESSAGE_FADE_DURATION)
        .delay(MESSAGE_OUT_DELAY)
        .promise()
        .done(function () {
          i = i + 1;
          $("p:nth-child(" + i + ")")
            .fadeIn(MESSAGE_FADE_DURATION)
            .delay(MESSAGE_IN_DELAY);
          if (i == 50) {
            $("p:nth-child(49)")
              .fadeOut(MESSAGE_FADE_DURATION)
              .promise()
              .done(function () {
                $(".cake").fadeIn("fast");
              });
          } else {
            msgLoop(i);
          }
        });
      // body...
    }

    msgLoop(0);
  });
});

//alert('hello');
