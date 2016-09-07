$(function () {
	var app = window.taijs.app;
	var URIP = app.data.URIParameters;
	// C.l(URIP);

	// var wlc = window.webLogicControls;
	// var UI = wlc.UI;

	var URIProductName = URIP.productName;
	if (typeof URIProductName === 'string') {
		URIProductName = URIProductName.replace(/^\s*['"]\s*/, '').replace(/\s*['"]\s*$/, '');
	}

	var progressStopsBlocksId = [
		'#assest-progress-system-action-ok',
		'#assest-progress-zhuan-ru-shen-qing-cheng-gong',
		'#assest-progress-zhuan-ru-kou-kuan-cheng-gong',
		'#assest-progress-zhuan-ru-cheng-gong',
		'#assest-progress-zhuan-ru-kou-kuan-shi-bai',
		'#assest-progress-zhuan-ru-shi-bai',
		'#assest-progress-zhuan-chu-shen-qing-cheng-gong',
		'#assest-progress-zhuan-chu-cheng-gong',
		'#assest-progress-zhuan-chu-shi-bai'
	];

	var blockIdToShow = progressStopsBlocksId[Math.floor(Math.random() * progressStopsBlocksId.length)];

	$(progressStopsBlocksId.join()).each(function () {
		// index is NOT reliable, in case some dom is missing, or the id incorrect
		if ('#'+this.id === blockIdToShow) {
			var $abstractBlock = $('.fund-record-detail-asset-abstract');

			$abstractBlock.find('.left .value.product-name' ).text(URIProductName);
			$abstractBlock.find('.left .value.product-id'   ).text(URIP.productId);
			$abstractBlock.find('.right .value.trading-type').text(URIP.action);

			$(this).show();
			$('#'+this.id+'-attachment').show();
		} else {
			$(this).hide();
			$('#'+this.id+'-attachment').hide();
		}
	});
});