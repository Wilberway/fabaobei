require.config({
	basePath:"/js",
	urlArgs: "v=4",
	waitSeconds: 60,
	paths: {
		'jquery': 'jquery-3.0.0',
		'jqueryMigrate': 'jquery-migrate-3.0.0',
		'bootstrap3':'bootstrap3.3.7.min',
		'ejs':'ejs',
		'common':"common",
		'unslider' : 'unslider.min',
		'echarts' : 'echarts.min',
		'china' : 'china',
		'index':"index",
		'paper':"paper",
		'doom' : 'doom',
		'multiSelect':"jquery.multiSelect",
		'highlighter':"jquery.highlighter",
		'lawyer':"lawyer",
		'lawyerList':"lawyerList",
		'lawyerDetails':"lawyerDetails",
		'caseDetails':"caseDetails",
		'pagination':"jquery.pagination",
		'tabCollpase': "tabcollapse",
		'vague': "foggy",
	},
	shim:{
		multiSelect:{
			deps:['jquery','courtData','caseData','levelData'],
			exports:'$.multiSelect'
		},
		highlighter:{
			deps:['jquery'],
			exports:'$.highlighter'
		},
		pagination:{
			deps:['jquery'],
			exports:'$.pagination'
		},
		tabCollapse:{
			deps:['jquery'],
			exports: '$.fn.tabCollapse'
		}
	}
})

;(function(){
	var page_js = document.getElementById('loadScript').getAttribute('data-script');
    require([page_js],function(page_js){
        page_js.init();
    })
})()
