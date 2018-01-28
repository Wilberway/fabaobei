var chartsData = {
    "option1":{
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series : [
            {
                name: '案由',
                type: 'pie',
                radius: ['55%', '75%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '12',
                            fontWeight: 'bold',
							textBorderColor: '#000000',
							textBorderWidth: 2
                        }
                    }
                },
                data:[
                ]
            }
        ]
    },
	"option2" : {
		tooltip: {},
        color: ['#003366', '#4cabce'],
		legend: {
			data:['胜诉','胜诉+部分胜诉']
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
			name: '胜诉',
			type: 'bar',
            barGap: 0,
			data: [],
			label: {}
		},{
            name: '胜诉+部分胜诉',
            type: 'bar',
            data: [],
            label: {}
        }]
	}
};