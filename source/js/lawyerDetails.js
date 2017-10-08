define(["require", "unslider","echarts","china","common","ejs","pagination","tabCollapse"],function(require, unslider,echarts,china){
	var App = function(){
		this.defaultData = {
			certification:"", //是否认证
			lawyerName:"", //律师姓名
			lawyerInc:"", //律师事务所名称
			mainＷorkLoc:"", //主要执业地
			workAge:"", //工作年限
			similarCase:"", //相似案例
			num: 0,
			caseId:0,
			totalSize: 0,
		};
	};
	App.prototype = {
		name : decodeURI(escape(getQueryString("name"))),
		location : decodeURI(escape(getQueryString("location"))),
		// caseName : encodeURI(getQueryString("caseName")),
		constructor : App,

		init: function(){
			var self = this;
			this.element = {
				$regionCity: $(".region-city"),//地域分布列表
				$Control: $(".j-control"),//地域分布按钮
				$Details: $(".m-details"),//律师信息
				$caseNav: $(".case-nav"),//律师信息
				$caseList: $(".case-txt"),//律师信息
				$involve: $(".m-involve"),
				$bar: $(".bar"),
				$mTab: $(".m-tab"),
				$uTab: $(".u-tab"),
				$clickToPayBtn: $("#click-to-pay-btn"),
				$pieEcharts : echarts.init(document.getElementById('typePie')),
				$mapEcharts : echarts.init(document.getElementById('map')),
			  $barEcharts : echarts.init(document.getElementById("bar")),
			};



			this.testing = {
				tab1 : true,
				tab2 : true,
				tab3 : true,
				tab4 : true,
				caseNav : true,
				callback : true,
				level : true,
			};

			this.api = {

			};

			this.mosaic = {
				citySpread : [
					'<% for (var i = 0; i < data.caseLocList.length; i++) {%>',
						'<ul>',
							'<li><%=data.caseLocList[i].name%><span>(<%=data.caseLocList[i].num%>)</span></li>',
							'<% for (var j = 0; j < data.caseLocList[i].list.length; j++) {%>',
								'<% if(data.caseLocList[i].list[j].name != ""){ %>',
									'<li><%=data.caseLocList[i].list[j].name%><span><%=data.caseLocList[i].list[j].num%></span></li>',
								'<% } %>',
							'<% } %>',
						'</ul>',
					'<% } %>',
				].join(""),

				tab : [
					'	<% for (var i = 0; i < data.statCase.length; i++) {%>',
					'		<% if( i == 0 ){ %>',
					'			<li role="presentation" class="active"><a href="#tab-<%=i%>" aria-controls="tab-<%=i%>" role="tab" data-toggle="tab"><%=data.statCase[i].caseType%><span>(<%=data.statCase[i].caseNum%>)</span></a></li>',
					'		<% }else{ %>',
					'			<li role="presentation" ><a href="#tab-<%=i%>" aria-controls="tab-<%=i%>" role="tab" data-toggle="tab"><%=data.statCase[i].caseType%><span>(<%=data.statCase[i].caseNum%>)</span></a></li>',
					'		<% } %>',
					'	<% } %>',

				].join(""),

				involve:[
					'	<ul class="f-clear">',
					'		<li>',
					'			<i class="icon-city"></i>',
					'			<p>主要执业地</p>',
					'			<% if(data.mainLoc == ""){ %>',
					'				<h5>暂无</h5>',
					'			<% }else{ %>',
					'				<h5><%=data.mainLoc%></h5>',
					'			<% } %>',
					'		</li>',
					'		<li>',
					'			<i class="icon-customer"></i>',
					'			<p>主要用户群体</p>',
					'			<% if(data.mainCustomer == 1 ){  %>',
					'				<h5>公司</h5>',
					'			<% }else if(data.mainCustomer == ""){%>',
					'				<h5>暂无</h5>',
					'			<% }else{%>',
					'				<h5>个人</h5>',
					'			<% } %>',
					'		</li>',
					'		<li>',
					'			<i class="icon-highest"></i>',
					'			<p>承办案件最高涉案金额</p>',
					'			<% if(data.amountsMax == ""){ %>',
					'				<h5>暂无</h5>',
					'			<% }else{ %>',
					'				<h5><%=data.amountsMax%>万</h5>',
					'			<% } %>',
					'		</li>',
					'		<li>',
					'			<i class="icon-average"></i>',
					'			<p>承办案件平均涉案金额</p>',
					'			<% if(data.amountsAvg == ""){ %>',
					'				<h5>暂无</h5>',
					'			<% }else{ %>',
					'				<h5><%=data.amountsAvg%>万</h5>',
					'			<% } %>',
					'		</li>',
					'	</ul>',
				].join(""),
				nonGraphFormat: [
					'				<% for (var i = 0; i < data.length; i++) { %>',
					'					<span><%=data[i].name%>(<%=data[i].value%>次，<%=data[i].percentage%>%)</span><br/>',
					'				<% }; %>',
				].join(""),
				lawyerDetails: [
					'<div class="m-portrait  col-xs-4 col-md-3 col-lg-2">',
					'	<% if (data.photoUrl == "") { %>',
					'		<img class="img-responsive img-thumnail" style="min-width:100%" src="../images/default-big.jpg">',
					'	<% }else{ %>',
					'		<img class="img-responsive img-thumnail" style="min-width:100%" src="<%=data.photoUrl%>">',
					'	<% } %>',

					'		<% if(data.certification == 0){ %>',
					'			<div class="validate notValidate">未认证</div>',
					'		<% }else{ %>',
					'			<div class="validate"><i class="validate-ok"></i>已认证</div>',
					'		<% } %>',
					'</div>',
					'<div class="m-synopsis col-xs-8 col-md-9 col-lg-10" style="position: relative;min-height:50px">',
					' <div class="blur-cover"><button class="btn btn-primary click-to-pay-btn" id="click-to-pay-btn">点击付费查看更多详情</button></div>',
					'	<div class="f-clear ">',
					'		<div class="name col-xs-12 col-sm-4 col-md-3"><%=data.lawyerName%></div>',
					'		<div class="office col-xs-12 col-sm-8"><%=data.lawyerInc%></div>',
					'	</div>',
					'</div>',
					'<div class="m-synopsis col-xs-12 col-sm-8 col-md-9 col-lg-10">',
					'	<div class="list f-clear" style="position: relative;min-height:50px">',
					' 	<div class="blur-cover"></div>',
					'		<div class="">',
					'		<div class="col-sm-6 col-xs-12 <%= data.certificationNo == 0 || data.certificationNo == "" ? "hidden-xs" : "" %>">',

					'			<dt><span class="icon-list">&#xe600;</span>执业证号</dt>',
					'			<% if(data.certificationNo == 0 || data.certificationNo == ""){ %>',
					'				<dd>该律师尚未认证</dd>',
					'			<% }else{ %>',
					'				<dd><%=data.certificationNo%></dd>',
					'			<% } %>',
					'   </div>',
					'		<div class="col-sm-6 col-xs-12 <%=data.contact == "" ? "hidden-xs" : "" %>">',
					'			<dt><span class="icon-list">&#xe605;</span>联系方式</dt>',
					'			<% if(data.contact == ""){ %>',
					'				<dd>暂无</dd>',
					'			<% }else{ %>',
					'				<dd><button class="btn btn-primary" id="reveal-phone-btn">点击付费查看联系方式</button></dd>',
					'				<dd id="phone-info" style="display: none"><%=data.contact%></dd>',
					'			<% } %>',
					'   </div>',
					'		<div class="col-sm-6 col-xs-12 <%=data.legalFee == "" ? "hidden-xs" : ""%>">',
					'			<dt><span class="icon-list">&#xe603;</span>律师费</dt>',
					'			<% if(data.legalFee == ""){ %>',
					'				<dd>暂无</dd>',
					'			<% }else{ %>',
					'				<dd><%=data.legalFee%></dd>',
					'			<% } %>',
					'   </div>',
					'		<div class="col-sm-6 col-xs-12 <%= data.workAge == "" ? "hidden-xs" : "" %>">',
					'			<dt><span class="icon-list">&#xe601;</span>执业年限</dt>',
					'			<% if(data.workAge == ""){ %>',
					'				<dd>暂无</dd>',
					'			<% }else{ %>',
					'				<dd><span class="f-num"><%=data.workAge%></span>年</dd>',
					'			<% } %>',
					'   </div>',
					'		<div class="col-sm-6 col-xs-12 <%= data.caseNum == "" ? "hidden-xs" : ""%>"">',
					'			<dt><span class="icon-list">&#xe606;</span>收录案件数量</dt>',
					'			<% if(data.caseNum == ""){ %>',
					'				<dd>暂无</dd>',
					'			<% }else{ %>',
					'				<dd><span class="f-num"><%=data.caseNum%></span>件</dd>',
					'			<% } %>',
					'   </div></div>',
					'	</div>',
					'	<div class="u-line"></div>',
					'	<div class="m-skilful">',
					'		<div>',

					'			<dt>擅长领域</dt>',
					'			<dd>',
					'			<% if(data.goodAtFieldList == 0){ %>',
					'				<span>暂无</span>',
					'			<% }else{ %>',
					'				<% for (var i = 0; i < data.goodAtFieldList.length; i++) { %>',
					'					<span><%=data.goodAtFieldList[i].caseTypeName%>(<%=data.goodAtFieldList[i].caseNum%>)</span>',
					'				<% }; %>',
					'			<% }; %>',
					'			</dd>',
					'   </div>',
					'			<% if(data.similarCase.caseName != "" && data.similarCase.id != ""){%>',
					'       <div style="clear:both">',
					'				<dt>类似案例</dt>',
					'       <dd><a class="caseName" href="case-detail.html?id=<%=data.similarCase.id%>" target="_blank"><%=data.similarCase.caseName%></a></dd>',
					'       </div>',
					'			<% } %>',
					'		</dl>',
					'	</div>',
					'</div>',
				].join(""),

				caseNav : [
					'<ul>',
					'	<li>案件类型</li>',
					'	<% for (var i = 0; i < data.typeData.length; i++) { %>',
					'		<% if( i == 0){ %>',
					'			<li  id="<%=data.typeData[i].id%>"><%=data.typeData[i].typeName%><span data-num="<%=data.typeData[i].count%>">(<%=data.typeData[i].count%>)</span></li>',
					'		<% }else{ %>',
					'			<li id="<%=data.typeData[i].id%>"><%=data.typeData[i].typeName%><span data-num="<%=data.typeData[i].count%>">(<%=data.typeData[i].count%>)</span></li>',
					'		<% } %>',
					'	<% } %>',
					'</ul>',
				].join(""),

				caseList : [
					'<div class="result">',
					'<h3>具体案件</h3>',
					'<ul>',
					'	<% for (var i = 0; i < data.dataList.length; i++) { %>',
					'	<li>',
					'		<div class="judgment">',
					'		<% if(data.dataList[i].childCaseList.length == 0){ %>',
					'			<a href="case-detail.html?id=<%=data.dataList[i]._id%>" target="_blank"><%=data.dataList[i].title%><span><%=data.dataList[i].caseDate%></span></a>',
					'		<%}else{ %>',
					'			<a href="case-detail.html?id=<%=data.dataList[i]._id%>" target="_blank"><%=data.dataList[i].title%>(<%=data.dataList[i].childCaseList.length%>)<span><%=data.dataList[i].caseDate%></span></a>',
					'		<% } %>',
					'		</div>',
					'		<div class="dispute"><p>争议焦点：',
					'			<% if(data.dataList[i].caseControversy.length == 0){ %>',
					'				暂无',
					'			<%}else{ %>',
					'				<% for (var k = 0; k < data.dataList[i].caseControversy.length; k++) { %>',
					'					【<%=data.dataList[i].caseControversy[k]%>】',
					'				<% } %>',
					'			<% } %>',
					'			<% if(data.dataList[i].childCaseList.length!= 0){ %>',
					'				<span class="j-see">查看合并审理案件</span>',
					'			<% } %>',
					'		</p></div>',
					'		<div class="case-txt-list">',
					'			<ul>',
					'			<% for (var j = 0; j < data.dataList[i].childCaseList.length; j++) { %>',
					'				<li>',
					'					<div class="judgment"><a href="case-detail.html?id=<%=data.dataList[i].childCaseList[j]._id%>" target="_blank"><%=data.dataList[i].childCaseList[j].title%><span><%=data.dataList[i].childCaseList[j].caseDate%></span></a></div>',
					'					<div class="dispute"><p>争议焦点：',
					'					<% if(data.dataList[i].childCaseList[j].caseControversy.length == 0){ %>',
					'						暂无',
					'					<%}else{ %>',
					'						<% for (var o = 0; o < data.dataList[i].childCaseList[j].caseControversy.length; o++) { %>',
					'							【<%=data.dataList[i].childCaseList[j].caseControversy[o]%>】',
					'						<% } %>',
					'					<%} %>',
					'					</p></div>',
					'				</li>',
					'			<% } %>',
					'			</ul>',
					'		</div>',
					'	</li>',
					'	<% } %>',
					'</ul>',
					'</div>',
				].join(""),

				include : [
					'<div class="n-included">',
					'	<div class="included-txt">',
					'		<span></span>该类案件暂未收录',
					'	</div>',
					'</div>',
				].join(""),
			}

			this.bindEvent();
			this.ajax();
			$(".g-loding").fadeIn(1000);


self.ajaxData(0,self.ajaxEchart_0);
self.ajaxData(1,self.ajaxEchart_1);
self.ajaxData(2,self.ajaxEchart_2);
self.ajaxData(3,self.ajaxEchart_3);

		},

		hideEmptyDataForMobile: function() {
			$(".n-included").closest(".container").addClass("hidden-xs");

		},

		bindEvent: function(){
			this.element.$mTab.on("click","li",this.tabReport.bind(this));//大类TAB选项
			this.element.$uTab.on("click","li",this.tabAnalysis.bind(this));//小类TAB选项
			this.element.$Control.on("click",this.Control.bind(this));
			this.element.$caseList.on("click",this.slideSee.bind(this));
			this.element.$caseNav.on("click","li",this.tabType.bind(this));
			this.element.$pieEcharts.on("click",this.typeList.bind(this));
		},
		revealPhoneInfo: function() {
			$("#reveal-phone-btn").parent().hide();
			$("#phone-info").show();
			this.onPurchaseBtnClicked();
		},
		tabReport: function(e){
			var self = this;
			var $el = $(e.target).closest("li");
			var num = $el.index();
            if(num==0){
            	this.testing.tab1 = false;
            }else if(num==1){
            	this.testing.tab2 = false;
            }else if(num==2){
            	self.testing.tab3 = false;
            }else if(num==3){
            	this.testing.tab4 = false;
            }
            this.defaultData.num = num;
            self.testing.caseNav = false;
            this.defaultData.totalSize = $el.find("span").html().replace(/[\(\)$]/g,"");
		},
		tabAnalysis: function(e){
			e.preventDefault();//禁止默认事件
			var $el = $(e.target).closest("li");
			var distribution = $el.parents(".u-tab").siblings(".m-distribution")
			var list = $el.parents(".u-tab").siblings(".case-list")
			var num = $el.index();
            $el.addClass('active').siblings("li").removeClass('active');
            if(num == 0){
        		distribution.addClass('show');
        		list.removeClass('show');
        	}else if( num == 1){
				distribution.removeClass('show');
        		list.addClass('show');
        		if(this.testing.caseNav == false){
        			// this.initPagination();
        			this.ajaxList(this.defaultData.num,this.ajaxList_1,this.defaultData.caseId,0);
        			this.testing.caseNav = true;
        		}
        	}
		},
		Control: function(e){
			var $el = $(e.target).closest(".j-control");
			var left =parseInt($(".region-city").css("left"));
			var ulList = $(".region-city ul").length-1;
			if($el.index() == 0){
				if(left >= 0){
					$(".region-city").stop().animate({
						"left" : 0+"px"
					},300);
				}else{
					$(".region-city").stop().animate({
						"left" : (left+190)+"px"
					},300);
				}
			}else{
				if(left <= -ulList*190){
					$(".region-city").stop().animate({
						"left" : -(ulList*190)+"px"
					},300);
				}else{
					$(".region-city").stop().animate({
						"left" : (left-190)+"px"
					},300);
				}
			}
		},
		level : function(levelBox,levelList,levelNum){
			var num = levelNum;
				// $(".no-civil").eq(levelNum).hide();
			 //    $(".level-civil").eq(levelNum).show();
				if(levelList.length == 2 && (levelList[0][0] == 0 || levelList[1][0] == 0)){
					num = 0;
				}
		    	levelBox.find(".level-show").eq(num).css("width",levelList[levelNum][0] + "%")
		    	levelBox.find(".level-txt").eq(num).html(levelList[levelNum][0] + "%")
		    	levelBox.find(".level-list1").eq(num).html(levelList[levelNum][2])
		    	levelBox.find(".level-list2").eq(num).html(levelList[levelNum][3] - levelList[levelNum][2])
		    	levelBox.find(".rates").eq(num).html(levelList[levelNum][0] + "%")
	    	if(levelList[levelNum][1] == 0){
	    		levelBox.find(".height").eq(num).html("低");
	        }else if(levelList[levelNum][1] == 1){
	        	levelBox.find(".height").eq(num).html("高");
	        }
		},
		slideSee : function(e){
			var $el = $(e.target).closest('.j-see')
			var List = $el.parents(".dispute").siblings('.case-txt-list');
			if(List.css("display") == "none"){
				List.show(function() {
					$el.html("收起合并审理的案件")
				});
			}else{
				List.hide(function() {
					$el.html("查看合并审理的案件")
				});
			}
		},
		tabType: function(e){
			var self = this;
			var $el = $(e.target).closest('li');
			var num = this.defaultData.num;
			$el.addClass('active').siblings('li').removeClass('active');
			if($el.hasClass('active')){
				var caseId = $el.attr("id");
				var caseSize = $el.find("span").data("num");
				this.defaultData.caseId = caseId;
				this.defaultData.totalSize = caseSize;
				this.ajaxList(num,this.ajaxList_1,caseId,0);
				self.testing.callback = true;
			}
		},
		typeList:function(params){
			// var self = this;
			// var num = params.data.statType;
			// var typeNum = params.data.childCaseType;
			// var totalSize = params.data.value;
			// $(".m-tab li").eq(num).addClass('active').siblings("li").removeClass('active');
      //       $(".m-range").eq(num).addClass('f-range').siblings().removeClass('f-range');
      //       $(".u-tab li").eq(num*2-1).addClass('active').siblings().removeClass('active');
      //       $(".m-distribution").removeClass('show');
      //       $(".case-list").addClass('show');
      //       this.defaultData.caseId = typeNum;
      //       this.defaultData.num = num;
      //       this.defaultData.totalSize = totalSize;
      //       console.log(this.testing.tab2,this.testing.tab3,this.testing.tab4)
      //       if(num==0){
      //       	$(".m-distribution").addClass('show');
      //       	$(".case-list").removeClass('show');
      //       }else if(num==1){
      //   		this.ajaxData(num,self.ajaxEchart_1);
      //   		this.ajaxList(this.defaultData.num,this.ajaxList_1,this.defaultData.caseId,0);
      //       }else if(num==2){
      //   		this.ajaxData(num,self.ajaxEchart_2);
      //   		this.ajaxList(this.defaultData.num,this.ajaxList_1,this.defaultData.caseId,0);
      //       }else if(num==3){
      //   		this.ajaxData(num,self.ajaxEchart_3);
      //   		this.ajaxList(this.defaultData.num,this.ajaxList_1,this.defaultData.caseId,0);
      //       }

		},
		initPagination : function(totalSize) {
			var self = this;
			var num = totalSize;
			// 创建分页
			$(".pagination").pagination(num/10, {
				num_edge_entries: 1, //边缘页数
				num_display_entries: 4, //主体页数
				callback: self.pageselectCallback.bind(this),
				items_per_page: 1, //s每页显示1项
				prev_text: "<<",
				next_text: ">>"
			});
		},
		pageselectCallback: function(index,jq){
			var self = this;
			var num = index - 1;
			if(self.testing.callback == false){
				self.ajaxList(self.defaultData.num,self.ajaxList_1,self.defaultData.caseId,num+1)
			}
		},

		PieType: function(typeList ,typeRadius,dataColor){
			var typeRadius = typeRadius||['55%','70%'];
			var dataColor = dataColor || ['#20385C','#2F476A','#3D5579','#4C6487','#5A7295','#6981A4','#778FB2','#869EC1','#94ACCF','#A3BBDD','#B1C9EC','#C0D8FA'];
	        var option = {
	            tooltip : {
	                trigger: 'item',
	                formatter: "{a} <br/>{b} : {c} ({d}%)"
	            },
	            series : [
	                {
	                	name: '结果分析',
	                    type: 'pie',
	                    radius : typeRadius,
	                    center: ['50%', '60%'],
	                    hoverAnimation: true,
	                    data: typeList,
	                    label: {
	                        normal: {
	                            textStyle: {
	                                fontSize: '12',
	                                //color: '#444',
	                            }
	                        },
	                        emphasis: {
	                            show: true,
	                            textStyle: {
	                                fontSize: '12',
	                                fontWeight: 'bold',
	                            }
	                        }
	                    },
	                    itemStyle: {
	                        emphasis: {
	                            shadowBlur: 10,
	                            shadowOffsetX: 0,
	                            shadowColor: 'rgba(0, 0, 0, 0.5)'
	                        },
	                    },
	                }
	            ],
	            color : dataColor,
	        }
	        option.typeRadius = typeRadius;

	        return option
	    },
	    mapEcharts:function(Province){
	    	option = {
	            tooltip : {
	                trigger: 'item',
	                formatter: '{b}'
	            },
	            series: [
	                {
	                    name: '中国',
	                    type: 'map',
	                    mapType: 'china',
	                    zoom : 1.2,
	                    label: {
	                        normal: {
	                            show: false
	                        },
	                        emphasis: {
	                            show: false
	                        }
	                    },
	                    itemStyle: {
	                        normal: {
	                            borderColor: '#fff',
	                            areaColor: "#e6e6e6",
	                        },
	                        emphasis: {
	                            areaColor: '#4077b2',
	                        },
	                    },
	                    data: Province,
	                }
	            ]
			}
			return option;
	    },
	    barEcharts:function(name,num){
	        var barOption = {
	            color: ['#C0D8FA'],
	            tooltip : {
	                trigger: 'axis',
	                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	                }
	            },
	            grid: {
	                left: '3%',
	                right: '15%',
	                bottom: '10%',
	                containLabel: true
	            },
	            xAxis : {
	                name : '件数',
	                type: 'value',
	                boundaryGap: [0, 0.01],
	                minInterval: 1
	            },
	            yAxis : {
	                type: 'category',
	                axisLabel : {
	                	interval:0,
	                },
	                data: name,
	            },
	            series : [
	                {
	                    type:'bar',
	                    barWidth: '14px',
	                    data: num,
	                    label : {
	                        normal : {
	                            show:true,
	                            position:'right',
	                            textStyle:{
	                                color : "#666"
	                            }
	                        }
	                    },

	                }
	            ],
	        };
	        barOption.name = name;
	        barOption.num = num;

	        return barOption;
    	},
    	barEcharts2:function(name,num){
	        var barOption = {
	            color: ['#C0D8FA'],
	            tooltip : {
	                trigger: 'axis',
	                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	                }
	            },
	            grid: {
	                left: '3%',
	                right: '15%',
	                bottom: '10%',
	                containLabel: true
	            },
	            xAxis : {
	            	name : '万元',
	                type: 'category',
	                data: name,
	            },
	            yAxis : {
	                name : '案件数(个)',
	                type: 'value',
	                boundaryGap: [0, 0.01],
	            },
	            series : [
	                {
	                    type:'bar',
	                    barWidth: '30px',
	                    data: num,
	                    label : {
	                        normal : {
	                            show:true,
	                            position:'top',
	                            textStyle:{
	                                color : "#666"
	                            }
	                        }
	                    },
	                    markPoint:{
	                        label:{
	                            normal:{
	                                show : true,
	                            }
	                        },
	                        data : ["dsa","sds"]
	                    }
	                }
	            ],
	        };
	        barOption.name = name;
	        barOption.num = num;
	        return barOption;
    	},

	    ajax: function() {
			var self = this;
			console.log(localStorage)
			$.ajax({
				url: 'http://47.92.38.167:8889/static_query/lawyer_list',
				type: 'POST',
				dataType: 'json',
				data: {
					lawyer_name : App.prototype.name,
					lawyer_location : App.prototype.location,
					reason : ''
				},

			})
			.done(function(json) {
				console.log(resData,json);
				var data = (typeof json == 'object') ? json : JSON.parse(json)
				self.element.$Details.append(ejs.render(self.mosaic.lawyerDetails,{data:data}));
				$("#reveal-phone-btn").on("click", self.revealPhoneInfo.bind(self));

				self.element.$mTab.html(ejs.render(self.mosaic.tab,{data:data}));
					$('#report-tab').tabCollapse({
						tabsClass: 'hidden-xs',
						accordionClass: 'visible-xs'
					});
			})
			.fail(function() {
				console.log("detail-error");
			})
			.always(function() {
				console.log("complete");
			});
		},
		ajaxData:function(num,callback){
			var self = this;

			$.ajax({
				url: '../../lawyer_stat.php',
				type: 'POST',
				dataType: 'json',
				data: {
					q:{
						id : App.prototype.paperId,
						statType: num ,
					}
				},
			})
			.done(callback.bind(this))
			//.done(self.ajaxEchart.bind(this))
			.fail(function() {
				console.log("Data-error");
			})
			.always(function() {
				console.log("complete");
			});
		},
		ajaxList:function(num,callback,typeNum,pageNum){
			var self = this;
			$.ajax({

				url: '../../lawyer_case_list.php',
				type: 'POST',
				dataType: 'json',
				data: {
					q:{
						id : App.prototype.paperId,
						caseType: num ,
						childCaseType:typeNum,
						pageNum:pageNum,
					}
				},
			})
			.done(callback.bind(this))
			.fail(function() {
				console.log("List-error");
			})
			.always(function() {
				console.log("complete");
			});
		},

		ajaxEchart_0: function(json){
			var self = this;
			if(!!json){
				$(".g-loding").fadeOut(500);
				var data = (typeof json == 'object') ? json : JSON.parse(json)
			    self.element.$regionCity.html(ejs.render(self.mosaic.citySpread,{data:data}));
			   	self.element.$involve.html(ejs.render(self.mosaic.involve,{data:data}))

			    this.element.$pieEcharts.setOption(self.PieType(data.caseTypeList));
					$("#case-type-list-nongraph").html(ejs.render(self.mosaic.nonGraphFormat,{data:this.sortDataListByValue(data.caseTypeList)}));

					this.element.$mapEcharts.setOption(self.mapEcharts(data.caseLocList));

			    this.element.$barEcharts.setOption(self.barEcharts(data.caseProcessList.fields,data.caseProcessList.data))
			    if(data.caseLocList.length <= 2){
					self.element.$Control.hide();
				}else{
					self.element.$Control.show();
				}
			}
			this.hideEmptyDataForMobile();

		},
		getColorForPieLabel: function(name) {
			if (name == "胜诉") {
				return '#20385c';
			} else if (name == "部分胜诉") {
				return '#4298ef'
			} else if (name == "败诉") {
				return '#c0d8fa'
			}
		},
		ajaxEchart_1: function(json){
			var self = this;
			if(!!json){
				$(".g-loding").fadeOut(500);
				var data = (typeof json == 'object') ? json : JSON.parse(json)
				var pie = [];
				var bar = [];
				var barList = [[data.amountsList.fields,data.amountsList.data],[data.appealList.fields,data.appealList.data],[data.controversyList.fields,data.controversyList.data]]
				var pieList = [[data.resultFirst.data,data.resultFirst.winRate,data.resultFirst.isMoreAvg],[data.resultSecond.data,data.resultSecond.winRate,data.resultSecond.isMoreAvg],[data.resultThird.data]]
				var levelList = [[data.retrialPassRate.rate,data.retrialPassRate.isMoreAvg,data.retrialPassRate.num,data.retrialPassRate.totalNum],[data.peaceRate.rate,data.peaceRate.isMoreAvg,data.peaceRate.num,data.peaceRate.totalNum]]
				var pie2 = $(".pie2").parents(".m-pie")
				for (var i = 0; i < $(".pie2").length; i++) {
			        pie.push(echarts.init(document.getElementsByClassName("pie")[i]));
			        if(pieList[i][0].length == 0){
			        	$(".pie2").eq(i).html(ejs.render(self.mosaic.include,{}));

			        	pie2.find(".j-civil-txt").eq(i).html("<span class='rates'></span><span class='height'></span>");
			        }else{
								var colors = [];
								var data = pieList[i][0];
								for (var j=0; j<data.length; j++) {
									colors[j] = self.getColorForPieLabel(data[j].name);
								}
			        	pie[i].setOption(self.PieType(data,"55%",colors));
			        	$(".m-pie .rates").eq(i).html(pieList[i][1]);
			        	if(pieList[i][2] == 1){
				        	$(".m-pie .height").eq(i).html("高");
				        }else{
				        	$(".m-pie .height").eq(i).html("低");
				        }

								$(".pie2").eq(i).next().html(ejs.render(self.mosaic.nonGraphFormat, {data: this.sortDataListByValue(pieList[i][0])}));

			        }
			    };
			    for (var j = 0; j < $(".bar2").length; j++) {
			        bar.push(echarts.init(document.getElementsByClassName("bar2")[j]))
			        if(barList[j][0].length == 0){
			        	$(".bar2").eq(j).html(ejs.render(self.mosaic.include,{}));

			        }else{
			        	bar[j].setOption(self.barEcharts(barList[j][0],barList[j][1]))
			        }
			    };
			    bar[0].setOption(self.barEcharts2(barList[0][0],barList[0][1]))
			    for( var k = 0; k < levelList.length; k++){
			    	if(levelList[k][0] == 0){
			    		// $(".no-civil").eq(k).show();
			    		// $(".level-civil").eq(k).hide();
			        	$(".m-level1").find(".civil").eq(k).html(ejs.render(self.mosaic.include,{}))
			        	$(".m-level1").find(".j-civil-txt").eq(k).html("");
			        }else{
			        	self.level($(".m-level1"),levelList,k)
			        }
			    }

			}
			this.hideEmptyDataForMobile();

		},
		ajaxEchart_2: function(json){
			var self = this;
			if(!!json){
				$(".g-loding").fadeOut(500);
				var data = (typeof json == 'object') ? json : JSON.parse(json)
				var pie = [];
				var pieList = [[data.resultFourth.data],[data.retrialFifth.data]];
				var bar3 = echarts.init(document.getElementsByClassName("bar3")[0]);
				var levelList = [[data.guaranteeRate.rate,data.guaranteeRate.isMoreAvg,data.guaranteeRate.num,data.guaranteeRate.totalNum],[data.probationRate.rate,data.probationRate.isMoreAvg,data.probationRate.num,data.probationRate.totalNum]]
				//var levelList = [[data.probationRate.rate,data.probationRate.isMoreAvg,data.probationRate.num,data.probationRate.totalNum]]

				var pie3 = $(".pie3").parents(".m-pie")
				for (var i = 0; i < $(".pie3").length; i++) {
			        pie.push(echarts.init(document.getElementsByClassName("pie3")[i]));
			        if(pieList[i][0].length == 0){
			        	$(".pie3").eq(i).html(ejs.render(self.mosaic.include,{}))
			        	pie3.find(".j-civil-txt").eq(i).html("");
			        }else{
			        	pie[i].setOption(self.PieType(pieList[i][0],"55%",['#20385c','#4298ef','#c0d8fa']));
								$(".pie3").eq(i).next().html(ejs.render(self.mosaic.nonGraphFormat, {data: this.sortDataListByValue(pieList[i][0])}));
			        }
			        if(levelList[i][0] == 0){
			        	$(".m-level2").find(".civil").eq(i).html(ejs.render(self.mosaic.include,{}))
			        	$(".m-level2").find(".j-civil-txt").eq(i).html("");
			        }else{
			        	 this.level($(".m-level2"),levelList,i)
			        }
			    };
			    $("#innocent").html(data.noGuiltyNum);
			    $("#noProsequi").html(data.cancelNum);
			    if(data.criminalStat.data.length == 0){
		        	$(".bar3").html(ejs.render(self.mosaic.include,{}))
		        }else{
		        	 bar3.setOption(self.barEcharts(data.criminalStat.fields,data.criminalStat.data))
		        }
			}
			this.hideEmptyDataForMobile();

		},
		ajaxEchart_3: function(json){
			var self = this;
			if(!!json){
				$(".g-loding").fadeOut(500);
				var data = (typeof json == 'object') ? json : JSON.parse(json)
				var pie = [];
				var pieList = [[data.resultSixth.data,data.resultSixth.winRate,data.resultSixth.isMoreAvg],[data.resultSeventh.data,data.resultSeventh.winRate,data.resultSeventh.isMoreAvg],[data.resultEighth.data,data.resultEighth.winRate,data.resultEighth.isMoreAvg]];
				var levelList = [[data.peaceRate.rate,data.peaceRate.isMoreAvg,data.peaceRate.num,data.peaceRate.totalNum]];
				var pie4 = $(".pie4").parents(".m-pie")
				for (var i = 0; i < $(".pie4").length; i++) {
					pie.push(echarts.init(document.getElementsByClassName("pie4")[i]));
					if(pieList[i][0].length == 0){
			        	$(".pie4").eq(i).html(ejs.render(self.mosaic.include,{}))
			        	pie4.find(".j-civil-txt").eq(i).html("");
			        }else{
			        	pie[i].setOption(self.PieType(pieList[i][0],"55%",['#20385c','#4298ef','#c0d8fa']));
			        	pie4.find(".rates").eq(i).html(pieList[i][1]);
			        }
			        if(pieList[i][2] == 1){
			        	pie4.find(".height").eq(i).html("高");
			        }else{
			        	pie4.find(".height").eq(i).html("低");
			        }
			    };
			    if(levelList[0][0] == 0){
		        	$(".m-level3").find(".civil").html(ejs.render(self.mosaic.include,{}))
		        	$(".m-level3").find(".j-civil-txt").html("")
		        }else{
		        	this.level($(".m-level3"),levelList,0)
		        }
			}
			this.hideEmptyDataForMobile();
		},
		ajaxList_1: function(json){
			var self = this;
			if(!!json){
				var data = (typeof json == 'object') ? json : JSON.parse(json);
				self.element.$caseNav.find("li").remove();
				self.element.$caseNav.html(ejs.render(self.mosaic.caseNav,{data:data}));
				self.element.$caseList.html(ejs.render(self.mosaic.caseList,{data:data}));
				for (var i = 0; i < $(".case-nav li").length; i++) {
	            	if($(".case-nav li").eq(i).attr("id") == self.defaultData.caseId){
	            		$(".case-nav li").eq(i).addClass('active').siblings('li').removeClass('active');
	            	}
	            }
	            //self.defaultData.totalSize= data.totalSize;
	            if(self.testing.callback == true){
					self.initPagination(self.defaultData.totalSize);
					self.testing.callback = false;
				}
			}
		},
		sortDataListByValue: function(data) {
			var total = 0;
			for (var i=0; i<data.length; i++) {
					total += parseInt(data[i].value);
			}
			for (var i=0; i<data.length; i++) {
					data[i].percentage = Math.round(data[i].value*10000/total)/100;
			}

			var sorted = data.slice(0);
			sorted.sort(function(a,b){
				return b.value - a.value;
			})

			return sorted;
		},

		onPurchaseBtnClicked: function() {
			var userIP = "";
			$.ajax({
				url: "http://freegeoip.net/json/",
				type: "get",
				async: false,
				dataType: "json",
			}).done(function(data){
				userIP = data.ip;
			})
			$.ajax({
				url: '../../purchase_report.php',
				type: 'POST',
				data: {
					paper_id : App.prototype.paperId,
					case_id: App.prototype.caseId,
					user_ip: userIP,
				},
			})
			.done(function(data){
			})
			.fail(function() {
				console.log("error")
			})
			.always(function() {
				console.log("complete");
			});

		}

	}
    var start = new App();
    return start;
});
