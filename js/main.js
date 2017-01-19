;(function () {
	
	'use strict';

	// iPad and iPod detection	
	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("iPhone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

    
    
    $('a[href*="#"]:not([href="#"])').click(function() {
 if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
   var target = $(this.hash);
   target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
   if (target.length) {
     $('html, body').animate({
       scrollTop: target.offset().top
     }, 1000);
     return false;
   }
 }
});
    
    
	// Full height
	var fullHeight = function() {
		if ( !isiPhone() || !isiPad() ) {
			$('.js-full-height').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-full-height').css('height', $(window).height());
			});
		}
	};

	// Scroll Next
	var ScrollNext = function() {
		$('body').on('click', '.scroll-btn', function(e){
			e.preventDefault();

			$('html, body').animate({
				scrollTop: $( $(this).closest('[data-next="yes"]').next()).offset().top
			}, 1000, 'easeInOutExpo');
			return false;
		});
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	// Counter
	var counter = function() {
		$('.counter-style-1').waypoint( function( direction ) {
			var el = $(this.element).attr('class');
			if( direction === 'down' && !$(this.element).hasClass('animated')) {
				setTimeout( function(){
					// console.log($(this.element));
					$('.'+el).find('.js-counter').countTo({
						 formatter: function (value, options) {
				      	return value.toFixed(options.decimals);
				   	},
					});
				} , 200);
				
				$(this.element).addClass('animated');
					
			}
		} , { offset: '75%' } );


		$('.counter-style-2').waypoint( function( direction ) {
			var el = $(this.element).attr('class');
			if( direction === 'down' && !$(this.element).hasClass('animated')) {
				setTimeout( function(){
					$('.'+el).find('.js-counter').countTo({
						 formatter: function (value, options) {
				      	return value.toFixed(options.decimals);
				   	},
					});
				} , 200);
				
				$(this.element).addClass('animated');
					
			}
		} , { offset: '75%' } );
	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {
		$(document).click(function (e) {
	    var container = $("#offcanvass, .js-mobile-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	    	$('html').removeClass('mobile-menu-expanded');
	    	$('.js-mobile-toggle').removeClass('active');
	    }
		});
	};

	// Burger Menu
	var burgerMenu = function() {

		$('body').on('click', '.js-nav-toggle', function(event){
			if ( $('#navbar').is(':visible') ) {
				$(this).removeClass('active');	
			} else {
				$(this).addClass('active');	
			}
			event.preventDefault();
		});

	};

	// Off Canvass
	var offCanvass = function() {

		if ( $('#offcanvass').length == 0 ) {
			if ( $('.nav-style-1').length > 0 ) {
				$('body').prepend('<div id="offcanvass" />');

				$('.link-wrap').each(function(){
					$('#offcanvass').append($(this).find('[data-offcanvass="yes"]').clone());	
				})
				$('#offcanvass').find('.js-mobile-toggle').remove();
				$('#offcanvass, #page').addClass($('.nav-style-1').data('offcanvass-position'));
				$('#offcanvass').addClass('offcanvass-nav-style-1');
			}		
			
			if ( $('.nav-style-2').length > 0 ) {
				$('body').prepend('<div id="offcanvass" />');

				$('.link-wrap').each(function(){
					$('#offcanvass').append($(this).find('[data-offcanvass="yes"]').clone());	
				})
				$('#offcanvass').find('.js-mobile-toggle').remove();
				$('#offcanvass, #page').addClass($('.nav-style-2').data('offcanvass-position'));
				$('#offcanvass').addClass('offcanvass-nav-style-2');
			}			
		}

		$('body').on('click', '.js-mobile-toggle', function(e){
			var $this = $(this);
			$this.toggleClass('active');
			$('html').toggleClass('mobile-menu-expanded');

		});

		if ( $(window).width() < 769 ) {
			$('body, html').addClass('overflow');
		}

		$(window).resize(function(){
			if ( $(window).width() < 769 ) {
				$('body, html').addClass('overflow');
			}
			if ( $(window).width() > 767 ) {
				if ( $('html').hasClass('mobile-menu-expanded')) {
					$('.js-mobile-toggle').removeClass('active');
					$('html').removeClass('mobile-menu-expanded');
				}
			}
		});

	};


	// Magnific Popup
	
	var imagePopup = function() {
		$('.image-popup').magnificPopup({
			type: 'image',
			removalDelay: 10,
			titleSrc: 'title',
			gallery:{
				enabled:false
			}
		});
	};
	
	
	// Window Scroll
	var windowScroll = function() {
		var lastScrollTop = 0;

		$(window).scroll(function(event){

		   	var header = $('#header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 500 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top animated slideInDown slideOutUp');
					}, 100 );
				}
			} 
			
		});
	};


	// Document on load.
	$(function(){

		fullHeight();
		ScrollNext();
		parallax();
		counter();
		mobileMenuOutsideClick();
		burgerMenu();
		imagePopup();
		offCanvass();


	});


}());