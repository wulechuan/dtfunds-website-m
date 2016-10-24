$(function () {
	var childrenHaveBeenPinned = false;

	var $pinnableParent = $('.filters-block.children-pinnable');

	$(document).on('scroll', function () {
		var y = window.scrollY;
		if (!childrenHaveBeenPinned) {
			if (y >= 10) {
				childrenHaveBeenPinned = true;
				$pinnableParent.addClass('children-pinned');
			}
		} else {
			if (y < 9) {
				childrenHaveBeenPinned = false;
				$pinnableParent.removeClass('children-pinned');
			}
		}
	});
});
