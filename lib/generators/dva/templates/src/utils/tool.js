/**
 * 工具类
 */
import comm from '../config/comm.config.js';
/**
 * 表格columns的数据处理
 * 传入[title, key, {...other}]
 * title必须，key必须
 */
export const handleColumns = (cols) => {
	return cols.map(item => {
		let other = {};
		if(!!item[2] && _.isObject(item[2])) {
			other = _.cloneDeep(item[2]);
		}
		if('display' in other) {
			if(!other.display) {
				return '';
			}
		}
		delete other.display;
		return {
			title : item[0],
			dataIndex : item[1],
			key : item[1],
			...other
		}
	}).filter(item => item);
}

/**
 * 为导出提供导出参数
 * 返回对象{columnNames, columnFields}
 */
export const renderColumnParam = (cols) => {
	let columnNamesArr = [], columnFieldsArr = [],
		columnNames = '', columnFields = '';
	cols.map(item => {
		let other = {};
		if(!!item[2] && _.isObject(item[2])) {
			other = _.cloneDeep(item[2]);
		}
		if('display' in other) {
			if(!other.display) {
				return;
			}
		}
		if(item[1] === 'action') {
			return;
		}
		columnNamesArr.push(item[0]);
		columnFieldsArr.push(item[1]);
	});
	return {
		columnNames : columnNamesArr.join(','),
		columnFields : columnFieldsArr.join(','),
	}
}

/**
 * 处理对象中undefined
 */
export const handleUndefined = (obj) => {
	let objClone = _.cloneDeep(obj);
    if(!_.isObject(objClone)) {
        throw new Error('参数类型错误，参数必须是对象');
        return;
    }
    _.mapKeys(obj, function(value, key) {
      	if(_.isUndefined(value)) {
      		objClone[key] = "";
      	}
    })
    return objClone;
}

/**
 * 回到顶部
 * 接收一个element对象
 */
export const toTop = (elem) => {
	if(!elem) {
		return;
	}
	let timer;
	return function() {
		cancelAnimationFrame(timer);
		timer = requestAnimationFrame(function fn(){
	        var oTop = elem.scrollTop;
	        if(oTop > 0){
	            elem.scrollTop= oTop - 50;
	            timer = requestAnimationFrame(fn);
	        }else{
	            cancelAnimationFrame(timer);
	        }    
	    });
	}
}

/**
 * 节流函数
 */
export const throttle = (fn, wait) => {
    let timer, firstTime = true;
    return function() {
        let args = arguments, me = this;
        if (firstTime) {
            fn.apply(me, args);
            return firstTime = false;
        }
        if (timer) {
            return false;
        }
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = null;
            fn.apply(me, args);
        }, wait);
    }
}

/**
 * 新建窗口
 */
export const openWindow = (url, name, {...features}) => {
	let featuresObj = {
		height : 600,
		width : 910,
		...features
	};
	let featuresArr = [];
	_.mapKeys(featuresObj, function(value, key) {
		featuresArr.push(`${key}=${value}`);
	})
	let newFeatures = featuresArr.join(',');
	window.open(url, name, newFeatures);
}

export const openBlankWindow = (url) => {
	const newUrl = `${url}&usrId=${comm.vtxInfo.userId}&tenantId=${comm.vtxInfo.tenantId}
				&token=${comm.vtxInfo.token}`;
	window.open(newUrl);
}

// 导出文件
export function downLoadFile(reqURL, paramName, paramVal){
    var formDom=$("<form>");//定义一个form表单  
    formDom.attr("style","display:none");  
    formDom.attr("target","");  
    formDom.attr("method","post");  
    formDom.attr("action",reqURL);  
    $("body").append(formDom);//将表单放置在web中  
    for(let i=0; i<paramName.length;i++){
        var inputBox=$("<input>");  
        inputBox.attr("type","hidden");  
        inputBox.attr("name",paramName[i]);  
        inputBox.attr("value",paramVal[paramName[i]]); 
        formDom.append(inputBox);  
     }
    formDom.submit();//表单提交 
    formDom.remove();
}

export function numFormat(value, place = 3) {
    // 正则 /\B(?=(?:\d{3})+\b)/g  /^[0-9]+([.]{1}[0-9]{1,2})?$/
    let reg = new RegExp(`^[0-9]+([.]{1}[0-9]{1,${place}})?$`, "g");
    return reg.test(value) || /^[0-9]+[.]{1}$/.test(value);
}

export function isInt(value) {
    var reg = /^[1-9]*[1-9][0-9]*$/;
    return reg.test(value);
}
