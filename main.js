$(function(){
	//loading
	var referrer = document.referrer;
	var host = location.host;
	if ( referrer.indexOf(host) == -1){
		$(window).load(function(){
			$('body').addClass('start');
		});
	}else{
		$('body').addClass('already');
	}
	//scroll
	$(window).on('scroll', function() {
		if ($(this).scrollTop() > 0) {
			$('body').addClass('down');
		} else {
			$('body').removeClass('down');
		}
	});

	// video
	$('.list--video').slick({
		autoplay: true,
		centerMode: true,
		arrows: true,
		prevArrow: '<a class="slick-prev" href="#"><svg><use xlink:href="#arrow"/></svg></a>',
		nextArrow: '<a class="slick-next" href="#"><svg><use xlink:href="#arrow"/></svg></a>',
		centerPadding: '16%',
		pauseOnFocus: true,
		responsive: [{
			breakpoint: 960,
			settings: {
				centerMode: true,
				arrows: true,
				dots: true,
				pauseOnFocus: true,
				centerPadding: '16%',
			}
		}]
	});

	// movie
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	function onPlayerReady(event){
		event.target.playVideo();
	}
	$(window).on('load', function(){
		$('.list--video li').each(function(index, element){
			var $ID = $(this).attr('youtubeId'),
				$movieID = 'ID_' + $ID,
				$this = $(this),
				player;
			$(this).on('click', function () {
				function onYouTubeIframeAPIReady(){
					player = new YT.Player($movieID, {
								playerVars: {
									rel: 0,
									playsinline: 1
								},
								videoId: $ID,
								events: {
									'onReady': onPlayerReady
								}
							});
				}
				function onYouTubeIframeAPIReadySP() {
					player = new YT.Player($movieID, {
								playerVars: {
									rel: 0
								},
								videoId: $ID
							});
				}
				if (window.matchMedia('screen and (min-width:900px)').matches) {
					onYouTubeIframeAPIReady();
				} else {
					onYouTubeIframeAPIReadySP();
				}
				$this.find('figure').fadeOut();
				$('.slick-prev, .slick-next').on("click", function () {
					player.pauseVideo();
				});
			});
		});
	});

	//bnr
	var sliderImg = $('.list--bnr li').length;
	if(sliderImg > 1){
		$('.list--bnr').slick({
			autoplay: true,
			centerMode: true,
			dots: false,
			prevArrow: '<a class="slick-prev" href="#"><svg><use xlink:href="#arrow"/></svg></a>',
			nextArrow: '<a class="slick-next" href="#"><svg><use xlink:href="#arrow"/></svg></a>',
			centerPadding: '32%',
			pauseOnFocus: true,
			responsive: [{
				breakpoint: 960,
				settings: {
					centerMode: true,
					centerPadding: '16%',
				}
			}]
		});
	}else {
		$('.section--bnr').addClass('section--bnr--single');
	}
});
