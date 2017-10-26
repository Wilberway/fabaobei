/*
 * jQuery多级联动菜单 v0.11
 * 日期: 2016/3/23
 * author:suzhimin
 * 调用: $.multiSelect({
			container: $('#court-select'),        //容器
			data:courtData,                       //数据对象
			dataUrl: 'courtData.js',              //数据对象所在的文件的uri
			menuNumber:3,                         //层级数目
			blankShow:'------------------------'  //空白项的填充字符
		});
 */
$.extend({
	multiSelect:function(){
		var defaults = {
			container: $('#court-select'),
			data:courtData,
			dataUrl: 'courtData.js',
			defaultSelect: '',
			menuNumber:3,
			blankShow:'------------------------'
		};
		var selectData = [];	//按由高到低的顺序索引各层级

		var arg = arguments[0];
		if(arg){
			defaults.container = arg.container || defaults.container;
			defaults.data = arg.data || defaults.data;
			defaults.dataUrl = arg.dataUrl || defaults.dataUrl;
			defaults.defaultSelect = arg.defaultSelect || defaults.defaultSelect;
			defaults.menuNumber = arg.menuNumber || defaults.menuNumber;
			defaults.blankShow = arg.blankShow || defaults.blankShow;
		}
		if(defaults.data)
			select();
		else
			ajaxData();

		//主函数
		function select(){
			var $selector = defaults.container;
			var jsondata = defaults.data;
			for(i = 0,len = defaults.menuNumber; i < len; ++i){
				selectData[i] = i == 0 ? "0": "";
			}

			init();

			//显示下拉菜单
			$selector.on('click','.u-select',function(e){
				e.stopPropagation();
				var $this = $(this);
				var index = $this.index();
				var id = selectData[index];
				var list='';
				$selector.find('.select-menu').hide();
				if(id && jsondata[id]){
					for(i in jsondata[id]){
						list += ('<li data-id="' + jsondata[id][i]['i'] + '" title="' + jsondata[id][i]['n'] + '">' + jsondata[id][i]['n'] + '</li>');
					}
				}
				if(list){
					$this.find("ul").html(list).show();
				}
				
			});

			//选择下拉菜单的某一项
			$selector.on('click','.select-menu li',function(e){
				e.stopPropagation();
				var $this = $(this);
				$this.parent().hide();
				$this.parent().siblings('.j-select').html($this.html());
				$this.parent().parent().data('id',$this.data('id'));
				reset($this.data('id'),$this.parent().parent().index());

			});
		}

		//初始化
		function init(){
			addDefault(defaults.data);

			var $selector = defaults.container;
			if(!$selector.children().length){
				var insert = '<ul class="select-list">'
					+ '<li class="u-select" data-id="'
					+ defaults.data[0][0]["i"]
					+ '"><span class="j-select">'
					+ defaults.data[0][0]["n"]
					+ '</span><span class="icon-down"><i></i></span><ul class="select-menu"></ul></li>';
				for(i = 1,len = defaults.menuNumber; i < len; ++i){
					insert += ('<li data-id="" class="u-select"><span class="j-select">'
								 + defaults.blankShow
								 + '</span><span class="icon-down"><i></i></span><ul class="select-menu"></ul></li>');
				}
				insert += '</ul>';
				$selector.html(insert);
			}
			reset(defaults.data[0][0]["i"],0);
		}

		function addDefault(data) {
			for(var o in data) {
				if(data[o][0].n !== defaults.defaultSelect) {
					var defaultSelect = {
						"i" : o - 1,
						"n" : defaults.defaultSelect
					};
					data[o].unshift(defaultSelect);
				}
			}
		}

		/*
		 *重置低层级的默认选项
		 *@param id {string} 当前选项对应的数据的id
		 *@param index {number} 当前选项所在的层级
		 */
		function reset(id,index){
			var thisId = id;
			var $list = defaults.container.find('.u-select');
			var index = index;
			var len = defaults.menuNumber;
			var jsondata = defaults.data;
			var exist = false;
			for(i = index+1; i < len; ++i){
				selectData[i] = (i == index+1 ? thisId : jsondata[selectData[i-1]][0]["i"]);
				exist = jsondata[selectData[i]];
				if(exist){
					$list.eq(i).find(".j-select").html(exist[0]["n"]);
					$list.eq(i).data('id',exist[0]["i"]);
				}
				else{
					for(j = i; j < len; ++j){
						$list.eq(j).find(".j-select").html(defaults.blankShow);
						$list.eq(i).data('id','');
						selectData[j] = '';
					}
					break;
				}
			}
		}

	  //获取多级联动菜单的数据
		function ajaxData(){
			var container = defaults.container;
			var jsondata = defaults.data;
			var url = defaults.dataUrl;
			$.ajax({
				url: url,
				type: 'GET',
				dataType: 'script',
			})
			.done(function() {
				if(jsondata){
					select();
				}
			})
			.fail(function() {
				alert("can not load data");
			});
		}
	}
});