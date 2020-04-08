'use strict';

$(".visiblebtn").on("click", function() {
	$(this).hide();
	$(this).next(".invisiblebtn").show();
});

$(".location").on("click", function(){
	$("iframe").show();
	$(".imagevisible").hide();
});

$(".list1").on("click", function(){
	$(this).addClass("active");
	$(".list2").removeClass("active");
	$(".list3").removeClass("active");
	$("iframe").hide();
	$(".imagevisible").show();
});

$(".list2").on("click", function(){
	$(this).addClass("active");
	$(".list1").removeClass("active");
	$(".list3").removeClass("active");
});

$(".list3").on("click", function(){
	$(this).addClass("active");
	$(".list1").removeClass("active");
	$(".list2").removeClass("active");
	$("iframe").hide();
	$(".imagevisible").show();
});



$(function() {
    //settings for slider
    var width = 810;
    var animationSpeed = 1000;
    var pause = 3000;
    var currentSlide = 1;

    //cache DOM elements
    var $slider = $('#slider');
    var $slideContainer = $('.slides', $slider);
    var $slides = $('.slide', $slider);

    var interval;

    function startSlider() {
        interval = setInterval(function() {
            $slideContainer.animate({'margin-left': '-='+width}, animationSpeed, function() {
                if (++currentSlide === $slides.length) {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', 0);
                }
            });
        }, pause);
    }
    function pauseSlider() {
        clearInterval(interval);
    }

    $slideContainer
        .on('mouseenter', pauseSlider)
        .on('mouseleave', startSlider);

    startSlider();

});