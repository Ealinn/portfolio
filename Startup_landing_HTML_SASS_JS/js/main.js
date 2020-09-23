$(function () {
	// Sliders
	$('.team').slick({
		prevArrow: '<button type="button" class="slick-prev slick-btn"><img src="images/arrow-prev.svg" alt=""></button>',
		nextArrow: '<button type="button" class="slick-next slick-btn"><img src="images/arrow-next.svg" alt=""></button>',
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		initialSlide: 0,
		autoplay: true,
		autoplaySpeed: 2500,
		responsive: [{
				breakpoint: 1199,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					initialSlide: 0,
				}
			},
			{
				breakpoint: 860,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					initialSlide: 0,
				}
			},
			{
				breakpoint: 575,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 0,
				}
			},
		]
	});

	$('.clients__content').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 3500,
	});

	// Fixed header
	let $header = $("#header");
	let $intro = $("#intro");
	let introHeight = $intro.innerHeight() - 1;
	let scrollPosition = $(window).scrollTop();

	$(window).on("scroll load resize", function () {
		introHeight = $intro.innerHeight() - 1;
		scrollPosition = $(this).scrollTop();

		if (scrollPosition > introHeight) {
			$header.addClass("fixed");
		} else {
			$header.removeClass("fixed");
		}
	});

	// Menu toggle
	let $menu = $("#menu");
	$("#menu-toggle").on("click", function (e) {
		e.preventDefault();

		$menu.toggleClass("show-menu");
	})

	// Smoth scroll
	$("[data-scroll]").on("click", function (e) {
		e.preventDefault();

		let elementId = $(this).data('scroll');
		let elementOffset = $(elementId).offset().top;

		$menu.removeClass("show-menu");

		$("html, body").animate({
			scrollTop: elementOffset
		}, 1000);
	});

	// Works filter
	let $filter = $("[data-filter]");

	$filter.on("click", function (e) {
		e.preventDefault();

		let category = $(this).data('filter');

		if (category == 'all') {
			$("[data-cat]").show();
		} else {
			$("[data-cat]").each(function () {
				let workCat = $(this).data('cat');

				if (workCat != category) {
					$(this).hide();
				} else {
					$(this).show();
				}
			});
		}
	});


	// uniMail script from https://github.com/agragregra/uniMail
	//E-mail Ajax Send
	$("#contact-form").submit(function () {
		let th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: th.serialize()
		}).done(function () {
			alert("Thank you!");
			setTimeout(function () {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});