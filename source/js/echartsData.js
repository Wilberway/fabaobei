var chartsData = {
    "option1":{
        series : [
            {
                name: '案由',
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
                ]
            }
        ]
    },
	"option2" : {
		tooltip: {},
		legend: {
			data:['案由']
		},
		xAxis: {
			data: [],
			axisLabel:{
				textStyle: {
					fontSize: 10
				},
				interval: 0
			}
		},
		yAxis: {
			max: 1,
			axisLabel:{
				textStyle: {
					fontSize: 10
				}
			}
		},
		series: [{
			name: '案由',
			type: 'bar',
			data: [],
			label: {}
		}]
	}
};