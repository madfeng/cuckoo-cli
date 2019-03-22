
/**
 * 公共工具类封装
 * author : vortex gjh
 */
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export class VtxUtil {

    static getUrlParam(key) {
        let paramObj = {};
        let matchList = window.location.href.match(/([^\?&]+)=([^&]+)/g) || [];
        for (let i = 0, len = matchList.length; i < len; i++) {
            let r = matchList[i].match(/([^\?&]+)=([^&]+)/);
            paramObj[r[1]] = r[2];
        }
        if (key) {
            return paramObj[key];
        } else {
            return paramObj;
        }
    }

    /**
     * 浏览器监测
     */
    static isBrowser() {
        var userAgent = navigator.userAgent;
        //微信内置浏览器
        if(userAgent.match(/MicroMessenger/i) == 'MicroMessenger') {
            return "MicroMessenger";
        }
        //QQ内置浏览器
        else if(userAgent.match(/QQ/i) == 'QQ') {
            return "QQ";
        }
        //Chrome
        else if(userAgent.match(/Chrome/i) == 'Chrome') {
            return "Chrome";
        }
        //Opera
        else if(userAgent.match(/Opera/i) == 'Opera') {
            return "Opera";
        }
        //Firefox
        else if(userAgent.match(/Firefox/i) == 'Firefox') {
            return "Firefox";
        }
        //Safari
        else if(userAgent.match(/Safari/i) == 'Safari') {
            return "Safari";
        }
        //IE
        else if(!!window.ActiveXObject || "ActiveXObject" in window) {
            return "IE";
        }
        else {
            return "未定义:" + userAgent;
        }
    }

    /**
     * 判断对象是否为空
     */
    static isEmptyObject(obj) {
        if(obj.constructor === Object) {
            for (let key in obj){
        　　　　return false; // 返回false，不为空对象
        　　}　　
        　　return true; // 返回true，为空对象
        } else {
            return false;
        }
    }

    // 保留几位小数
    static toFixed(num, index = 2) {
        if(!_.isNumber(num)) {
            throw new Error('必须是number类型');
            return;
        }
        return _.round(num, index);
    }

    // 去空
    static handleTrim(obj) {
        let objClone = _.cloneDeep(obj);
        if(!_.isObject(objClone)) {
            throw new Error('参数类型错误，参数必须是对象');
            return;
        }
        _.mapKeys(obj, function(value, key) {
            if(!!value && _.isString(value)) {
                objClone[key] = value.trim();
            }
        })
        return objClone;
    }

    static delay(time){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve();
            },time)
        })
    }
}

export class ArrayUtil {
    // 数组去重
    static dedupe(array) {
        return Array.from(new Set(array));
    }

    // 数组去空
    static filterEmpty(array) {
        return array.filter(item => item);
    }

    // 比较两个数组 A对比B 是新增了还是删除了哪些元素
    static diff(arr1, arr2) {
        let del = _.difference(arr1, arr2);
        let add = _.difference(arr2, arr1);
        return {
            del : del,
            add : add
        }
    }
}

export class VtxTimeUtil {

    /**
     * 时间戳
     */
    static timeStamp(dateTime) {
        return moment(dateTime).valueOf();
    }

    /**
     * 时间比较
     * 场景：计算时间段相差的天数
     */
    static diff(startTime, endTime, fotmat = 'days') {
        return moment(endTime).diff(moment(startTime), fotmat);
    }

    /**
     * 判断时间跨度不能大于多少天/月/年
     * condition : gt大于  lt 小于 默认gt
     */
    static timeSpan(startTime, endTime, num, format = 'YYYY-MM-DD', 
            condition = 'gt', conditionType="month") {

        let result = false;
        // 大于
        if(condition === 'gt') {
            result = !moment(moment(startTime).add(num, conditionType).format(format))
                    .isBefore(moment(endTime).format(format));
        }
        if(condition === 'lt') {
            result = !moment(moment(startTime).add(num, conditionType).format(format))
                    .isAfter(moment(endTime).format(format));
        }
        return result;
    }

    /**
     * type : { days, weeks, months, years...}
     */
    static subtractTime(value, type, format) {
        return moment().subtract(value, type).format(format);
    }

    /**
     * 检测是否年/月/日
     * date : 日期
     */
    static isDateType(date, format = 'YYYY-MM-DD') {
        return moment(date, format, true).isValid();
    }

    /**
     * 判断是否当前时间之后
     * disabledDate 场景使用
     */
    static isAfterDate(date, format = 'YYYY-MM-DD') {
        return moment(moment(date).format(format)).isAfter(moment().format(format));
    }

    /**
     * 判断是否当前时间之前
     * disabledDate 场景使用
     */
    static isBeforeDate(date, format = 'YYYY-MM-DD') {
        return moment(moment(date).format(format)).isBefore(moment().format(format));
    }
    
    static isAfter(startDate, endDate) {
        return moment(startDate).isAfter(endDate);
    }

    static isSame(date1, date2 = moment().format('YYYY-MM-DD'), dateType='day') {
        return moment(date1).isSame(date2, dateType);
    }

    /**
     * 获取指定日期所在星期的第一天和最后一天
     * date : String/moment
     */
    static getWeekStartAndEnd(date) {
        let startEnd = [];
        let currentWeekDay = moment(date).weekday();
        let startDate = moment(date).subtract(currentWeekDay, 'days').format('YYYY-MM-DD');
        let endDate = moment(date).add((6-currentWeekDay), 'days').format('YYYY-MM-DD');
        startEnd = [startDate, endDate];
        return startEnd;
    }

    /**
     * 获取当月最后一天
     * return 默认“YYYY-MM-DD”
     */
    static getMonthLastDay(date, format="YYYY-MM-DD") {
        let yearNum = moment(date).year();
        // 获取当月是第几月， 从0开始
        let monthNum = moment(date).month();
        return moment([yearNum, 0, 31]).month(monthNum).format(format);
    }

    static dateFormat(date, format = undefined) {
        if(!!format) {
            return moment(date).format(format);
        }
        return moment(date).format('ll');
    }
}

/*
    正则匹配
 */
export const VtxRegex = {
    /*
        验证是几位浮点数 数字
        num 需要验证的数字
        n 是数字几位 例如2
     */
    checkFloatNumber(num,n){
        let regex = new RegExp(`^-?(0|[1-9][0-9]*)(\.([0-9]?){${n}})?$`);
        return regex.test(num);
    },
    /*
        验证是否是数字
     */
    checkNumber(num){
        let regex = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        return regex.test(num);
    },
    /*
        验证是否是正数
     */
    checkPositiveNumber(num){
        let regex = /^(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        return regex.test(num);
    },
    /*
        验证是否是正整数
     */
    checkPositiveInteger(num){
        let regex = /^(0|[1-9][0-9]*)$/;
        return regex.test(num);
    },
    /*
        验证是否是正几位小数
     */
    checkIntegerFloatNumber(num,n){
        let regex = new RegExp(`^(0|[1-9][0-9]*)(\.([0-9]?){${n}})?$`);
        return regex.test(num);
    },
    /*
        验证是否是负数
     */
    checkNegativeNumber(num){
        let regex = /^-(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        return regex.test(num);
    },
    /*
        验证是否是负整数
     */
    checkNegativeInteger(num){
        let regex = /^-(0|[1-9][0-9]*)$/;
        return regex.test(num);
    },
    /*
        验证是否是负几位小数
     */
    checkNegativeIntegerFloatNumber(num,n){
        let regex = new RegExp(`^-(0|[1-9][0-9]*)(\.([0-9]?){${n}})?$`);
        return regex.test(num);
    },
    /*
        验证手机号码
        phone 需要验证的手机号码
     */
    checkCellphone(phone){
        let regex = /^1\d{10}$/;
        return regex.test(phone);
    },
    /*
        验证号码
        tel 需要验证的号码
     */
    checkTelphone(tel){
        let regex = /(^(\d{3,4}-)?\d*)$/;
        return regex.test(tel);
    },
    /*
        验证数组
        phone 需要验证的手机号码
     */
    checkArray(ary){
        return ary instanceof Array;
    }
}