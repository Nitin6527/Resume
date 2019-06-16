/*End of all functions*/
	//Preloader
	$(window).on("load", function() {
		preloaderFadeOutTime = 1000;
		function hidePreloader() {
		var preloader = $('#preloader');
		preloader.fadeOut(preloaderFadeOutTime);}
		hidePreloader();
	});


//===script for navbar.....
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//===smooth scrolling.....
$(document).ready(function() {
	$("#container").click(function(){
	 $("#mySidenav").show();
 });
 $("#main,#About,#skillset,#Projects,#contactpage,.parallax6,.parallax2,.parallax1,.parallax3,.parallax4,.parallax5").click(function(){
	closeNav();
 });
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1000, function() {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});


// When the user scrolls down 20px from the top of the document, show the button..

window.onscroll = function() {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}




//====script for fire-flies....
var WIDTH;
var HEIGHT;
var canvas;
var con;
var g;
var pxs = new Array();
var rint = 50;

$(document).ready(function() {
  WIDTH = window.innerWidth;
  HEIGHT = window.innerHeight;
  $('#container').width(WIDTH).height(HEIGHT);
  canvas = document.getElementById('pixie');
  $(canvas).attr('width', WIDTH).attr('height', HEIGHT);
  con = canvas.getContext('2d');
  for (var i = 0; i < 50; i++) {
    pxs[i] = new Circle();
    pxs[i].reset();
  }
  setInterval(draw, rint);
  setInterval(draw, rint2);

});

function draw() {
  con.clearRect(0, 0, WIDTH, HEIGHT);
  for (var i = 0; i < pxs.length; i++) {
    pxs[i].fade();
    pxs[i].move();
    pxs[i].draw();
  }
}

function Circle() {
  this.s = {
    ttl: 8000,
    xmax: 20,
    ymax: 2,
    rmax: 15,
    rt: 1,
    xdef: 960,
    ydef: 540,
    xdrift: 4,
    ydrift: 4,
    random: true,
    blink: true
  };

  this.reset = function() {
    this.x = (this.s.random ? WIDTH * Math.random() : this.s.xdef);
    this.y = (this.s.random ? HEIGHT * Math.random() : this.s.ydef);
    this.r = ((this.s.rmax - 1) * Math.random()) + 1;
    this.dx = (Math.random() * this.s.xmax) * (Math.random() < .5 ? -1 : 1);
    this.dy = (Math.random() * this.s.ymax) * (Math.random() < .5 ? -1 : 1);
    this.hl = (this.s.ttl / rint) * (this.r / this.s.rmax);
    this.rt = Math.random() * this.hl;
    this.s.rt = Math.random() + 1;
    this.stop = Math.random() * .2 + .4;
    this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
    this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
  }

  this.fade = function() {
    this.rt += this.s.rt;
  }

  this.draw = function() {
    if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt * -1;
    else if (this.rt >= this.hl) this.reset();
    var newo = 1 - (this.rt / this.hl);
    con.beginPath();
    con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    con.closePath();
    var cr = this.r * newo;
    g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, (cr <= 0 ? 1 : cr));
    g.addColorStop(0.0, 'rgba(238,180,28,' + newo + ')');
    g.addColorStop(this.stop, 'rgba(238,180,28,' + (newo * .2) + ')');
    g.addColorStop(1.0, 'rgba(238,180,28,0)');
    con.fillStyle = g;
    con.fill();
  }

  this.move = function() {
    this.x += (this.rt / this.hl) * this.dx;
    this.y += (this.rt / this.hl) * this.dy;
    if (this.x > WIDTH || this.x < 0) this.dx *= -1;
    if (this.y > HEIGHT || this.y < 0) this.dy *= -1;
  }

  this.getX = function() {
    return this.x;
  }
  this.getY = function() {
    return this.y;
  }
}
//==closing of menubar by click on screen..

// ==script for skill bar.......
$(document).ready(function() {
  $('.anchortags').click(function() {
    $('.bar-inner').css({
      'width': '0'
    });
    $(".bar").each(function() {
      $(this).find(".bar-inner").animate({
        width: $(this).attr("data-width")
      }, 2500)
		});
		  });
});

$(document).ready(function(){
	$('#skillset').hover(function(){
		$('.bar').each(function(){
			$(this).find(".bar-inner").animate({
				width:$(this).attr("data-width")
			},2500)
		});
	});
});
