define(["jquery","jqueryMigrate","bootstrap3","ejs","pagination"],function($){
	var App = function(){
		if (history.state == null) {
		this.selector = {
			caseDes: "",//案情描述
			caseTypeBox: [],//案情类型ID库
			caseType:[],//案情类型
			disputeArr:[],//争议焦点库
			caseTypeName:"",//案情类型名称
			regionId: "",//地区Ｉd
			involvedMoney: "",//涉案金额
			pageNum : 0,//页数
			totalSize: 0,//总页数
			second_reason: "",
			reasonClass: 1
		};
	} else {
		var state = history.state;
		this.selector = {
			caseDes: state.caseDes,//案情描述
			caseTypeBox: state.caseTypeBox,//案情类型ID库
			caseType:state.caseType,//案情类型
			disputeArr:state.disputeArr,//争议焦点库
			caseTypeName:state.caseTypeName,//案情类型名称
			regionId: state.regionId,//地区Ｉd
			involvedMoney: state.involvedMoney,//涉案金额
			pageNum : state.pageNum,//页数
			totalSize: state.totalSize,//总页数
		};
	}
	};
	App.prototype = {

		constructor : App,

		init: function(){
			var self = this;
			
			//$('#lawyerList').remove();
			var prov;
			var city;
			if (history.state != null) {
					prov = history.state.provName;
					city = history.state.cityName;
			} else {
				window.ADDR = window.ADDR || {"ip":"","provId":"","provName":"全国","cityId":"","cityName":"不限"};
				prov = window.ADDR.provName || '';
				city = window.ADDR.region;
			}
			this.element = {
				$caseTips: $("#caseTips"),//案例描述
				$tipsSure: $("#tipsSure"),//完成输入
				$caseTypeBox: $(".m-case-type"),//案件类型
				$recommend: $("#recommend"),//开始推荐律师
				$order: $(".order input"),//其他争议
				$dataList: $("#lawyerList"),//律师列表
				$revert: $("#revert"),//返回案情
				$involved: $(".u-involved input"),//涉案金额
				$province: $(".u-province"),//省份
				$region: $(".m-region"),//城市
				$scrollTop: $("#scroll-top"),//返回顶部
				$provName : prov,
				$cityName : city,
			};

			this.testing = {
				caseType: false,
				provinceId: false,
				cityId: false,
				callback: false,
				type: false,
			};

			// if (history.state != null)
			// {
			// 	this.showLastResult();
			// 	$('#lawyerList').children().remove();
			// 	$('#Pagination').remove();
			// }else {
				$(".g-lawyer").show();
			// }
			this.mosaic = {
				img:[
					'<% if(data){ %>',

					'<% } %>',
				].join(""),
				caseType:[
					'<div class="type">',
					'	<h3>根据您输入的案情，您的案件可能是以下类型，请选择：<span>(*必选)</span></h3>',
					'	<ul id="caseType">',
					'		<% var testing = false,num = [] %>',
					'		<% for (var i = 0; i < data.length; i++) {%>',
					'			<% if( i == 0 ){ %>',
					'				<li class="active"><span><i></i></span><%=data[i]["reason"]%></li>',
					'			<% }else{ %>',
					'				<li><span><i></i></span><%=data[i]["reason"]%></li>',
					'			<% }; %>',
					'		<% }; %>',
					'	</ul>',
					'</div>',
					// '<div class="dispute">',
					// '	<h3>在您选择的案件类型下有如下常见的纠纷点，选择后可以让搜索结果更准确，如果您已经输入的很完整了，可不选：</h3>',
					// '	<% for (var i = 0; i < data.reason_list.length; i++) {%>',
					// '	<% if( i == 0){ %>',
					// '		<div class="dispute-list" style="display:block">',
					// '	<% }else{ %>',
					// '		<div class="dispute-list">',
					// '	<% } %>',
					// '		<ul>',
					// '			<% for (var j = 0; j < data.reason_list[i][1].length; j++) {%>',
					// '				<li><%=data.reason_list[i][1][j]%></li>',
					// '			<% }; %>',
					// '		</ul>',
					// '		<div class="order"><input type="text" placeholder="请输入其他争议焦点，多个用空格隔开"></div>',
					// '	</div>',
					// '	<% }; %>',
					// '</div>',
				].join(""),
				lasyerList : [
					'<% for (var i = 0; i < data.dataList.length; i++) { %>',
					'<div class="m-synopsis container">',
					 '	<a href="details.html?id=<%=data.dataList[i].id%>&caseId=<%=data.dataList[i].similarCase.id%>" class="f-jump lawyer-record">',
					'		<div class="row">',
					//头像
					// '			<div class="m-portrait col-xs-3 col-sm-2">',
					// '					<% if(data.dataList[i].photoUrl == ""){ %>',
					// '						<img src="../images/default-mid.png" class="img-responsive img-rounded center-block" style="width:150px" alt="" />',
					// '					<% }else{ %>',
					// '						<img src="<%=data.dataList[i].photoUrl%>" class="img-responsive img-rounded center-block"  alt="" width="150px" />',
					// '					<% } %>',
					// '<% if (data.dataList[i].certification == 0) { %>',

					// '					<div class="validate center-block notValidate" style="border-radius: 6px; width:150px; max-width:100%">未认证</div>',
					// '				<% }else{ %>',
					// '					<div class="validate center-block" width="150px" style="max-width:100%"><i class="validate-ok"></i>已认证</div>',
					// '				<% } %>',
					// '			</div>',
					'			<div class="m-character col-xs-9 col-sm-10">',
					'				<h3><%=data.dataList[i].lawyerName%><span><%-data.dataList[i].lawyerInc%></span></h3>',
					'				<div class="u-line hidden-xs"></div>',
					'     </div>',
					'     <div class="m-character col-xs-12 col-sm-10">',

					'				<dl>',
					'					<dt>相关领域内办案数量：</dt>',
					'					<dd class="blod">',
					'					<% if(data.dataList[i].goodAtFieldList.length == 0){ %>',
					'						<span>暂无</span>',
					'					<%}else{ %>',
					'						<% for(var j = 0; j < data.dataList[i].goodAtFieldList.length; j++){ %>',
					'							<% if(data.dataList[i].goodAtFieldList[j].caseTypeName == typeName){ %>',
					'								<span><%=data.dataList[i].goodAtFieldList[j].caseTypeName%>(<%=data.dataList[i].goodAtFieldList[j].caseNum %>)</span>',
					'							<% } %>',
					'						<%} %>',
					'					<%} %>',
					'					</dd>',
					'					<dt>主要执业地：</dt>',
					'						<% if(data.dataList[i].mainWorkLoc == "" || data.dataList[i].mainWorkLoc == null){ %>',
					'							<dd>暂无</dd>',
					'						<%}else{ %>',
					'							<dd><%=data.dataList[i].mainWorkLoc%></dd>',
					'						<%} %>',
					// '					<dt>执业年限：</dt>',
					// '						<% if(data.dataList[i].workAge == "" || data.dataList[i].workAge == null){ %>',
					// '							<dd>暂无</dd>',
					// '						<%}else{ %>',
					// '							<dd><%=data.dataList[i].mainWorkLoc%></dd>',
					// '						<%} %>',
					'					<dt>承办案件最高涉案金额：</dt>',
					'						<% if(data.dataList[i].amountMax == "" || data.dataList[i].amountMax == null){ %>',
					'							<dd>暂无</dd>',
					'						<%}else{ %>',
					'							<dd><%=data.dataList[i].amountMax%>万</dd>',
					'						<%} %>',
					'				</dl>',
					'			</div>',
					'		</div>',

					'	</a>',
					'	<% if(data.dataList[i].similarCase != ""){ %>',
					'	<div class=""><div class="u-line col-xs-12 col-sm-10 col-sm-offset-2"></div></div>',
					'	<div class="m-case row">',
					'		<div class="col-xs-12 col-sm-10 col-sm-offset-2">',
					'			<dt>类似案件</dt>',
					'			<dd><a class="j-caseDetails" href="caseDetail.html?id=<%=data.dataList[i].similarCase.id%>&reason=<%=this.selector.second_reason%>&class=<%=this.selector.caseType%>" target="_blank"><%=data.dataList[i].similarCase.caseName%></a><span><%=data.dataList[i].similarCase.judgementDate%></span></dd>',
					'			<dd class="dispute">争议焦点：',
					'			<%if(data.dataList[i].similarCase.caseControversy.length == 0){%>',
					'				暂无',
					'			<%}else{%>',
					'				<%=data.dataList[i].similarCase.caseControversy%>',
					'			<%}%>',
					'			</dd>',
					'		</div>',
					'		<div class="u-similarity col-sm-offset-10">',
					'			<% if( data.dataList[i].similarCase.score <= 0.8){ %>',
					'				<p style="margin:0">相似度<span>极高</span></p>',
					'				<div class="grade"><span></span><span></span><span></span><span></span></div>',
					'			<% }else if(data.dataList[i].similarCase.score < 1.2 && data.dataList[i].similarCase.score > 0.8){ %>',
					'				<p>相似度<span class="green">高</span></p>',
					'				<div class="grade green"><span></span><span></span><span></span><span class="u-gray"></span></div>',
					'			<% }else if(data.dataList[i].similarCase.score >= 1.2){ %>',
					'				<p>相似度<span class="org">低</span></p>',
					'				<div class="grade org"><span></span><span></span><span class="u-gray"></span><span class="u-gray"></span></div>',
					'			<% } %>',
					'		</div>',
					'	</div>',
					'	<% } %>',
					'</div>',
					'<% } %>',
				].join(""),
				lasyerList2 : [
					'<% for (var i = 0; i < data.data.length; i++) { %>',
					'<div class="m-synopsis container">',
					 '	<a href="details.html?name=<%=encodeURI(data.data[i].name)%>&location=<%=encodeURI(data.data[i].location)%>&typeName=<%=data.typeName%>&class=<%=data.caseType%>" class="f-jump lawyer-record">',
					'		<div class="row">',
					//'			<div class="m-portrait col-xs-3 col-sm-2">',
					//头像
					// '					<% if(!data[i].photoUrl){ %>',
					// '						<img src="./source/images/index/default-mid.png" class="img-responsive img-rounded center-block" style="width:150px" alt="" />',
					// '					<% }else{ %>',
					// '						<img src="<%=data[i].photoUrl%>" class="img-responsive img-rounded center-block"  alt="" width="150px" />',
					// '					<% } %>',
					// '<% if (data[i].certification == 0) { %>',

					// '					<div class="validate center-block notValidate" style="border-radius: 6px; width:150px; max-width:100%">未认证</div>',
					// '				<% }else{ %>',
					// '					<div class="validate center-block" width="150px" style="max-width:100%"><i class="validate-ok"></i>已认证</div>',
					// '				<% } %>',
					//'			</div>',
					'			<div class="m-character col-xs-12 col-sm-10">',
					'				<h3><%=data.data[i].name%><span><%-data.data[i].lawyerInc%></span></h3>',
					'				<div class="u-line hidden-xs"></div>',
					'     </div>',
					'     <div class="m-character col-xs-12 col-sm-10">',

					'				<dl>',
					'					<dt>案由：</dt>',
					'						<% if(!data.typeName){ %>',
					'							<dd>暂无</dd>',
					'						<%}else{ %>',
					'							<dd><%=data.typeName%></dd>',
					'						<%} %>',
					'					<dt>相关领域内办案数量：</dt>',
					'					<dd class="blod">',
					'					<% if(data.data[i].num == 0){ %>',
					'						<span>暂无</span>',
					'					<%}else{ %>',
					'						<span><%=data.data[i].num %></span>',
					'					<%} %>',
					'					</dd>',
					'					<dt>律师事务所：</dt>',
					'						<% if(data.data[i].location == ""){ %>',
					'							<dd>暂无</dd>',
					'						<%}else{ %>',
					'							<dd><%=data.data[i].location%></dd>',
					'						<%} %>',
					// '					<dt>执业年限：</dt>',
					// '						<% if(data.data[i].workAge == "" || data[i].workAge == null){ %>',
					// '							<dd>暂无</dd>',
					// '						<%}else{ %>',
					// '							<dd><%=data.data[i].mainWorkLoc%></dd>',
					// '						<%} %>',
					'				</dl>',
					'			</div>',
					'		</div>',

					'	</a>',
					// '	<% if(data[i].similarCase != ""){ %>',
					// '	<div class=""><div class="u-line col-xs-12 col-sm-10 col-sm-offset-2"></div></div>',
					// '	<div class="m-case row">',
					// '		<div class="col-xs-12 col-sm-10 col-sm-offset-2">',
					// '			<dt>类似案件</dt>',
					// '			<dd><a class="j-caseDetails" href="case-detail.html?id=<%=data[i].similarCase.id%>" target="_blank"><%=data.dataList[i].similarCase.caseName%></a><span><%=data.dataList[i].similarCase.judgementDate%></span></dd>',
					// '			<dd class="dispute">争议焦点：',
					// '			<%if(data[i].similarCase.caseControversy.length == 0){%>',
					// '				暂无',
					// '			<%}else{%>',
					// '				<%=data[i].similarCase.caseControversy%>',
					// '			<%}%>',
					// '			</dd>',
					// '		</div>',
					// '		<div class="u-similarity col-sm-offset-10">',
					// '			<% if( data[i].similarCase.score <= 0.8){ %>',
					// '				<p style="margin:0">相似度<span>极高</span></p>',
					// '				<div class="grade"><span></span><span></span><span></span><span></span></div>',
					// '			<% }else if(data[i].similarCase.score < 1.2 && data[i].similarCase.score > 0.8){ %>',
					// '				<p>相似度<span class="green">高</span></p>',
					// '				<div class="grade green"><span></span><span></span><span></span><span class="u-gray"></span></div>',
					// '			<% }else if(data[i].similarCase.score >= 1.2){ %>',
					// '				<p>相似度<span class="org">低</span></p>',
					// '				<div class="grade org"><span></span><span></span><span class="u-gray"></span><span class="u-gray"></span></div>',
					// '			<% } %>',
					// '		</div>',
					// '	</div>',
					// '	<% } %>',
					'</div>',
					'<% } %>',
				].join(""),
				province:[
					'<ul class="all-box f-clear"><li>全国</li></ul>',
					'<ul class="f-clear">',
					'	<li id="<%=data["2000000"][0].i%>"><%=data["2000000"][0].n%></li>',
					'	<li id="<%=data["10000000"][0].i%>"><%=data["10000000"][0].n%></li>',
					'	<li id="<%=data["3000000"][0].i%>"><%=data["3000000"][0].n%></li>',
					'	<li id="<%=data["23000000"][0].i%>"><%=data["23000000"][0].n%></li>',
					'</ul>',
					'<ul class="provList f-clear">',
					'	<% for (var i = 0; i < data["0"].length; i++) { %>',
					'		<% if(data["0"][i].n!= "北京" && data["0"][i].n!= "上海" && data["0"][i].n!= "天津" && data["0"][i].n!= "重庆" && data["0"][i].n!= "兵团"){ %>',
					'			<li id="<%=data["0"][i].i%>"><%=data["0"][i].n%></li>',
					'		<% }; %>',
					'	<% }; %>',
					'</ul>',
				].join(""),
				city:[
					'<ul class="all-box f-clear"><li>不限</li></ul>',
					'<ul class="provList f-clear">',
					'	<% for (var i = 0; i < data[id].length; i++) {%>',
					'		<li id="<%=data[id][i].i%>"><%=data[id][i].n%></li>',
					'	<% }; %>',
					'</ul>',
				].join(""),
			}
			this.bindEvent();
			if (history.state == null) {
				$(".j-prov").html(this.element.$provName);
				$(".j-city").html(this.element.$cityName);
				this.ajaxRegion(self.provAjax);
				this.ajaxRegion(self.cityAjax);
			}
		},


		bindEvent: function(){
			this.element.$caseTips.on("keyup",this.getCase.bind(this));
			this.element.$caseTips.on("click",this.gethide.bind(this));
			this.element.$caseTips.on("paste",this.getPaste.bind(this));
			this.element.$tipsSure.on("click",this.tipsSure.bind(this));
			this.element.$recommend.on("click",this.searchLaw.bind(this))
			this.element.$caseTypeBox.on("click","#caseType li",this.chooseType.bind(this));
			this.element.$caseTypeBox.on("click",".dispute-list li",this.chooseDispute.bind(this));
			this.element.$caseTypeBox.on("click","#criminal li",this.chooseIdDispute.bind(this));
			this.element.$dataList.on("click",".f-jump",this.setLocal.bind(this));
			this.element.$revert.on("click",this.modifyCase.bind(this));
			this.element.$involved.on("click",this.involvedColor.bind(this));
			this.element.$involved.on("keyup",this.involved.bind(this));
			this.element.$province.on("click",".s-province",this.region.bind(this))
			this.element.$region.on("click","li",this.regionList.bind(this))
			this.element.$scrollTop.on("click",this.scrollTop.bind(this));
			$(document).click(function(){
				$(".s-province").removeClass('show');
				$(".u-involved input").css("border-color","#E6E6E6");
			})

			var he = $(window).height() - 203;
		    $('.g-body').css({
		    	"min-height" : he+"px",
		    });
		},
		replaceBrowserHistory: function() {
			var state = this.selector;
			var htmls = {
				caseType: this.element.$caseTypeBox.html(),
				caseTypeShow: this.element.$caseTypeBox.hasClass('show'),
				lawyerList: $(".g-lawyer-list").html(),
				province: this.element.$province.html(),
				caseTips: this.element.$caseTips.val(),
				orderInput: $(".order input").val(),
				topHeight: $(window).scrollTop(),
				provName: this.element.$provName,
				cityName: this.element.$cityName
			};


			$.extend(state, htmls);
				 if (history.state == null) {
					 window.history.pushState(state, "test", "");
				 } else {
				 window.history.replaceState(state, "title", "");
			 }
		},
		showLastResult: function() {
			console.log('1111111111')
			$(".g-lawyer-list").html(history.state.lawyerList);
			$(".g-lawyer-list").show();

			this.element.$caseTypeBox.html(history.state.caseType);
			if (history.state.caseType == true) {
				this.element.$caseTypeBox.show();
			}
			this.element.$province.html(history.state.province);
			this.element.$caseTips.val(history.state.caseTips);
			this.element.$region = $(".m-region");
			this.getCase();



			$(".order input").val(history.state.orderInput);

			$(".g-return").show();
			this.displayResult();
			$(".j-random").html($(".m-synopsis").length);
			window.scrollTo(0,history.state.topHeight);

		},
		getCase: function(){
			var tipsSure = this.element.$tipsSure;//完成输入按钮
			var caseTipsVal = this.element.$caseTips.val()//获取案情描述的值
			this.selector.regionId = $(".j-city").attr("id")
			if(caseTipsVal.length > 0){
				tipsSure.addClass('active')
				$("#recommend").addClass('btn-success')
			}else{
				tipsSure.removeClass('active')
				$("#recommend").removeClass('btn-success')
				this.element.$caseTypeBox.hide();
				this.testing.caseType = false;
			}
		},
		gethide:function(){
			this.element.$caseTypeBox.hide();
			this.element.$caseTypeBox.removeClass('show')
		},
		getPaste: function(){
			var self = this;
			setTimeout(function() {
				$('#tipsSure').addClass('active')
				$("#recommend").addClass('btn-success')
				self.element.$caseTypeBox.hide();
				self.element.$caseTypeBox.removeClass('show')
			},100);
		},
		tipsSure: function(e){
			e.preventDefault();
			var $el = $(e.target).closest("a");
			var caseTipsVal = this.element.$caseTips.val();
			this.selector.disputeArr = [];
			//this.selector.disputeArr.push(caseTipsVal);
			if($el.hasClass('active')){
				// $("#recommend").addClass('btn-success')
				this.element.$caseTypeBox.show();
				this.selector.caseDes= this.selector.disputeArr.join(",");
				this.selector.caseDes= caseTipsVal;
				this.testing.type = true;
				this.ajaxType();
			}
			this.element.$caseTypeBox.addClass('show')
		},
		chooseType: function(e){
			e.preventDefault();
			var self = this;
			var $el = $(e.target).closest("li");
			var num = $el.index();
			$el.addClass('active').siblings().removeClass('active');
			this.selector.disputeArr = [];
			if($el.hasClass('active')){
				this.selector.caseType = this.selector.caseTypeBox[num];
				$(".dispute").show();
				$(".dispute-list").eq(num).show().siblings(".dispute-list").hide();
				this.testing.caseType = true;
				$(".choose-tips").html("（可不选）")
				this.selector.caseTypeName = $el.text()
			}
			if($el.text() == "刑事"){
				$(".dispute-list").eq(num).attr("id","criminal");
				$("#criminal").find('.order').hide();
				$(".choose-tips").html("（单选）")
			}
		},
		chooseDispute: function(e){
			e.preventDefault();
			var $el = $(e.target).closest("li");
			if($el.hasClass('active')){
				var coordinate = this.selector.disputeArr.indexOf($el.html());
				$el.removeClass('active');
				this.selector.disputeArr.splice(coordinate,1);
			}else{
				$el.addClass('active');
				this.selector.disputeArr.push($el.html());
			}
		},
		chooseIdDispute: function(e){
			e.preventDefault();
			var $el = $(e.target).closest("li");
			$el.addClass('active').siblings('li').removeClass('active');
			if($el.hasClass('active')){
			}else{
				this.selector.caseDes= this.selector.caseDes + $el.html() + ",";
			}
		},
		searchLaw: function(e){
			var self = this;
			e.preventDefault();
			var $el = $(e.target).closest(".btn-default");
			var caseTipsVal = this.element.$caseTips.val();
			this.selector.caseDes = "";
			var order = $(".order input").val();
			//if($el.hasClass('btn-success')){
				if( order!= ""){
					this.selector.disputeArr.push(order);
				}
				//this.selector.involvedMoney = $(".u-involved input").val().replace(/(\,+?)/g,"");
				$(".g-lawyer").hide();
				$(".g-return").show();
				if(this.element.$caseTypeBox.hasClass('show')){

					this.selector.disputeArr.unshift(caseTipsVal)
					self.selector.caseDes= this.selector.disputeArr.join(",");
					$(".g-loding").fadeIn(1000,function(){
						self.ajax(0,self.selector.caseTypeName,self.selector.caseType);
						//self.initPagination();
					});
				}else{

					this.selector.caseDes = caseTipsVal;
					$(".g-loding").fadeIn(1000,function(){
						self.ajaxType();
					});
				}

			//}
		},
		modifyCase: function(){
			$(".g-lawyer").show();
			$(".g-return").hide();
			$(".g-lawyer-list").hide();
			$(".scroll-top").hide();
			$(".g-loding").hide();
			this.element.$caseTypeBox.hide();
			this.element.$caseTypeBox.removeClass('show');
		},
		involved: function(e){
			e.preventDefault();
			var $el = $(e.target).closest('input');
			var txt = "";
			var val = $el.val().toString().replace(/(\,+?)/g,"")
			for( var i = val.length-1; i >= 0 ; i--){
				txt = val[i]+txt;
				if((val.length-i+3) % 3 == 0 && i){
					txt = ","+txt;
				}
			}
			$el.val(txt)
		},

		involvedColor: function(e){
			e.stopPropagation();
			var $el = $(e.target).closest('input');
			$el.css({
				"border-color":"#64CC8E",
			})
		},
		setLocal:function(e){
			var $el = $(e.target).closest('.f-jump')
			var caseName = $el.siblings('.m-case').find(".j-caseDetails").html();
			localStorage.caseName = caseName;
		},
		region: function(e){
			e.stopPropagation();
			var self = this;
			var $el = $(e.target).closest('.s-province');
			if($el.hasClass('show')){
				$el.removeClass('show');
				this.testing.prov = false;
			}else{
				if($el.data("prov") == "prov"){
					this.ajaxRegion(self.provAjax);
					$el.addClass('show').siblings('.s-province').removeClass('show')
				}else{
					if($(".j-prov").html() == "全国"){
						$el.removeClass('show');
					}else{
						$el.addClass('show').siblings('.s-province').removeClass('show')
						this.ajaxRegion(self.cityAjax);
						this.selector.regionId = $(".j-prov").html();
					}
				}
			}
		},
		regionList: function(e){
			e.preventDefault();
			e.stopPropagation();
			var $el = $(e.target).closest('li');
			if($el.parents(".m-region").hasClass('prov-pop')){
				$(".j-prov").html($el.html());
				$(".j-prov").attr("id",$el.attr("id"));
				$(".prov-pop").parents(".s-province").removeClass('show');
				$(".j-city").html("不限");
				$(".j-city").attr("id","");
				this.selector.regionId = $(".j-prov").attr("id");
				if($el.html() == "全国"){
					this.selector.regionId = "";
				}
			}else{
				$(".j-city").html($el.html());
				$(".j-city").attr("id",$el.attr("id"));
				$(".city-pop").parents(".s-province").removeClass('show');
				this.selector.regionId = $(".j-city").attr("id");
				if($el.html() == "不限"){
					this.selector.regionId = $(".j-prov").attr("id");
				}
			}
		},
		initPagination : function(totalSize) {
			var self = this;
			console.log('totalSize',totalSize);
			$("#Pagination").pagination(totalSize, {
				num_edge_entries: 1, //边缘页数
				num_display_entries: 4, //主体页数
				callback: self.pageselectCallback.bind(this),
				items_per_page: 1, //s每页显示1项
				prev_text: "<<",
				next_text: ">>"

			});
		},
		pageselectCallback: function(index,jq){
			console.log('index',index);
			var self = this;
			var num = index - 1;
			if(self.testing.callback == true){
				$(".g-lawyer-list").hide();
				$(".g-return").show();
				$(".g-loding2").fadeIn(100,function(){
					self.ajax(num+1)
				});
			}
		},
		scrollTop: function () {
	        var speed=200; //滑动的速度
	        $('body,html').animate({ scrollTop: 0 }, speed);
	        return false;
		},

		ajaxRegion: function(callback) {
			var self = this;
			$.ajax({
				url: 'source/js/loc.json',
				type: 'GET',
				dataType: 'json',
				data: {},
			})
			.done(callback.bind(this))
			.fail(function() {
				console.log("type-erro");
			})
			.always(function() {
				console.log("complete");
			});
		},
		ajaxType: function() {
			var self = this;
			var data = {
					text: self.selector.caseDes
			};
			$.ajax({
					url: 'http://47.92.38.167:8889/feature_query/case_type',
				type: 'POST',
				dataType: 'json',
				data: JSON.stringify(data)

			})
			.done(function(json) {
				var data = (typeof json == 'object') ? json.data : JSON.parse(json).data
				if(!!json){
					if(data.length == 0){
						$(".m-blurring-pop").show();
						$(".m-blurring").show();
						$(".m-choose h6").hide();
						$(".m-choose .u-tips").hide();
						$(".m-case-type").hide();
					}else{
						self.selector.caseTypeBox = [];
						self.element.$caseTypeBox.html(ejs.render(self.mosaic.caseType,{data : data[0]}));
						for( var i = 0; i < data.length; i++){
							self.selector.caseTypeBox.push(data[i][2]);
						}
						self.selector.caseTypeName = data[0]['reason'];
						self.selector.caseType = data[0]['sub_reason_class'];
						self.selector.second_reason = data[0]['second_reason'];
						if(self.element.$caseTypeBox.hasClass('show')){
							return;
						}else{
							//self.ajax(0,data[0][0],data[0][2]);
							self.ajax(0,data[0]['reason'],data[0]['second_reason'],data[0]['sub_reason_class']);
						}
					}
				}
			})
			.fail(function(jqXHR, textStatus) {
					console.log(jqXHR);
				console.log("type-erro");
			})
			.always(function() {
				console.log("complete");
			});
		},
		ajax: function(pageNum,typeName,second_reason,reason_class) {
			var self = this;
			console.log(pageNum,typeName,second_reason,reason_class);
			typeName = typeName || self.selector.caseTypeName;
			second_reason = second_reason || self.selector.second_reason;
			reason_class = reason_class || self.selector.caseType;
			var region = $('.j-city').text();
			var ajaxData = {
				"region": region,
				"page_num": pageNum+1,
				"page_count": 10,
				"reason": {}
			}
			if(this.selector.second_reason){
				ajaxData.reason = {
					'reason_2' : this.selector.second_reason
				};
			}else{
				ajaxData.reason['reason_2'] = second_reason;
				ajaxData.reason["reason_" + reason_class] = typeName;
				this.selector.caseType = reason_class;
			}
			this.selector['second_reason'] = ajaxData.reason['reason_2'];
			this.selector['caseType'] = reason_class;
			ajaxData.reason["reason_" + reason_class] = typeName;
			console.log('ajaxData',ajaxData);
			$.ajax({
					url: 'http://47.92.38.167:8889/static_query/lawyer_list',
				type: 'POST',
				dataType: 'json',
				data: JSON.stringify(ajaxData)
					// q:{
					// 	text: self.selector.caseDes,
					// 	keyWord:"",
					// 	orderBy:"",
					// 	amounts: self.selector.involvedMoney,
					// 	casetypename: typeName,//self.selector.caseTypeName,
					// 	filter:{
					// 		casetype: typeId,//self.selector.caseType,
					// 		court_id: self.selector.regionId,
					// 	},
					// 	pageNum : pageNum,
					// }
			})
			.done(self.successAjax.bind(this))
			.fail(function(jqXHR, textStatus) {
				console.log(jqXHR);

				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		},
		successAjax: function(json){
			console.log('json',json);
			var self = this;
			if(!!json){
				var data = (typeof json == 'object') ? json : JSON.parse(json)
				var dataList = $("#lawyerList");
				if(data.code != 0){
					alert("搜索没找到数据,请返回修改！");
					$(".g-loding").hide();
					$(".g-lawyer-list").hide();
					$(".g-return").hide();
					$(".g-lawyer").show();
				}else{
					//$(".g-loding").fadeOut(1000);
					$(".g-loding2").hide();
					$(".g-loding").hide();
					$(".g-lawyer-list").show();
					$(".scroll-top").show();
					console.log('self.selector["caseType"]',self.selector['caseType']);
					dataList.fadeIn(1000, function() {
                        console.log('typeName',self.selector.caseTypeName);
                        console.log('caseType',self.selector.caseType);

						data.typeName = self.selector.caseTypeName;
						data.caseType = self.selector.caseType;
						dataList.html(ejs.render(self.mosaic.lasyerList2,{data:data}));
						$("a.lawyer-record").on("click", self.replaceBrowserHistory.bind(self));
					});
					console.log('self.testing.callback',self.testing.callback);
					if(self.testing.callback == false){
						self.initPagination(data.max_page_num);
						self.testing.callback = true;
					}
					$(".j-random").html($(".m-synopsis").length);
					self.selector.totalSize = json.data.max_page_num;
				}
			}
		},
		displayResult: function(){
			$(".g-loding2").hide();
			$(".g-loding").hide();
			$(".g-lawyer-list").show();
			$(".scroll-top").show();
		},
		provAjax:function(json){
			var self = this;
			var data = (typeof json == 'object') ? json : JSON.parse(json)
			$(".prov-pop").html(ejs.render(self.mosaic.province,{data : data}))
			for(var i = 0; i < data["0"].length; i++){
				if(data["0"][i].n == self.element.$provName){
					$(".j-prov").attr("id", data["0"][i].i);
				};
			}
		},
		cityAjax:function(json){
			var self = this;
			var data = (typeof json == 'object') ? json : JSON.parse(json)
			var id = $(".j-prov").attr("id");
			$(".city-pop").html(ejs.render(self.mosaic.city,{data : data, id : id}))
			var c = this.element.$cityName || '';
			for (var i = 0; i < data[id].length; i++) {
				//var cityName = c.replace("市",'');
				//if(data[id][i].n == c){
					$(".j-city").attr("id", data[id][i].i)
				//}
			};
		}
	}
    var start = new App();
    return start;
});
