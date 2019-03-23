/**
 * 公共配置文件
 * author : vtx gjh
 * 数据 _CF 来源：./resources/js/config.js
 */
import { VtxUtil } from '../utils/util.js';
const { getUrlParam } = VtxUtil;

import { message } from 'antd';

const cfgVal = (cfg, value) => {
	if(!_CF) {
		message.error('配置文件未引入');
		return;
	}
	if(cfg in _CF) {
		value = _CF[cfg];
	} else {
		message.warn(`请在./resources/js/config.js文件中配置${cfg}参数，未配置情况下默认为${value}`);
	}
	return value;
};

export default {
	..._CF,
	vtxInfo : {
		userId : getUrlParam('userId') || _CF.vtxInfo.userId,
		tenantId : getUrlParam('tenantId') || _CF.vtxInfo.tenantId, 
		systemCode : getUrlParam('systemCode') || _CF.vtxInfo.systemCode,
		token : getUrlParam('token') || _CF.vtxInfo.token
	},

	baseurl : { // 基础路径
		
	},

	config : {
		isBtnSwitch : cfgVal('isBtnSwitch', true) // 按钮权限开关，默认关闭
	}
}