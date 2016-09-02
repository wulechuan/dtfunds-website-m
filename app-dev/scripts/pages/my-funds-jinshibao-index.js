$(function () {
	function _generateFakeData(count, pName1, pName2, vRange1, vRange2, isAccumulate, accumBaseValue) {
		var startMonth = 4;
		var startDay = 23;

		var startDate = new Date();
		startDate = startDate.setFullYear(2016, startMonth, startDay);

		var data = [];
		var oneDay = 24 * 3600 * 1000;
		for (var i = 0; i < count; i++) {
			var date = new Date(startDate + i * oneDay);
			var _Y = date.getFullYear();
			var _M = date.getMonth();
			var _D = date.getDate();
			_M = (_M < 10 ? '0' : '') + _M;
			_D = (_D < 10 ? '0' : '') + _D;

			var record = {};
			record[pName1] = _Y + '-' + _M + '-' + _D;

			var value = Math.random() * (vRange2 - vRange1) + vRange1;

			if (isAccumulate) {
				record[pName2] = accumBaseValue;
				accumBaseValue += value;
			} else {
				record[pName2] = value;

			}

			data[i] = record;
		}

		return data;
	}


	var wlc = window.webLogicControls;
	var app = window.taijs.app;


	var eChartFundJinShiBaoRootElement = $('.chart-block')[0];
	var eChartFundJinShiBao = createEChartsForFundJinShiBao(eChartFundJinShiBaoRootElement);
	updateChart();



	function updateChart() {
		var data = _generateFakeData(13, 'tradingDay', 'unitNV', 0.125, 2.345);
		updateEChartsForFundJinShiBao(eChartFundJinShiBao, data);
	}

	function chartToolTipFormatterForFundJinShiBao(parameters) {
		var _o = parameters[0];
		return [
			'<article class="',
				'echart-tooltip ',
				'has-border-triangle ',
				'border-triangle-at-bottom ',
				'border-triangle-size-small ',
				'">',
				'<ul class="f-list">',
					'<li>',
						// '<span class="label">'+label+' </span>',
						'<span class="value">'+_o.value+'</span>',
					'</li>',
				'</ul>',
			'</article>'
		].join('');
	}



	function createEChartsForFundJinShiBao(rootElement) {
		if (!window.echarts || !rootElement) return false;
		var echart = window.echarts.init(rootElement);
		// C.l(rootElement);

		var chartColors = {
			corssHair: '#ff6600',
			axesLabels: '#cccccc',
			axesLines: '#f1f1f1',
			graph: '#e39f3d'
		};

		var axesLabelsFont = {
			size: 8,
			family: 'consolas'
		};

		var eChartOptions = {
			tooltip: {
				trigger: 'axis',
				alwaysShowContent: false,
				// axisPointer: {
				//     type: 'shadow'
				// 	type: 'cross',
				// 	crossStyle: {
				// 		color: chartColors.corssHair,
				// 		type: 'solid',
				// 		opacity: 0.4
				// 	}
				// },
				formatter: chartToolTipFormatterForFundJinShiBao,
				backgroundColor: 'transparent',
				padding: 0
			},
			grid: {
				left: 16,
				right: 16,
				top: 10,
				bottom: 10,
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					data: [], // required
					axisLabel: {
						textStyle: {
							fontSize: axesLabelsFont.size,
							fontFamily: axesLabelsFont.family,
							color: chartColors.axesLabels
						}
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: chartColors.axesLines
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: chartColors.axesLines
						}
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					axisLabel: {
						textStyle: {
							fontSize: axesLabelsFont.size,
							fontFamily: axesLabelsFont.family,
							color: chartColors.axesLabels
						}
					},
					axisLine: {
						show: true,
						lineStyle: {
							color: chartColors.axesLines
						}
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: chartColors.axesLines
						}
					}
				}
			],
			series: [
				{
					type:'line',
					// label: {
					// 	normal: {
					// 		show: false,
					// 	}
					// },
					showAllSymbol: true,
					// symbolSize: 8,
					hoverAnimation: true,
					itemStyle: {
						normal: {
							borderColor: chartColors.graph,
							// opacity: 0
						},
						// emphasis: {
						// 	borderColor: chartColors.graph,
						// 	opacity: 1
						// }
					},
					lineStyle: {
						normal: {
							width: 1,
							color: chartColors.graph
						}
					},
					areaStyle: {
						normal: {
							color: chartColors.graph,
							opacity: 0.4
						}
					}
				}
			]
		};


		echart.setOption(eChartOptions);

		return echart;
	}
	function updateEChartsForFundJinShiBao(echart, data) {
		if (!echart || !data) return;

		var xAxisLabels = [];
		var yData = [];

		for (var i = 0; i < data.length; i++) {
			xAxisLabels[i] = data[i].tradingDay.slice(5);
			yData[i] = data[i].unitNV.toFixed(2);
		}

		var eChartOptions = {
			xAxis: [{
				data: xAxisLabels
			}],
			series: [{
				data: yData
			}]
		};

		echart.setOption(eChartOptions);
	}
});
