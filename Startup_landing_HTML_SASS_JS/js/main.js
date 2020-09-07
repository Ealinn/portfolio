$(function () {

	$('.team').slick({
		prevArrow: '<button type="button" class="slick-prev slick-btn"><img src="images/arrow-prev.svg" alt=""></button>',
		nextArrow: '<button type="button" class="slick-next slick-btn"><img src="images/arrow-next.svg" alt=""></button>',
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		initialSlide: 0,
		variableWidth: true,
		autoplay: true,
		autoplaySpeed: 2500,
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

	// Smoth scroll
	$("[data-scroll]").on("click", function (e) {
		e.preventDefault();

		let elementId = $(this).data('scroll');
		let elementOffset = $(elementId).offset().top;

		$("html, body").animate({
			scrollTop: elementOffset
		}, 1000);
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