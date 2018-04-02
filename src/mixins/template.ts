/**
 * 数据渲染模块
 */
import Handler from './handler'

class Template {
	res: any
	pattern: RegExp = /\{\%([\s\S]+?)\%\}/g

	getKey(value) {
		if (typeof value == 'string') {
	    return value.replace(this.pattern, function(match, key, value) {
	      return key;
	    });
	  } else {
	    return value;
	  }
	}

	render(tpl, data){
		 if (typeof tpl == 'undefined' || data.length == 0) {
	    return tpl;
	  }
	  var helper = new Handler(data);
	  if(typeof tpl == 'string'){
	    return helper.get(this.getKey(tpl));
	  }
	  var re = /"{%([^%>]+)?%}"/g;
	  var tpl: any = JSON.stringify(tpl);
	  var cursor=0;
	  var reExp = /(^( )?({|}))(.*)?/g;
	  var code = '';
	  var add = function(line, isJS = 0){
	    if(isJS){
	      var line = helper.get(line);
	      switch(typeof line){
	        case 'object':
	          line = JSON.stringify(line);
	          break;
	        case 'undefined':
	          line = ``;
	        default:
	          line = `"${line}"`;
	      }
	      code += line;
	    }else{
	      code += line;
	    }
	    return add;
	  }
	  while(this.res = re.exec(tpl)){
	    tpl.slice(cursor, this.res.index)
	    add(tpl.slice(cursor, this.res.index))(this.res[1], 1);
	    cursor = this.res.index + this.res[0].length;
	  };
	  add(tpl.substr(cursor, tpl.length))
	  	return JSON.parse(code);
		}
}

export default new Template()