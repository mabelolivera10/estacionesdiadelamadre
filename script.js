var width = $(document).width();
var height = $(document).height();

$(window).resize(function(){
    width = $(document).width();
    height = $(document).height();
    console.log("windowWidth: " + width + ", windowHeight: " + height)
});

var layer1 = width - (width/2/50) - $('.layer1mountain').width()/2 - width/2;
var layer2 = width - (width/2/40) - $('.layer2mountain').width()/2 - width/2;
var layer3 = width - (width/2/30) - $('.layer3mountain').width()/2 - width/2;
var layer4 = width - (width/2/20) - $('.layer4mountain').width()/2 - width/2;
var layer5 = width - (width/2/15) - $('.layer4mountain').width()/2 - width/2;
var sun = (width - (width/2) - width/2)/30;

function resetLayers() {
    $('.layer1mountain').css({"left": layer1});
    $('.layer2mountain').css({"left": layer2});
    $('.layer3mountain').css({"left": layer3});
    $('.layer4mountain').css({"left": layer4});
    $('.sunSVG').css({"left": layer5, 'transform': 'rotateY(' + sun + 'deg)', '-webkit-transform': 'rotateY(' + sun + 'deg)'});
    $('.sunRaySVG1').css({"left": layer5});
    $('.sunRaySVG2').css({"left": layer5});
}

resetLayers();

var lastMouseX;

$(document).bind('mousemove',function(e){
    console.log("e.pageX: " + e.pageX + ", e.pageY: " + e.pageY);
    lastMouseX = e.pageX;
    layer1 = width - (e.pageX/50) - $('.layer1mountain').width()/2 - width/2;
    layer2 = width - (e.pageX/40) - $('.layer2mountain').width()/2 - width/2;
    layer3 = width - (e.pageX/30) - $('.layer3mountain').width()/2 - width/2;
    layer4 = width - (e.pageX/20) - $('.layer4mountain').width()/2 - width/2;
    layer5 = width - (e.pageX/15) - $('.sunSVG').width()/2 - width/2;
    sun = -(width - e.pageX - width/2)/30;
    console.log(sun);
    resetLayers();
});

// SNOW

var canvas = document.getElementById('snow'),
    ctx = canvas.getContext('2d'),
    width = ctx.canvas.width = document.body.offsetWidth,
    height = ctx.canvas.height = document.body.offsetHeight,
    animFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame,
    snowflakes = [];

window.onresize = function() {
  width = ctx.canvas.width = document.body.offsetWidth,
    height = ctx.canvas.height = document.body.offsetHeight;
}

function update() {
  for (var i = 0; i < snowflakes.length; i++) {
    snowflakes[i].update();
  }
}

function Snow() {
  this.x = random(0, width);
  this.y = random(-height, 0);
  this.radius = random(0.5, 3.0);
  this.speed = random(1, 3);
  this.wind = random(-0.5, 3.0);
}

Snow.prototype.draw = function() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = '#fff';
  ctx.fill();
  ctx.closePath();
}

Snow.prototype.update = function() {
  this.y += this.speed;
  this.x += this.wind;

  if (this.y > ctx.canvas.height) {
    this.y = 0;
    this.x = random(0, width);
  }
}

function createSnow(count) {
  for (var i = 0; i < count; i++) {
    snowflakes[i] = new Snow();
  }
}

function draw() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (var i = 0; i < snowflakes.length; i++) {
    snowflakes[i].draw();
  }
}

function loop() {
  draw();
  update();
  animFrame(loop);
}

function random(min, max) {
  var rand = (min + Math.random() * (max - min)).toFixed(1);
  rand = Math.round(rand);
  return rand;
}

createSnow(300);
loop();

// SEASONS

var season = 0;

function nextSeason() {
  season++;
  if (season == 1) {
    $("body,html").animate({backgroundColor: "#c1f1d5"}, 500);
    $(".snow").animate({"opacity": 0}, 1000);
    $(".mountains").animate({"opacity": .9}, 1000)
    $(".sunSVG").animate({"height": (height * .3), "opacity": 1}, 1000)
    $(".sunRay").animate({"opacity": 0}, 300);
    $(".seasonName").animate({"opacity": 0}, 1000);
    $(".message").animate({"opacity": 0}, 1000);
    $(".happyMothersDay").animate({"opacity": 0}, 1000);
    setTimeout(function() {
      $(".seasonName").css({"color": "black"});
      $(".seasonName").text("En primavera");
      $(".seasonName").animate({"opacity": .3}, 1000);
    }, 1000)
  }
  if (season == 2) {
    $("body,html").animate({backgroundColor: "#99ebff"}, 500);
    $(".mountains").animate({"opacity": 1}, 1000)
    $(".sunSVG").animate({"height": (height * .4)},{duration: 500,
      step: function( current, animProperties ) {
        layer5 = width - (lastMouseX/15) - $('.sunSVG').width()/2 - width/2;
        sun = -(width - lastMouseX - width/2)/30;
        console.log(sun);
        resetLayers();
      }
    });

    $(".sunRay").animate({"opacity": 1}), 500;
    $(".seasonName").animate({"opacity": 0}, 1000);
    setTimeout(function() {
      $(".seasonName").text("En Verano");
      $(".seasonName").animate({"opacity": .3}, 1000);
    }, 1000)
  }
  if (season == 3) {
    $("body,html").animate({backgroundColor: "#f0ae75"}, 500);
    $(".mountains").animate({"opacity": .7}, 1000)
    $(".sunSVG").animate({"height": (height * .3)},{duration: 500,
      step: function( current, animProperties ) {
        layer5 = width - (lastMouseX/15) - $('.sunSVG').width()/2 - width/2;
        sun = -(width - lastMouseX - width/2)/30;
        console.log(sun);
        resetLayers();
      }
    });
    $(".sunRay").animate({"opacity": 0}, 300);
    $(".seasonName").animate({"opacity": 0}, 1000);
    setTimeout(function() {
      $(".seasonName").text("En Otoño");
      $(".seasonName").animate({"opacity": .3}, 1000);
    }, 1000)
  }
  if (season == 4) {
    $("body,html").animate({backgroundColor: "#121a21"}, 500);
    $(".snow").animate({"opacity": .9}, 1000);
    $(".mountains").animate({"opacity": .3}, 1000)
    $(".sunSVG").animate({"opacity": 0}, 500)
    $(".seasonName").animate({"opacity": 0}, 1000);
    setTimeout(function() {
      $(".seasonName").css({"color": "white"});
      $(".seasonName").text("En invierno");
      $(".seasonName").animate({"opacity": .3}, 1000);
    }, 1000)
  }
  if(season == 5) {
    $("body,html").animate({backgroundColor: "#c1f1d5"}, 500);
    $(".snow").animate({"opacity": 0}, 1000);
    $(".mountains").animate({"opacity": .2}, 1000)
    $(".sunSVG").animate({"height": (height * .3), "opacity": 1}, 1000)
    $(".seasonName").animate({"opacity": 0}, 1000);
    setTimeout(function() {
      $(".seasonName").text("Spring");
      $(".seasonName").css({"opacity": 0});
    }, 1000)
    setTimeout(function() {
      $(".message").animate({"opacity": .5}, 1000);
      setTimeout(function() {
        $(".happyMothersDay").animate({"opacity": .9}, 1000);
        $(".seasonName").css({"opacity": 0});
      }, 3000)
    }, 2000)
  }
}

nextSeason();

$("body").keypress(function( event ) {
  if(event.key == 'r' || event.key == 'R') {
    console.log('reset');
    season = 0;
    nextSeason();
  }
});

$("body").click(function() {
  nextSeason();
});