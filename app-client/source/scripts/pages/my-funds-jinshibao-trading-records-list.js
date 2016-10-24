$(function () {
	var $coveringLayer = $('#cl-funds-jinshibao-trading-records-filters');
	var $headerButtonNavBack           = $('.page-header #header-nav-back');
	var $headerButtonHideCoveringLayer = $('.page-header #hide-covering-layer');
	var $headerButtonShowCoveringLayer = $('.page-header #show-covering-layer');

	$headerButtonShowCoveringLayer.on('click', function () {
		showOrHideCoveryingLayer($coveringLayer, true,
			$headerButtonNavBack.add($headerButtonShowCoveringLayer),
			$headerButtonHideCoveringLayer
		);
	});

	$headerButtonHideCoveringLayer.on('click', function () {
		showOrHideCoveryingLayer($coveringLayer, false, 
			$headerButtonNavBack.add($headerButtonShowCoveringLayer),
			$headerButtonHideCoveringLayer
		);
	});

	function showOrHideCoveryingLayer($cl, isToShow, $buttonToShowWithoutCl, $buttonToShowWithCl) {
		if (!!isToShow) {
			$cl.show();
			$buttonToShowWithCl.show();
			$buttonToShowWithoutCl.hide();
		} else {
			$cl.hide();
			$buttonToShowWithCl.hide();
			$buttonToShowWithoutCl.show();
		}
	}
});
