define(function(){
	window.console = window.console||{
	   log:function(){}
	}

	lawUrl = {
		searchClassification:'../../class.php',
		paperDetail:'../../detail.php',
		search:'../../list.php'
	};

	log = function(a){
		console.log(a)
	};

	getQueryString = function(name) {
	    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	    var r = window.location.search.substr(1).match(reg);
	    if (r != null) {
	        return unescape(r[2]);
	    }
	    return null;
	};

	if(typeof Function.prototype.bind === "undefined"){
		Function.prototype.bind = function(context){
			var t = this,
				slice = Array.prototype.slice,
				innerArgs = slice.call(arguments,1);  //bind方法的参数
			return function(){
				return t.apply(context,innerArgs.concat(slice.call(arguments)));  //这里的参数列表是bind真正执行时传递的参数,详情看看下面的例子就懂了
			}
		}
	}

	if (typeof Array.prototype.indexOf === "undefined") {
	  Array.prototype.indexOf = function (searchElement, fromIndex) {
	    var index = -1;
	    fromIndex = fromIndex * 1 || 0;

	    for (var k = 0, length = this.length; k < length; k++) {
	      if (k >= fromIndex && this[k] === searchElement) {
	          index = k;
	          break;
	      }
	    }
	    return index;
	  };
	}
})
