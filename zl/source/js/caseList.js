define(["jquery","ejs","multiSelect","highlighter","jqueryMigrate", "bootstrap3"],function(jquery){
	//document.domain = "falvgu.com";
	var App = function(){
		this.selector = {
			firstTime: true,
			lastResult: 0,
			lastHeight: 52,
			mainNav: $('.main-nav'),
			caseTip: '这里将进行模糊匹配，比如您输入“卡车事故”，会搜索到包含“挂货车”，“牵引车”等要素的案件',
			keyTip: '输入关键词，多个用空格隔开',
			defaultSelect: '不限',
			caseBlankSelect: '----------------',
			courtBlankSelect: '------------------------'
		};
		this.ajaxData = {
			text: "查询文本",
			filter: {
				casetype: [], //案件类型
				courtId: "", //法院
				year: "",
				level: "", //一审/二审/再审/其它   //审理程序
				courtLevel: "", //层级///高院/中院/基层法院",
				"doctype": "" //判决,裁定,其它
			},
			"keyword": "", //逗号(, ，)
			"orderBy": "", //缺省按照匹配度排序; ts: 按时间倒排
			"pageNum": 0, //页数: 从0开始
		}
	};
	App.prototype = {

		constructor : App,
		reason_2: '',
		init: function(){
			$("#filter-form").hide();
			$.multiSelect({
				container: $('.court-select'),
				data: courtData,
				dataUrl: 'courtData.js',
				defaultSelect: this.selector.defaultSelect,
				menuNumber: 3,
				blankShow: this.selector.courtBlankSelect
			});

			//民事案件多级联动
			$.multiSelect({
				container: $('.case-select'),
				data: caseData,
				dataUrl: 'caseData.js',
				defaultSelect: this.selector.defaultSelect,
				menuNumber: 4,
				blankShow: this.selector.caseBlankSelect,
			});
			this.element = {
				$smartSearch: $("#smart-search"),
				$textarea: $('#case-explain'),
				$focus: $('.focus'),
				$menuCase: $('#menu-case'),
				$menuArea: $('#menu-area'),
				$menuAreaM: $('#menu-area-m'),

				$areaRadio: $('#area-radio'),
				$levelRadio: $('#level-radio'),
				$typeEnlarge: $(".case-pop .select-menu li"),
				$caseSure: $(".case-pop-sure"),
				$regionSure: $(".region-pop-sure"),
				$mainNav: $("#caseNav"),
				$clearBtn: $('.tag-clear-btn'),
				$scrollTop: $("#scroll-top"),//返回顶部
				$filterBtn: $("#filter-btn"),
				$resultMask: $('.result-mask'),

			};
			this.api = {

			};
			// if (history.state != null) {
			// 	this.selector.lastResult = history.state.lastResult;
			// 	this.selector.lastHeight = history.state.lastHeight;
			// 	this.selector.firstTime = history.state.lastFirstTime;
			// 	this.ajaxData.pageNum = history.state.ajaxPageNum;
			// 	this.ajaxData.text = history.state.ajaxText;
			// 	this.ajaxData.keyword = history.state.ajaxKeyWord;
			// 	this.ajaxData.orderBy = history.state.ajaxOrderBy;
			// 	$("#content-tag").html(history.state.contentTag);
			// 	$("#content-tag").show();
            //
			// 	$("#keyword").val(history.state.keyword);
			// 	this.element.$textarea.html(history.state.text);
			// 	this.element.$textarea.addClass("textColor");
			// 	$("#result-container").html(history.state.results);
			// 	this.showResults();
            //
			// 	window.scrollTo(0,history.state.topHeight);
			// 	$("a.result-main").on("click", this.replaceBrowserHistory.bind(this));
            //
			// }


			this.mosaic = {
				caseTXT : [
					'<% for (var i = 0; i < data.length; i++) { %>',
					'	<% if (data[i].dev_name){ %>',
                    '    <div class="result-box" id="result-item-<%=data[i].trs_id%>">',
                    '        <a class="result-main" href="./caseDetail.html?id=<%-data[i].wenshu_id%>&reason=<%=encodeURI(data[i].trs_id)%>" >',
                    '            <div class="result-title">',
                    '                <div class="colelem result-title-detail">',
                    '                   <p><%-data[i].dev_name%></p>',
                    '                </div>',
                    '                <div class="colelem result-info">',
                    '                    <p><%-data[i].classify_no%><span class="f-ml20"><%=data[i].apply_person%></span><span class="f-ml20"><%=data[i].apply_date%></span></p>',
                    '                </div>',
                    '                <div class="colelem result-hr">',
                    '                </div>',
                	'				<div class="colelem result-tit">',
                	'                    <p>「  专利描述 」</p>',
                	'                </div>',
                	'                <div class="colelem result-context">',
                	'                <p><%-data[i].abstract%></p>',
                	'                </div>',
                    '                <div class="colelem result-tit">',
                    '                    <p>「  专利号  」</p>',
                    '                </div>',
                    '                <div class="colelem result-context">',
                    '                <p><%-data[i].patent_no%></p>',
                    '                </div>',
                    '                <div class="colelem result-tit">',
                    '                    <p>「 公开时间  」</p>',
                    '                </div>',
                    '                <div class="colelem result-context">',
                    '                <p><%-data[i].public_date%></p>',
                    '                </div>',
                    '                <div class="colelem result-tit">',
                    '                    <p>「 公开编号  」</p>',
                    '                </div>',
                    '                <div class="colelem result-context">',
                    '                <p><%-data[i].public_no%></p>',
                    '                </div>',
                    '            </div>',
                    '        </a>',
                    '    </div>',
                    '	<% } %>',
                    '<% } %>',
				].join(""),
			};


			this.bindEvent();
			this.scrolLoad();



		},
		replaceBrowserHistory: function() {
			var state = {
             text: this.element.$textarea.val(),
						 keyword: $("#keyword").val(),
						 results: $("#result-container").html(),
						 topHeight: $(window).scrollTop(),
						 lastResult: this.selector.lastResult,
						 lastHeight: this.selector.lastHeight,
						 lastFirstTime: this.selector.firstTime,
						 ajaxPageNum: this.ajaxData.pageNum,
						 ajaxText: this.ajaxData.text,
						 ajaxKeyWord: this.ajaxData.keyword,
						 ajaxOrderBy: this.ajaxData.orderBy,
						 contentTag: $("#content-tag").html(),
         };

				 if (history.state == null) {
					 window.history.pushState(state, "test", "#");
				 } else {
         window.history.replaceState(state, "title", "#");
			 }
		},
		bindEvent: function(){
			this.element.$smartSearch.on("click",this.smartClick.bind(this));
            // this.element.$focus.on('blur',this.showTxt.bind(this));
            this.element.$menuCase.on("click",this.typelinkage.bind(this));
            this.element.$menuArea.on("click",this.regionLinkage.bind(this));
            this.element.$areaRadio.on("click",this.areaSwitch.bind(this));
            this.element.$areaRadio.on("click",this.areaSwitch.bind(this));
            this.element.$levelRadio.on("click",this.levelSwitch.bind(this));
            this.element.$caseSure.on("click",this.caseSearch.bind(this));
            this.element.$regionSure.on("click",this.regionSearch.bind(this));
            this.element.$mainNav.on("click",'.menu-select',this.navSelect.bind(this));
            this.element.$clearBtn.on("click",this.clearCont.bind(this));
            this.element.$scrollTop.on("click",this.scrollTop.bind(this));
			this.element.$filterBtn.on("click", this.mobileFilterClicked.bind(this));
			this.element.$resultMask.on("click", this.dismissSearch.bind(this));
			var he = $(window).height() - 183;
		    $('.g-body').css({
		    	"min-height" : he+"px",
		    });

		},
		showTxt:function(){
			// if($el.val() == '' && $el.attr("id") == "keyword"){
			// 	$el.val(this.selector.keyTip);
			// }else if($el.val() == ''){
			// 	$el.val(this.selector.caseTip);
			// };
			if(this.element.$textarea.val().length == 0){
				$("#keyword").val("");
			};
			//$el.removeClass('textColor')
		},
		typelinkage: function(){
			var $this = $(this);
			var $select = $('.case-pop');
			var className = "show";
			if (!$select.hasClass(className)) {
				$select.addClass(className).show();
				$('#result-mask').show();

				$('.region-pop').removeClass(className).hide();
			} else {
				$select.removeClass(className).hide();
				$('.result-mask').hide();
			}
		},
		regionLinkage:function(){
			var $this = $(this);
			var $select = $('.region-pop');
			var className = "show";
			if (!$select.hasClass(className)) {
				$select.addClass(className).show();
				$('#result-mask').show();

				$('.case-pop').removeClass(className).hide();
			} else {
				$select.removeClass(className).hide();
				$('.result-mask').hide();
			}
		},
		areaSwitch:function(){
			var self = this;
			$('#court-select').empty();

			this.ajaxData.filter.courtLevel = "";

			//法院及地域多级联动
			$.multiSelect({
				container: $('#court-select'),
				data: courtData,
				dataUrl: 'courtData.js',
				defaultSelect: this.selector.defaultSelect,
				menuNumber: 3,
				blankShow: this.selector.courtBlankSelect
			});
		},
		levelSwitch:function(){
			$('#court-select').empty();

			this.ajaxData.filter.courtId = "";

			//法院及地域多级联动
			$.multiSelect({
				container: $('#court-select'),
				data: levelData,
				dataUrl: 'levelData.js',
				defaultSelect: this.selector.defaultSelect,
				menuNumber: 1,
				blankShow: this.selector.courtBlankSelect
			});
		},
		dismissSearch: function() {
			var className = "show";
			$('.region-pop').removeClass(className).hide();
			$('.case-pop').removeClass(className).hide();
			$('.m-nav').removeClass('filter-form').addClass('hidden-xs').css({"position":"relative"});
			$('.floating-btns').show();
			$('.result-mask').hide();
		},
		caseSearch: function(){
			var self = this;
			var className = "show";
			$('.region-pop').removeClass(className).hide();
			$('.case-pop').removeClass(className).hide();
			$('.m-nav').removeClass('filter-form').addClass('hidden-xs').css({"position":"relative"});
			$('.floating-btns').show();
			$('.result-mask').hide();

				// mask.hide();
			this.resetParams();
			var list = $('#case-select .u-select');
			var id = '';
			for (var i = list.length - 1; i >= 0; --i) {
				if (list.eq(i).data('id') != '' && list.eq(i).find('.j-select').html() != this.selector.caseBlankSelect) {
					if(list.eq(i).find('.j-select').html() == this.selector.defaultSelect) {

						if((list.eq(i).data('id') + 1) > 0) {
							this.ajaxData.filter.casetype[0] = list.eq(i).data('id') + 1;
						} else {
							this.ajaxData.filter.casetype = [];
						}
						if(i == 0){
							$('#tag-condt-case').html(this.selector.defaultSelect);
						}else{
							$('#tag-condt-case').html(list.eq(i-1).find('.j-select').html());
						}
					} else {
						this.ajaxData.filter.casetype[0] = list.eq(i).data('id');
						$('#tag-condt-case').html(list.eq(i).find('.j-select').html());
					}
					if($('#tag-condt-case').html() !== this.selector.defaultSelect){
						$('#tag-condt-case').show();
					}
					else{
						$('#tag-condt-case').hide();
					}

					break;
				}
			}
			//$('#content-tag').hide();
			$('#result-container').hide();
			$('#content-title').hide();
			$('#content-load').fadeIn(1000, function() {
				$(".result-mask").hide();
				self.ajax(self.successAjax);
			});
		},
		regionSearch:function(){
			var self = this;
			var className = "show";
			$('.region-pop').removeClass(className).hide();
			$('.m-nav').removeClass('filter-form').addClass('hidden-xs').css({"position":"relative"});
			$('.floating-btns').show();
			$('.result-mask').hide();

			// mask.hide();
			this.resetParams();
			var list = $('#court-select .u-select');
			var id = '';
			for (i = list.length - 1; i >= 0; --i) {
				if (list.eq(i).data('id') != '' && list.eq(i).find('.j-select').html() != this.selector.courtBlankSelect) {
					if (isNaN(list.eq(i).data('id')) || (list.eq(i+1).data('id') != undefined && isNaN(list.eq(i+1).data('id')))) {
						if(list.eq(i).find('.j-select').html() == this.selector.defaultSelect) {
							this.ajaxData.filter.courtLevel = "";
							if(i == 0){
								$('#tag-condt-area').html(this.selector.defaultSelect);
							}else{
								$('#tag-condt-area').html(list.eq(i-1).find('.j-select').html());
							}
						} else {
							this.ajaxData.filter.courtLevel = list.eq(i).data('id');
							$('#tag-condt-area').html(list.eq(i).data('id') + '人民法院');
						}
					} else {
						if(list.eq(i).find('.j-select').html() == this.selector.defaultSelect) {
							if((list.eq(i).data('id') + 1) > 0) {
								this.ajaxData.filter.courtId = list.eq(i).data('id') + 1;
							} else {
								this.ajaxData.filter.courtId = "";
							}
							if(i == 0)
								$('#tag-condt-area').html(this.selector.defaultSelect);
							else
								$('#tag-condt-area').html(list.eq(i-1).find('.j-select').html());
						} else {
							this.ajaxData.filter.courtId = list.eq(i).data('id');
							$('#tag-condt-area').html(list.eq(i).find('.j-select').html());
						}
					}
					if($('#tag-condt-area').html() !== this.selector.defaultSelect)
						$('#tag-condt-area').show();
					else
						$('#tag-condt-area').hide();

					break;
				}
			}
			$('#content-tag').hide();
			$('#result-container').hide();
			$('#content-title').hide();
			$('#content-load').fadeIn(1000, function() {
				$(".result-mask").hide();
				self.ajax(self.successAjax);
			});
		},
		navSelect: function(e){
			var self = this;
			var className = "show";
			var $el = $(e.target).closest(".menu-select")
			$('.case-pop').removeClass(className).hide();
			$('.region-pop').removeClass(className).hide();
			$('.m-nav').removeClass('filter-form').addClass('hidden-xs').css({"position":"relative"});
			$('.floating-btns').show();
			$('.result-mask').hide();

			this.resetParams();
			switch($el.attr("id")) {
				case 'menu-doc-all':
					self.this.ajaxData.filter.doctype = "";
					$('#tag-condt-doc').hide();
					break;
				case 'menu-doc-judge':
					self.ajaxData.filter.doctype = "判决书";
					$('#tag-condt-doc').html("判决书");
					$('#tag-condt-doc').show();
					break;
				case 'menu-doc-decide':
					self.ajaxData.filter.doctype = "裁定书";
					$('#tag-condt-doc').html("裁定书");
					$('#tag-condt-doc').show();
					break;
				case 'menu-year-all':
					self.ajaxData.filter.year = "";
					$('#tag-condt-year').hide();
					break;
				case 'menu-year-2015':
					self.ajaxData.filter.year = "2015";
					$('#tag-condt-year').html("2015");
					$('#tag-condt-year').show();
					break;
				case 'menu-year-2014':
					self.ajaxData.filter.year = "2014";
					$('#tag-condt-year').html("2014");
					$('#tag-condt-year').show();
					break;
				defaults:
					break;
			}

			$('#content-tag').hide();
			$('#result-container').hide();
			$('#content-title').hide();
			$('#content-load').fadeIn(1000, function() {
				self.ajax(self.successAjax);
			});
		},
		clearCont:function(){
			var self = this;
			this.clearData()

			$('#content-tag').hide();
			$('#result-container').hide();
			$('#content-title').hide();
			$('#filter-form').hide();

			$('#content-load').fadeIn(1000, function() {
				self.ajax(self.successAjax);
			});
		},
		resetParams: function() {
			this.selector.firstTime = true;
			this.selector.lastResult = 0;
			this.selector.lastHeight = 52;
			this.ajaxData.pageNum = 0;
		},
		clearData: function(e) {
			this.ajaxData.filter.casetype = [];
			this.ajaxData.filter.courtId = "";
			this.ajaxData.filter.year = "";
			this.ajaxData.filter.level = "";
			this.ajaxData.filter.courtLevel = "";
			this.ajaxData.filter.doctype = "";
			this.ajaxData.keyword = "";
			this.resetParams();

			$('#tag-condt-case').hide();
			$('#tag-condt-area').hide();
			$('#tag-condt-doc').hide();
			$('#tag-condt-year').hide();
		},
		mobileFilterClicked: function() {
			$('#result-mask-mobile').show();
			$('.m-nav').removeClass('hidden-xs');
			$('.nav-mask').hide();
			$('.m-nav').addClass('filter-form');
			$('.m-nav').css({
				"position":"fixed"
			});
			$('.floating-btns').hide();
		},
		scrolLoad: function() {
			var self = this;
			$(window).scroll(function() {
				var navTop =$(window).scrollTop();
				if(self.selector.lastResult >= 20) {
					var id = '#result-item-' + self.selector.lastResult;
					var top = $(id).height() + $(window).scrollTop() + 700;
					if(top >= $(document).height() && self.selector.firstTime) {
						self.selector.firstTime = false;
						self.ajaxData.pageNum++;
						$('#scrollLoad').fadeIn(1000, function() {
							self.ajax(self.successAjax2);
						});
					}
				}
				// if(navTop > 66){
				// 	$(".g-side").css({
				// 		"position":"fixed",
				// 		"top":20+"px"
				// 	})
				// }else{
				// 	$(".g-side").css({
				// 		"position":"relative",
				// 		"top": 0+"px"
				// 	})
				// }

			});
		},
		scrollTop: function () {
	        var speed=200; //滑动的速度
	        $('body,html').animate({ scrollTop: 0 }, speed);

	        return false;
		},

		smartClick: function(e) {
			var self = this;
			var textarea = this.element.$textarea;
			var keyword = $("#keyword");
			if (textarea.val() == this.selector.caseTip) {
				alert('请输入案情描述');
				textarea.focus();
				return false;
			};

			$('#content-tag').hide();
			$('#result-container').hide();
			$('#content-title').hide();
			$('.m-not-found').hide();
			$('#content-load').fadeIn(1000, function() {
				$('#result-container').find(".result-box").remove();
				$(this).css({
					'backgroundColor': '',
					'cursor': ''
				}).prop('disabled', false);
				self.clearData();
				self.ajaxData.text = textarea.val();
				self.ajaxData.keyword = keyword.val();
				self.ajax(self.successAjax);
			});
			$(".floating-btns").removeClass("hidden");
			e.preventDefault();

		},
		showResults: function() {
			$("#result-container").show();
			$('#content-title').hide();
			$('.m-not-found').hide();
			if(this.ajaxData.keyword) {
				$("#result-container").highlight(this.ajaxData.keyword, {needUnhighlight: false});
			}
			$(".floating-btns").removeClass("hidden");
		},

		ajax: function(callback) {
			var self = this;
			var arg = this.ajaxData;
			if (!arg){
				return false;
			}
			var filter = arg.filter;
			if (!filter){
				return false;
			}

			if(!filter.casetype){
				filter.casetype = [];
			}
            //var reqData = {"text": arg.text, "agent":arg.keyword,"page":10, "num":12};
            var reqData = {"text": arg.text};
			console.log('reqData',reqData);
			$.ajax({

				url: 'http://47.92.38.167:8889/feature_query/patent_classify',

				type: 'POST',
				dataType: 'JSON',
				data: JSON.stringify(reqData),
			})
			//.done(self.successAjax.bind(this))
			.done((function(res){
				var that = this;
				var reqData = {
					"classify_no": res.data[0][0],
					"page":10,
					"num":100
				};
				$.ajax({
					url: 'http://47.92.38.167:8889/static_query/patent_info',
	
					type: 'POST',
					dataType: 'JSON',
					data: JSON.stringify(reqData),
				})
				.done(callback.bind(that))
				.fail(function() {
					$('#content-load').hide();
					$('#result-scroll-load').hide();
					$('#content-title').show();
					self.resetParams();
				})
			}).bind(this))
			.fail(function() {
				alert("服务器错误!");
				$('#content-load').hide();
				$('#result-scroll-load').hide();
				$('#content-title').show();
				self.resetParams();
			})
			.always(function() {
				console.log("complete");
			});
		},

		successAjax : function(json) {
			var self = this;
			console.log('json',json);
			if (!!json) {
				var data = (typeof json == 'object') ? json : JSON.parse(json);
				if (data.code != 0) {
					alert("未找到数据!");
					$('#content-load').hide();
					$('.m-not-found').show();
					$('#content-tag').hide();
					$(".nav-mask").show();
					$(".g-side").css({
						"position":"relative"
					})
				} else {
					var i = 20;
					$('#scrollLoad').hide();
					$('#content-load').hide();
					$('.m-not-found').hide();
					$(".nav-mask").hide();
					$('#content-tag').show();
					$("#result-container").find(".result-box").remove();
					$("#scroll-top").show();
					console.log('data',data);
					$("#result-container").show().html(ejs.render(this.mosaic.caseTXT,{data:data.data}))
					$("a.result-main").on("click", this.replaceBrowserHistory.bind(this));

					this.selector.lastResult = i+this.selector.lastResult;
					if(this.ajaxData.keyword) {
						$("#result-container").highlight(this.ajaxData.keyword, {needUnhighlight: false});
					}
				}
				if(this.ajaxData.pageNum == (data.pageCount - 1)){
					this.selector.firstTime = false;
				}else{
					this.selector.firstTime = true;
				}
				localStorage.data = $("#case-explain").val();
				localStorage.keyword = $("#keyword").val();
				this.replaceBrowserHistory();
			}
			//this.selector.lastResult = 20;
		},
		successAjax2 : function(json) {
			var self = this;
			if (!!json) {
				var data = (typeof json == 'object') ? json : JSON.parse(json);
				if (data.error_code == 404) {
					alert("未找到数据!");
				}else{
					var i = data.data.length;
					$("#result-container").show().append(ejs.render(this.mosaic.caseTXT,{data:data.data, reason: App.prototype.reason_2,lastResult : this.selector.lastResult}))
					$("a.result-main").on("click", this.replaceBrowserHistory.bind(this));
					this.selector.lastResult = i+this.selector.lastResult;
				}
				if(self.ajaxData.pageNum == (data.pageCount - 1)){
					self.selector.firstTime = false;
				}
				else{
					self.selector.firstTime = true;
				}
			}
		},

	}
    var start = new App();
    return start;
});
