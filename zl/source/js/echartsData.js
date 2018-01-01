var chartsData = {
	"option1" : {
		tooltip: {},
		legend: {
			data:['案由']
		},
		xAxis: {
			data: ["知识产权","侵权","婚姻","财产纠纷","合同","经济"],
			axisLabel:{
				textStyle: {
					fontSize: 15
				},
				interval: 0
			}
		},
		yAxis: {
			max: 100,
			axisLabel:{
				textStyle: {
					fontSize: 12
				}
			}
		},
		series: [{
			name: '胜诉率',
			type: 'bar',
			data: [50, 40, 36, 30, 45,65],
			label: {}
		}]
	},
	"option2":{
		series : [
			{
				name: '比例',
				type: 'pie',
				radius: '55%',
				label: {
					normal: {
						show:true,
						textStyle: {
							fontSize: 12
						},
						formatter: '{b}: {d}%'
					}
				},
				data:[
					{value:235, name:'知识产权'},
					{value:274, name:'侵权'},
					{value:310, name:'婚姻'},
					{value:335, name:'财产纠纷'},
					{value:400, name:'合同'},
					{value:168, name:'经济'}
				]
			}
		]
	}
}
