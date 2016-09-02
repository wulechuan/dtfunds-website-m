$(function () {
	function _generateFakeData(count, pName1, pName2, vRange1, vRange2, isAccumulate, accumBaseValue) {
		var log = [];
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

			log.push('{"'+pName1+'": \''+record[pName1]+'\', "'+pName2+'": '+record[pName2]+'}');
		}

		C.l('\n\tvar data = [\n\t\t'+log.join(',\n\t\t')+'\n\t];');

		return data;
	}

	var fakeData = [
		{"tradingDay": '2016-04-23', "unitNV": 1.757656191032652},
		{"tradingDay": '2016-04-24', "unitNV": 0.32188258844711387},
		{"tradingDay": '2016-04-25', "unitNV": 1.477269783194919},
		{"tradingDay": '2016-04-26', "unitNV": 1.352215352594811},
		{"tradingDay": '2016-04-27', "unitNV": 0.46044362644157594},
		{"tradingDay": '2016-04-28', "unitNV": 0.21665504823486875},
		{"tradingDay": '2016-04-29', "unitNV": 0.5009260444276414},
		{"tradingDay": '2016-04-30', "unitNV": 0.3819950842234388},
		{"tradingDay": '2016-04-31', "unitNV": 2.057381592893056},
		{"tradingDay": '2016-05-01', "unitNV": 0.6297335270469685},
		{"tradingDay": '2016-05-02', "unitNV": 0.4218203007743765},
		{"tradingDay": '2016-05-03', "unitNV": 0.8226800736663474},
		{"tradingDay": '2016-05-04', "unitNV": 0.23477554998267502},
		{"tradingDay": '2016-05-05', "unitNV": 0.5508117353981283},
		{"tradingDay": '2016-05-06', "unitNV": 1.2703662137419702},
		{"tradingDay": '2016-05-07', "unitNV": 1.1758996045488492},
		{"tradingDay": '2016-05-08', "unitNV": 1.4614893058012315},
		{"tradingDay": '2016-05-09', "unitNV": 0.9610474893542132},
		{"tradingDay": '2016-05-10', "unitNV": 2.240826094982556},
		{"tradingDay": '2016-05-11', "unitNV": 0.6351183094800186},
		{"tradingDay": '2016-05-12', "unitNV": 1.931339160505741},
		{"tradingDay": '2016-05-13', "unitNV": 1.980541419954},
		{"tradingDay": '2016-05-14', "unitNV": 2.288900090535959},
		{"tradingDay": '2016-05-15', "unitNV": 1.4399192229929902},
		{"tradingDay": '2016-05-16', "unitNV": 1.654266572529899},
		{"tradingDay": '2016-05-17', "unitNV": 0.9642106514733545},
		{"tradingDay": '2016-05-18', "unitNV": 1.481249978367394},
		{"tradingDay": '2016-05-19', "unitNV": 1.6538653594357704},
		{"tradingDay": '2016-05-20', "unitNV": 2.030142947982664},
		{"tradingDay": '2016-05-21', "unitNV": 0.15021503033797334}
	];


	var wlc = window.webLogicControls;
	var app = window.taijs.app;


	var eChartFundJinShiBaoRootElement = $('.chart-block')[0];
	var eChartFundJinShiBao = createEChartsForFundJinShiBao(eChartFundJinShiBaoRootElement);


	var eChartTestingStatus = {
		finalOptions: undefined,
		isTesting: false,
		results: []
	};


	updateChart(eChartFundJinShiBao);

	function updateChart(theChart) {
		// var fakeData = _generateFakeData(30, 'tradingDay', 'unitNV', 0.125, 2.345);
		updateEChartsForFundJinShiBao(theChart, fakeData);
		measureChartGrid(theChart);
	}

	function measureChartGrid(theChart) {
		var testingConfiguration = evaluateTestingConfiguration(theChart);
		var efo = testingConfiguration.eChartFinalOptions;
		var eChartRootElement = theChart.getDom();
		C.l(testingConfiguration);

		prepareForTesting(theChart);

		eChartTestingStatus.finalOptions = efo;
		eChartTestingStatus.isTesting = true;

			testOnce(
				0,
				theChart,
				eChartRootElement,
				testingConfiguration.dataIndexA,
				testingConfiguration.dataValueA
			);
		setTimeout(function () {
			testOnce(
				1,
				theChart,
				eChartRootElement,
				testingConfiguration.dataIndexB,
				testingConfiguration.dataValueB
			);

			setTimeout(function () {
			onAllTestsEnd();
			}, 1000);
		}, 2000);


		function evaluateTestingConfiguration(theChart) {
			var efo = theChart.getOption();

			var data = efo.series[0].data;
			
			var dataIndexA = 0;
			var dataValueA = parseFloat(data[0]);
			var dataIndexB = 0;
			var dataIndexMaxDiff = 0;
			var maxDifferenceSoFar = 0;
			for (var i = 1; i < data.length; i++) {
				var diff = Math.abs(parseFloat(data[i]) - dataValueA);
				if (diff >= 0.1) {
					dataIndexB = i;
					break;
				}
				if (diff > maxDifferenceSoFar) {
					dataIndexMaxDiff = i;
					maxDifferenceSoFar = diff;
				}
			}
			if (dataIndexB === 0) dataIndexB = dataIndexMaxDiff;

			var dataValueB = parseFloat(data[dataIndexB]);
			// C.l(dataIndexA, dataIndexB, dataValueA, dataValueB);

			return {
				eChartFinalOptions: efo,
				dataIndexA: dataIndexA,
				dataIndexB: dataIndexB,
				dataValueA: dataValueA,
				dataValueB: dataValueB
			};
		}

		function prepareForTesting(theChart) {
			theChart.setOption({
				tooltip: {
					trigger: 'item',
					position: 'top',
					formatter: function (p) {
						return chartToolTipFormatterForFundJinShiBao(p, true);
					}
				}
			});
		}

		function testOnce(testIndex, theChart, eChartRootElement, dataIndex, dataValue) {
			theChart.dispatchAction({
				type: 'showTip',
				seriesIndex: 0,
				dataIndex: dataIndex
			});

			var $toolTipRoot = $(eChartRootElement).find('.echart-tooltip').parent();

			C.l('test', testIndex, '\t\tdata[', dataIndex, ']:', dataValue, $toolTipRoot);
		}

		function onAllTestsEnd() {
			theChart.setOption({
				tooltip: {
					trigger: efo.tooltip.trigger,
					position: chartToolTipPositionEvaluator,
					formatter: chartToolTipFormatterForFundJinShiBao
				}
			});
		}
	}






	function createEChartsForFundJinShiBao(rootElement) {
		if (!window.echarts || !rootElement) return false;
		var echart = window.echarts.init(rootElement);
		// C.l(rootElement);

		var chartColors = {
			corssHair: '#ff6600',
			axesLabels: '#cccccc',
			axesLines: '#f1f1f1',
			graph: '#cca25d'
		};

		var axesLabelsFont = {
			size: 8,
			family: 'consolas'
		};

		var eChartOptions = {
			tooltip: {
				alwaysShowContent: true,
				backgroundColor: 'transparent',
				padding: 0,
				// axisPointer: {
				//     type: 'shadow'
				// 	type: 'cross',
				// 	crossStyle: {
				// 		color: chartColors.corssHair,
				// 		type: 'solid',
				// 		opacity: 0.4
				// 	}
				// }
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
	function chartToolTipFormatterForFundJinShiBao(parameters, isTesting) {
		var _o = parameters;
		if (Array.isArray(_o)) _o = _o[0];

		return [
			'<article class="',
				'echart-tooltip ',
				'has-border-triangle ',
				'border-triangle-at-bottom ',
				'border-triangle-size-small ',
				!!isTesting ? 'testing ' : '',
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
	function chartToolTipPositionEvaluator(touchPoint, params, dom, rect) {
		var _O = eChartTestingStatus.finalOptions;
		var dataIndex = params[0].dataIndex;
		var dataValue = parseFloat(params[0].value);
		var canvasWidth = eChartFundJinShiBao.getWidth();
		var canvasHeight = eChartFundJinShiBao.getHeight();
		var visibleSamplesCount = _O.xAxis[0].data.length;
		var axisXLabelHeight = 20;
		var axisYLabelWidth = 25;
		var axisYValueMax = 2.5;
		var axisYValueMin = 0;


		var tooltipYOffset = -3;


		var _grid = _O.grid[0];
		var graphMarginL = _grid.left + axisYLabelWidth;
		var graphMarginR = _grid.right;
		var graphMarginT = _grid.top;
		var graphMarginB = _grid.bottom + axisXLabelHeight;

		var graphWidth  = canvasWidth  - graphMarginL - graphMarginR;
		var graphHeight = canvasHeight - graphMarginT - graphMarginB;

		var xGapsCount = visibleSamplesCount - 1;

		var x = graphWidth / xGapsCount * dataIndex + graphMarginL;
		var y = graphHeight * (axisYValueMax - dataValue) / (axisYValueMax - axisYValueMin) + graphMarginT + tooltipYOffset;

		C.l(graphWidth, graphHeight, xGapsCount, dataIndex, dataValue, y);
		return [x, y];
	}
});
