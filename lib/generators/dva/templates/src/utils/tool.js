import comm from '../config/comm.config.js';
const { token, tenantId, userId } = comm.vtxInfo;

import isObject from 'lodash/isObject';
import isUndefined from 'lodash/isUndefined';
import cloneDeep from 'lodash/cloneDeep';
import mapKeys from 'lodash/mapKeys';
import isString from 'lodash/isString';
import isFunction from 'lodash/isFunction';
import startsWith from 'lodash/startsWith';

/**
 * 表格columns的数据处理
 * 传入[title, key, {...other}]
 * title必须，key必须
 */
export const handleColumns = (cols) => {
    return cols.map(item => {
        let other = {};
        if(!!item[2] && isObject(item[2])) {
            other = cloneDeep(item[2]);
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
 */
export const renderColumnParam = (cols) => {
    let colsParam = [];
    cols.map(item => {
        let other = {};
        if(!!item[2] && isObject(item[2])) {
            other = cloneDeep(item[2]);
        }
        if('display' in other) {
            if(!other.display) {
                return;
            }
        }
        if(item[1] === 'action') {
            return;
        }
        colsParam.push({
            title: item[0],
            field: item[1],
            type: other.type
        })
    });
    return colsParam
}

/**
 * 处理对象中undefined
 */
export const handleUndefined = (obj) => {
    let objClone = cloneDeep(obj);
    if(!isObject(objClone)) {
        throw new Error('参数类型错误，参数必须是对象');
        return;
    }
    mapKeys(obj, function(value, key) {
        if(isUndefined(value)) {
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
 * 校验返回的值
 * @param  {[object]} data [需验证的值]
 * @param  {String} type [校验类型]
 * @return {[boolean]}      [返回是否验证成功]
 */
export function checkResData(data, type) {
    // 校验，初始默认为false
    let check = false;
    switch(type) {
        case 'list': 
            if(!!data && !data.result) {
                if('data' in data && Array.isArray(data.data)) {
                    check = true;
                }
            }
        case 'page':
            if(!!data && !data.result) {
                if('data' in data && Array.isArray(data.data.rows)) {
                    check = true;
                }
            }
        break;
        case 'tree':
            if(!!data && !data.result) {
                return 'data' in data;
            }
        break;
        default:
            if(!!data && !data.result) {
                return 'data' in data;
            }
        break;
    }
    return check;
}

/**
 * 解析树数据
 * @param {[object]} param [解析对象]
 * @param {[function]} callBack [回调函数 返回一个对象，对象内包含额外属性]
 * @return {[array]} tree [树数据] 
 */
export function parseTreeStructure(param, callBack) {
    if(isString(param)) {
        param = JSON.parse(param);
    }
    if(!isObject(param) || !('items' in param) || !Array.isArray(param.items)) {
        return [];
    }
    let tree = param.items;
    tree = (function treeProcessor( data ){
        return data.map((item)=>{
            let nodeItem = {
                key: item.id,
                id: item.attributes.id || item.id,
                name: item.name,
                nodeType: item.nodeType
            };
            if(isFunction(callBack)) {
                nodeItem = {...nodeItem, ...callBack(item)};
            }
            if( item.children.length != 0 ) {
                nodeItem = {
                    ...nodeItem,
                    children: treeProcessor(item.children)  
                }
            }
            return nodeItem;
        })
    })(tree);

    return tree;
}

/**
 * 处理图片信息
 */
export function parsePhoto(str) {
    let photo = {};
    if(startsWith(str, '[')) {
        let data = JSON.parse(str) || [];
        photo = data[0] || {};
    }
    return photo;
}

/**
 * 经纬度处理
 */
export function parseLngLatJson(lngLatJson, coordinate) {
    let lng = '', lat = '';
    lngLatJson = JSON.parse(lngLatJson || '{}') || {};
    if(lngLatJson[coordinate]) {
        [lng, lat] = lngLatJson[coordinate].split(',');
    }
    return [lng, lat];
}