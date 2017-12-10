define(["jquery","ejs","common","highlighter","bootstrap3"],function(jquery){
	var App = function(){};
	var fetchData = {
		"result":{
			"code":0,
			"message":"成功"
		},
		"data":{
			"fullJudgement":{
				"id":"1fbf6648-da2a-471c-bc05-1db01a3125fd",
				"title":"杨德超与梁永江建设工程分包合同纠纷一审民事判决书",
				"caseType":"民事",
				"trialRound":"1",
				"judgementType":"判决",
				"caseNumber":"（2014）肥西民一初字第00513号",
				"judgementDate":"2014-10-20",
				"publishDate":"2017-04-03",
				"publishType":"0",
				"sourceUrl":"http://wenshu.court.gov.cn/content/content?DocID\u003df1c312d5-bd3c-49b7-a97b-c36777423464",
				"sourceName":"中国裁判文书网",
				"previousArea":0,
				"nextArea":0,
				"watched":false,
				"canAddExperience":false,
				"sourceType":1,
				"court":{
					"id":"1197",
					"name":"肥西县人民法院",
					"type":"court"},
					"reason":{
						"id":"2131",
						"name":"建设工程分包合同纠纷",
						"type":"reason"
					},
					"keywords":["工程分包"],
					"judges":[
						{"id":"274233","name":"谢守福","type":"judge"},
						{"id":"75215","name":"王芳","type":"judge"}
					],
					"proponents":[
						{"id":"481900","name":"杨德超","type":"litigant"}
					],
					"opponents":[
						{"id":"1883185","name":"梁永江","type":"litigant"}
					],
					"proponentLawyers":[
						{"name":"蔚应海","lawFirm":"安徽原声律师事务所","originalLawyerName":"蔚应海","originalLawFirm":"安徽原声律师事务所","isClaimed":false,"status":4}
					],
					"paragraphs":[
						{
							"type":0,
							"typeText":"当事人信息",
							"subParagraphs":[{"text":"原告杨德超，男，1971年12月26日出生，汉族，住安徽省涡阳县。","number":5},{"text":"委托代理人蔚应海，安徽原声律师事务所律师。","number":6},{"text":"被告梁永江，男，1970年8月27日出生，汉族，住安徽省。","number":7}]
						},
						{
							"type":1001,
							"typeText":"审理经过",
							"subParagraphs":[{"text":"原告杨德超与被告梁永江建设工程分包合同纠纷一案，本院受理后，依法组成合议庭，公开开庭进行了审理。原告杨德超及其委托代理人蔚应海到庭参加诉讼，被告梁永江经本院公告传唤未到庭，本院依法缺席审理。本案现已审理终结。","number":8}]
						},
						{
							"type":1002,
							"typeText":"原告诉称",
							"subParagraphs":[{"text":"原告杨德超诉称：2011年11月份，被告梁永江承包安徽省颍上县解放北路的“好旺角娱乐会所”楼梯亮化工程。后梁永江将该工程转包给原告杨德超施工。工程完工后，经验收合格并由业主单位结算且投入使用，但对于原告施工应得的工程款，被告梁永江一直不向原告支付。2012年1月20日，经双方结算，被告梁永江将未支付的工程款给原告出具《欠条》一份，并明确了还款日期，现还款期限已到，被告梁永江至今未向原告支付该款项。为维护其合法权益，原告诉讼来院，请求法院依法判令：被告梁永江立即偿还所欠原告工程款26200元，并自起诉之日起按银行同期贷款利率的四倍支付逾期付款利息至款项实际付清之日止；同时，本案的诉讼费用由被告承担。","number":9}]
						},{
							"type":1003,
							"typeText":"被告辩称",
							"subParagraphs":[{"text":"被告梁永江未到庭，亦未提交书面答辩意见。","number":10}]
						},{
							"type":1004,
							"typeText":"本院查明",
							"subParagraphs":[{"text":"经审理查明：2012年1月20日，被告梁永江向原告杨德超出具《欠条》一份，载明欠杨德超工程款26200元，并在欠条上备注此款于二0一三年正月初十归还。","number":11},{"text":"上述事实有原告的当庭陈述及其提供的《欠条》原件附卷佐证，客观真实，对其证明效力予以确认。","number":12},{"text":"本院认为：被告梁永江经本院依法传唤未到庭参加诉讼，视为放弃质证和抗辩的权利。本案中，原告杨德超主张被告梁永江归还欠付工程款，向法庭提供了由梁永江出具的《欠条》原件附卷佐证，该《欠条》上明确了欠付款项为工程款，欠付金额为26200元的事实，并确定了还款期限。原告杨德超至今持有该欠条，足以说明梁永江欠付杨德超工程款未还的事实清楚，证据确凿充分，本院予以确认。由此，对于杨德超要求梁永江归还26200元工程款的诉请，本院依法予以支持。","number":13}]
						},{
							"type":1005,
							"typeText":"本院认为",
							"subParagraphs":[{"text":"关于原告杨德超要求被告梁永江自起诉之日起按银行同期贷款利率的四倍支付利息至款项付清之日止的诉请，原告杨德超提供的《欠条》上未注明支付利息，根据最高人民法院\u003ca target\u003d\u0027_blank\u0027 href\u003d\u0027https://www.itslaw.com/search/lawsAndRegulations/lawAndRegulation?searchMode\u003dlawsAndRegulations\u0026lawAndRegulationId\u003d52cb11b6-850b-4a22-917d-2981d63cfed8\u0026lawRegulationArticleId\u003d1000296821\u0027\u003e《关于审理建设工程施工合同纠纷案件适用法律问题的解释》第十七条\u003c/a\u003e的规定，当事人对欠付工程款利息计付标准有约定的，按照约定处理；没有约定的，按照中国人民银行发布的同期同类贷款利率计息。故原告杨德超要求被告梁永江按银行同期贷款利率的四倍支付其利息，缺乏事实及法律依据，本院不予支持，但其要求支付利息的标准可按中国人民银行发布的同期同类贷款利率计算。对于支付利息的起算日期，被告虽在欠条上注明支付工程款的具体时间，但原告自愿以起诉之日作为主张支付利息的起算日期，本院依法予以准许。综上，被告梁永江支付原告杨德超工程款26200元，并自2014年1月20日（起诉之日）起按中国人民银行发布的同期同类贷款利率支付逾期付款利息。据此，依照\u003ca target\u003d\u0027_blank\u0027 href\u003d\u0027https://www.itslaw.com/search/lawsAndRegulations/lawAndRegulation?searchMode\u003dlawsAndRegulations\u0026lawAndRegulationId\u003d9ec6644d-60c4-4d74-a64c-06c673895914\u0026lawRegulationArticleId\u003d1000021692\u0027\u003e《中华人民共和国合同法》第一百零九条\u003c/a\u003e，最高人民法院\u003ca target\u003d\u0027_blank\u0027 href\u003d\u0027https://www.itslaw.com/search/lawsAndRegulations/lawAndRegulation?searchMode\u003dlawsAndRegulations\u0026lawAndRegulationId\u003d52cb11b6-850b-4a22-917d-2981d63cfed8\u0026lawRegulationArticleId\u003d1000296821\u0027\u003e《关于审理建设工程施工合同纠纷案件适用法律问题的解释》第十七条\u003c/a\u003e，\u003ca target\u003d\u0027_blank\u0027 href\u003d\u0027https://www.itslaw.com/search/lawsAndRegulations/lawAndRegulation?searchMode\u003dlawsAndRegulations\u0026lawAndRegulationId\u003dd67a7d01-f233-4bfc-9227-b8cef1d4196b\u0026lawRegulationArticleId\u003d1000385224\u0027\u003e《中华人民共和国民事诉讼法》第一百四十四条\u003c/a\u003e之规定，判决如下：","number":14}]
						},{
							"type":1006,
							"typeText":"裁判结果",
							"subParagraphs":[{"text":"一、被告梁永江于本判决生效后十日内一次性支付原告杨德超工程款26200元，并以26200元为基数自2014年1月20日起按中国人民银行发布的同期同类贷款利率支付利息至本生效判决确定的履行期限届满之日止；","number":15},{"text":"二、驳回原告杨德超的其他诉讼请求。","number":16},{"text":"案件受理费455元，由被告梁永江负担。","number":17},{"text":"如果未按本生效判决指定的期间履行给付金钱义务，应当依照\u003ca target\u003d\u0027_blank\u0027 href\u003d\u0027https://www.itslaw.com/search/lawsAndRegulations/lawAndRegulation?searchMode\u003dlawsAndRegulations\u0026lawAndRegulationId\u003dd67a7d01-f233-4bfc-9227-b8cef1d4196b\u0026lawRegulationArticleId\u003d1000385579\u0027\u003e《中华人民共和国民事诉讼法》第二百五十三条\u003c/a\u003e之规定，加倍支付迟延履行期间的债务利息。","number":18},{"text":"如不服本判决，可在判决书送达之日起十五日内，向本院递交上诉状，并按对方当事人的人数提出副本，上诉于安徽省合肥市中级人民法院。","number":19}]
						},{
							"type":9001,
							"typeText":"审判人员",
							"subParagraphs":[{"text":"审判长王芳","number":20},{"text":"审判员谢守福","number":21},{"text":"人民陪审员周虎","number":22}]
						},{
							"type":9002,"typeText":"裁判日期","subParagraphs":[{"text":"二〇一四年十月二十日","number":23}]
						},{
							"type":9003,
							"typeText":"书记员",
							"subParagraphs":[{"text":"书记员陆莉（代）","number":24}]
						}
					],
					"judgementExperienceInfos":[],
					"regulationGroupByTrialRoundInfos":[
						{
							"trialRoundText":"一审",
							"regulations":[
								{"id":"1000296821","text":"《最高人民法院关于审理建设工程施工合同纠纷案件适用法律问题的解释》第十七条","judgementCount":37391,"sectionParagraphs":[{"text":"第十七条","isHit":false,"type":44},{"text":"当事人对欠付工程价款利息计付标准有约定的，按照约定处理；没有约定的，按照中国人民银行发布的同期同类贷款利率计息。","isHit":true,"type":45}]},
								{"id":"1000021692","text":"《中华人民共和国合同法》第一百零九条","judgementCount":526561,"sectionParagraphs":[{"text":"第一百零九条","isHit":false,"type":44},{"text":"【金钱债务的违约责任】当事人一方未支付价款或者报酬的，对方可以要求其支付价款或者报酬。","isHit":true,"type":45}]}
							]
						}
					],
					"canAddCaseAnalysis":true,
					"originalProponentLawyers":[
						{
							"lawyerInfo":{"id":"68872","name":"蔚应海","type":"lawyer"},
							"lawFirmInfo":{"id":"2134","name":"安徽原声律师事务所","type":"lawFirm"}
						}
					],
					"temporarySearchReport":false,
					"courtSimilarJudgementTypes":[1,2,3],
					"corrections":false
				}
			}
		}
	App.prototype = {
		paperId: getQueryString('id'),
		constructor : App,

		init: function(){
			this.element = {
				$detailNav: $("#detail-nav"),
				$file: $("#file"),
				$caseLawyer: $("caseLawyer"),
				$scrollTop: $("#scroll-top"),
				$lawList: $(".lawyer-list"),
				$detailsNavBtn: $('#details-nav-btn'),
			};

			this.api = {

			};
			this.mosaic = {
				detailNav : [
					'<ul>',
	                '   <li><i></i></li>',
	                '	<% for (var i = 0 , n = 0; i < data.tags.length; i++) { %>',
	                '		<% if(data.tags[i] == "文件名" || data.tags[i] == "提交时间" || data.tags[i] == "案号" || data.tags[i] == "文书名" || data.tags[i] == "other"){ %>',
					'			<% continue %>',
					'		<% } %>',
					'		<% if(data.tags[i] !== lastTag.n){ %>',
					'			<% n++ %>',
					'			<% lastTag.n = data.tags[i] %>',
					'			<% if(n == 1){ %>',
					'   			<li class="nav-active list-group-item" id="Title-<%=n%>-nav"><a href="#Title-<%=n%>" class="nav-txt"><%=lastTag.n%></a><span><b></b></span></li>',
					'			<% }else{ %>',
	                '   			<li id="Title-<%=n%>-nav" class="list-group-item"><a href="#Title-<%=n%>" class="nav-txt"><%=lastTag.n%></a><span><b></b></span></li>',
	                '			<% } %>',
	                '		<% } %>',
	                '	<% } %>',
	                '</ul>',
				].join(""),

				fileTxt: [
                    '<h1 id="file-name"><%=data.title%></h1>',
                    '<h6>来源：中国裁判文书网<!--<span>浏览：350</span>--></h6>',
                    '<div class="u-line"></div>',
                    '<div class="m-title">审判流程</div>',
                    '<div class="m-time">',
                    '	<ul clas="f-clear" style="width:<%=parseInt(data.timeline.length * 135)-80%>px">',
                    '	<% for (var i = 0; i < data.timeline.length; i++) {%>',
                    '		<% var date = new Date(data.timeline[i][0]) %>',
                    '		<% if(data.timeline[i][1] == "判决"){ %>',
                    '       	<li class="active">',
                    '          	 <p><%=date.getMonth()+1%>月<%=date.getDate()%>日</p>',
                    '           	<p><%=date.getFullYear()%>年</p>',
                    '           	<span class="u-circle"></span>',
                    '           	<h5><%=data.timeline[i][1]%></h5>',
                    '       	</li>',
                    '		<% }else{ %>',
                    '       	<li>',
                    '          	 <p><%=date.getMonth()+1%>月<%=date.getDate()%>日</p>',
                    '           	<p><%=date.getFullYear()%>年</p>',
                    '           	<span class="u-circle"></span>',
                    '           	<h5 title="<%=data.timeline[i][1]%>"><%=data.timeline[i][1]%></h5>',
                    '       	</li>',
                    '		<% } %>',
                    '	<% } %>',
                    '    </ul>',
                    '	<div class="j-control region-left"><span><i>&#xe609;</i></span></div>',
					'	<div class="j-control region-right"><span><i>&#xe608;</i></span></div>',
                    '</div>',
                    '<div class="m-title">文书摘要</div>',
                    '<div class="m-abstract">',
					'    <% if(data.case_summary.length != 0) {%>',
					' 	<% for (var i=0; i<data.case_summary.length; i++) { %>',
					'			<p><%=data.case_summary[i]%>...</p>',
					'			<% } %>',
					'	 <% } else { %>',
                    '    <dl>',
                    '			<% if(data.appealPlaintiff.length != 0 || data.appealDefendant.length !=0){ %>',
                    '        <dt>诉讼请求</dt>',
                    '        <dd>',
                    '			<% if(data.appealPlaintiff.length != 0){ %>',
                    '           <div class="plaintiff f-pr"><i>原告</i>',
                    '				<% for (var i = 0; i < data.appealPlaintiff.length; i++) { %>',
                    '					<span><%=data.appealPlaintiff[i]%></span>',
                    '				<% }; %>',
                    '			</div>',
                    '			<% }; %>',
                    '			<% if(data.appealDefendant.length != 0){ %>',
                    '           <div class="defendant f-pr"><i>被告</i>',
                    '				<% for (var i = 0; i < data.appealDefendant.length; i++) { %>',
                    '					<span><%=data.appealDefendant[i]%></span>',
                    '				<% }; %>',
                    '			</div>',
                    '			<% }; %>',
                    '        </dd>',
                    '			<% }; %>',
                    '			<% if(data.caseControversy.length != 0){ %>',
                    '        <dt>争议焦点</dt>',
                    '        <dd>',
                    '				<% for (var i = 0; i < data.caseControversy.length; i++) { %>',
                    '					<span><%=data.caseControversy[i]%></span>',
                    '				<% }; %>',
                    '		     </dd>',
                    '			<% }; %>',
                    '			<% if(data.resultType.length != 0){ %>',
                    '        <dt>法院判决</dt>',
                    '        <dd><div class="u-judgment">',
                    '				<% for (var i = 0; i < data.resultType.length; i++) { %>',
                    '					<p><%=data.resultType[i]%></p>',
                    '				<% }; %>',
                    '        </div></dd>',
                    '			<% }; %>',
                    '    </dl>',
					'    <% } %>',
                    '</div>',
                    '<div class="u-line"><span></span></div>',
                    '<p class="document">文书正文</p>',
                    '<% for (var i = 0, list = false; i < data.tags.length; i++) {%>',
                    '	<% if(data.tags[i] == "文书名"){ %>',
                    '		<h2 id="file-title"><%=data.paras[i]%></h2>',
                    '	<% } %>',
                    '<% } %>',
                    '<div class="m-caseid" id="case-id"><%=data.caseId%></div>',
                    '<% for (var i = 0, list = false; i < data.tags.length; i++) {%>',
                    '	<% if(data.tags[i] == "文件名" || data.tags[i] == "提交时间" || data.tags[i] == "案号" || data.tags[i] == "文书名" || data.tags[i] == "other"){ %>',
					'		<% continue %>',
					'	<% } %>',
					'	<% if(data.tags[i] !== lastTag.n){ %>',
					'		<% lastTag.i++ %>',
					'		<% lastTag.n = data.tags[i] %>',
					'		<% if(list != false){ %>',
					'			 </div>',
					'		<% } %>',
                    '		<div class="judgment-title" id="Title-<%=lastTag.i%>">[<%=lastTag.n%>]</div>',
                    '		<div class="judgment-txt" id="Txt-<%=lastTag.i%>">',
					'			<p><%-data.paras[i] %></p>',
					'		<% list = true %>',
					//'		</div>',
					'	<% }else{ %>',
					'		<% if(list == true){ %>',
					//'			<div class="judgment-txt" id="Txt-<%=lastTag.i%>">',
					'			<p><%-data.paras[i] %></p>',
					'		<% } %>',
					'	<% } %>',
                    '<% } %>',

                    '<div class="judgment-title">[相关法条]</div>',
                    '<div class="judgment-txt">',
                    '	<% for (var i = 0; i < data.lawList.length; i++) { %>',
                    '		<p><%=data.lawList[i] %></p>',
                    '	<% } %>',
                    '</div>',
				].join(""),
				lawList:[
				'<div class="j-lawList">',
				'	 <h4>原告律师（<%=data.lawyerList.plaintiff.length %>）',
				'		<% if(data.lawyerList.plaintiff.length > 3){ %>',
				'			<span class="more">更多</span>',
				'		<% }else if(data.lawyerList.plaintiff.length == 0){ %>',
				'			<b>(无)</b>',
				'	 	<% } %></h4>',
				'	 <% if(data.lawyerList.plaintiff.length > 3){ %>',
				'   	<ul class="f-mb20" style="height:162px;overflow: hidden">',
				'	 <% }else{ %>',
				'		<ul class="f-mb20">',
                '	 <% } %>',
                '	 <% for (var i = 0; i < data.lawyerList.plaintiff.length; i++) { %>',
                '        <li>',
                '			<a class="j-lawDetails" data="<%=data._id%>" href="details.html?id=<%=data.lawyerList.plaintiff[i].lawyerId%>&caseId=<%=data._id%>" target="_blank">',
                '				<div class="lawyer-img">',
                '					<% if(data.lawyerList.plaintiff[i].photoUrl == ""){ %>',
                '						<img src="../images/default-small.png">',
                '					<%}else{ %>',
                '						<img src="<%=data.lawyerList.plaintiff[i].photoUrl%>>',
                '					<% } %>',
                '				</div>',
                '               <div class="lawyer-txt"><%=data.lawyerList.plaintiff[i].lawyerName%></div>',
                '   		</a>',
                '        </li>',
                '	 <% }; %>',
                '    </ul>',
                '</div>',
                '<div class="j-lawList">',
                '    <h4>被告律师（<%=data.lawyerList.defendant.length %>）',
                '		<% if(data.lawyerList.defendant.length > 3){ %>',
				'			<span class="more">更多</span>',
				'		<% }else if(data.lawyerList.defendant.length == 0){ %>',
				'			<b>(无)</b>',
				'	 	<% } %></h4>',
				'	 <% if(data.lawyerList.defendant.length > 3){ %>',
				'   	<ul class="f-mb20" style="height:162px;overflow: hidden">',
				'	 <% }else{ %>',
				'		<ul class="f-mb20">',
                '	 <% } %>',
                '	 <% for (var i = 0; i < data.lawyerList.defendant.length; i++) { %>',
                '        <li>',
                '			<a class="j-lawDetails" data="<%=data._id%>" href="details.html?id=<%=data.lawyerList.defendant[i].lawyerId%>&caseId=<%=data._id%>" target="_blank">',
                '				<div class="lawyer-img">',
                '					<% if(data.lawyerList.defendant[i].photoUrl == ""){ %>',
                '						<img src="../images/default-small.png">',
                '					<%}else{ %>',
                '						<img src="<%=data.lawyerList.defendant[i].photoUrl%>>',
                '					<% } %>',
                '				</div>',
                '               <div class="lawyer-txt"><%=data.lawyerList.defendant[i].lawyerName%></div>',
                '   		</a>',
                '        </li>',
                '	 <% }; %>',
                '    </ul>',
                '</div>',
                '<div class="j-lawList">',
                '    <h4 class="f-pr">第三人律师（<%=data.lawyerList.third.length %>）<i>?<div class="m-help"><p>非原告、非被告的其他诉讼<br>参加人的律师</p><div class="triangle"></div></div></i>',
                '		<% if(data.lawyerList.third.length > 3){ %>',
				'			<span class="more">更多</span>',
				'		<% }else if(data.lawyerList.third.length == 0){ %>',
				'			<b>(无)</b>',
				'	 	<% } %></h4>',
				'	<% if(data.lawyerList.third.length > 3){ %>',
				'   	<ul style="height:162px;overflow: hidden">',
				'	<% }else{ %>',
				'		<ul>',
                '	<% } %>',
                '	<% for (var i = 0; i < data.lawyerList.third.length; i++) { %>',
                '        <li>',
                '			<a class="j-lawDetails" data="<%=data._id%>" href="details.html?id=<%=data.lawyerList.third[i].lawyerId %>&caseId=<%=data._id%>" target="_blank">',
                '				<div class="lawyer-img">',
                '					<% if(data.lawyerList.third[i].photoUrl == ""){ %>',
                '						<img src="../images/default-small.png">',
                '					<%}else{ %>',
                '						<img src="<%=data.lawyerList.third[i].photoUrl%>>',
                '					<% } %>',
                '				</div>',
                '               <div class="lawyer-txt"><%=data.lawyerList.third[i].lawyerName%></div>',
                '   		</a>',
                '        </li>',
                '	 <% }; %>',
                '    </ul>',
                '</div>',
				].join(""),
			}

			this.bindEvent();
			this.ajaxPaper();
			this.scrollTo();
			this.scrolLoad();




		},

		bindEvent: function(){
			this.element.$detailNav.on("click","li",this.getHighlight.bind(this));
			this.element.$scrollTop.on("click",this.scrollTop.bind(this));
			this.element.$file.on("click",".j-control",this.Control.bind(this));
			this.element.$lawList.on("click",".more",this.openMore.bind(this));
			this.element.$detailsNavBtn.on("click",this.toggleDetailsNav.bind(this));

		},
		scrolLoad: function() {
			$(window).scroll(function() {
				var top =$(window).scrollTop();
				if( top > 100){
					$(".m-nav").css({
						"position":"absolute",
						"top":top+"px"
					})
				}else{
					$(".m-nav").css({
						"position":"absolute",
						"top": 50+"px"
					})
				}


			});
		},
		Control: function(e){
			var $el = $(e.target).closest(".j-control");
			var left = parseInt($(".m-time ul").css("left"));
			var num = $(".m-time li").length;
			var step = 60;
			var max = ($(".m-time").width() - $(".m-time ul").width()) - 40;
			if($el.index() == 1){
				if(left >= 40){
					$(".m-time ul").stop().animate({
						"left" : 40+"px"
					},300);
				}else{
					$(".m-time ul").stop().animate({
						"left" : Math.min(40,(left+step))+"px"
					},300);
				}
			}else if($el.index() == 2){
				if(left <= max) {
				 	$(".m-time ul").stop().animate({
				 		"left" : max +"px"
					},300);
				}else{
					$(".m-time ul").stop().animate({
						"left" : Math.max((left-step), max) +"px"
					},300);
				}
			}
		},
		toggleDetailsNav: function() {
			console.log($("#details-nav-btn").attr("aria-expanded"));
			if (!$("#details-nav-btn").attr("aria-expanded")) {
				$("#navbar-mask").show();
			}
		},

		openMore:function(e){
			var $el = $(e.target).closest(".more");
			var list = $el.parents("h4").siblings('ul');
			if($el.html() == "更多"){
				list.css({"height":"100%"})
				list.show();
				$el.html("收起");
			}else{
				list.css({"height":"162px","overflow":"hidden"})
				list.show();
				$el.html("更多");
			}

		},

		ajaxPaper:function(){
			//查询分类
			var self = this;
			$.ajax({
					url: "../../detail.php",

				type: 'POST',
				dataType: 'JSON',
				data: {
					q:{
						"id": App.prototype.paperId,
						"text":localStorage.data,
						"keyword":"",
						"type":""
					}
				},
			})
			.done(self.successAjax.bind(this))
			.fail(function() {
				console.log(arguments)
				console.log("error paper");
			})
			.always(function() {
				//console.log("complete paper");
			});

		},

		successAjax: function(json) {
			console.log(json,this.paperId)
			var self = this;
			var data = (typeof json == 'object') ? json : JSON.parse(json);
			var $paper = $('#file');
			var $nav = $('#detail-nav');
			var $judgment = $("#judgment");
			var lastTag = {
				'n' : "",
				'i' : 0,
			};

			this.element.$file.html(ejs.render(this.mosaic.fileTxt,{data: data,lastTag : lastTag}));
			//this.element.$detailNav.html(ejs.render(this.mosaic.detailNav,{data: data,lastTag : lastTag}))
			//this.element.$lawList.html(ejs.render(this.mosaic.lawList,{data:data}))
			//localStorage.caseId = data._id;
			localStorage.caseName = data.title;
			if(localStorage.keyword) {
				$("#file").highlight(localStorage.keyword, {needUnhighlight: false});
			}
			if( $(".m-time").width() < $(".m-time ul").width()){
				$(".j-control").show();
			}else{
				$(".j-control").hide();
			}
		},
		getHighlight: function(e){
			var $el = $(e.target).closest("li");
			$el.addClass('nav-active').siblings().removeClass('nav-active');
		},
		scrollTop: function () {
	        var speed=200; //滑动的速度
	        $('body,html').animate({ scrollTop: 0 }, speed);

	        return false;
		},
		scrollTo: function(){
	    	//滚动监听
			$(window).scroll(function(){

				$('.judgment-title').each(function() {
					var id = $(this).attr('id');
					var navId = '#' + id +'-nav';
					var offset = $(this).offset().top - $(window).scrollTop();
					if(offset< 100 && offset > -100) {
						$('.nav-active').removeClass('nav-active');
						$(navId).addClass('nav-active');
					}
				});
			});
		},
	}
    var start = new App();

    return start;
});
