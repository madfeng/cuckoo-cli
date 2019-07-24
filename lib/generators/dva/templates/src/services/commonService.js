/**
 * 封装共通服务
 */

import HttpService from '../utils/request.js';
const { get, post, jsonp } = HttpService;

import comm from '../config/comm.config.js';
const { management } = comm.baseurl;

// 单位树 
// @serviceType: [management租户服务]
export async function loadOrgTreeByPermission( param) {
    return post(`${management}/tenant/dept/loadOrgTreeByPermission`, {
        body: param
    })
}

// 行政区划 
// @serviceType: [management租户服务]
export async function loadDivisionTreeByPermission( param) {
    return post(`${management}/tenant/division/loadDivisionTree`, {
        body: param
    })
}

// 获取租户信息
// @serviceType: [management租户服务]
export async function getTenantById( param) {
    return get(`${management}/tenant/getTenantById`, {
        body: param
    })
}

// 车辆树 
// @serviceType: [车辆维修服务]
export async function loadCarTree(param){
    return jsonp('/cloud/clwxfw/api/np/v2/carManage/loadCarTree.smvc', {
        body: param
    });
}