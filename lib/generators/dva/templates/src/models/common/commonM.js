/**
 * 此modal只负责管理effects
 * 不做state的维护管理（一般情况下）
 */
import { 
    getTenantById, loadOrgTreeByPermission, loadDivisionTreeByPermission, loadCarTree, 
} from '../../services/commonService.js';

import comm from '../../config/comm.config';
const { token, tenantId, userId } = comm.vtxInfo;
import { parseReqParameter, checkResData, parseTreeStructure } from '../../utils/tools';

export default {

    namespace: 'common',

    state: {

    },

    subscriptions: {

    },

    effects: {
        /**
         * 获取租户信息
         * @return {[object]} [返回地图类型，地图中心点]
         */
        *getTenantById({ payload }, { call, put, select }) {
            let param = {
                token: token,
                access_token: token,
                parameters: JSON.stringify({id: tenantId})
            };
            const { data } = yield call(getTenantById, param);
            let mapType, 
                coordinate,
                minZoom = 3,
                maxZoom = 19,
                mapCenter = [];
            if(checkResData(data)) {
                let { longitudeDone, latitudeDone, mapDefJson } = data.data;
                if(longitudeDone && latitudeDone) {
                    mapCenter = [longitudeDone, latitudeDone];
                    if(mapDefJson) {
                        mapDefJson = JSON.parse(mapDefJson);
                        mapDefJson.map((item, index) => {
                            if ( item.defaultMap ) {
                                mapType = item.mapType;
                                coordinate = item.coordinate;
                                minZoom = item.minZoom;
                                maxZoom = item.maxZoom;
                            }
                        });
                    }
                }
            }
            return {
                mapType, // 地图类型
                coordinate,
                minZoom, 
                maxZoom,
                mapCenter // 地图中心点
            }
        },

        /**
         * 单位树
         */
        *loadOrgTreeByPermission({ payload }, { call, put, select }) {
            let param = {
                parameters: JSON.stringify({ userId, tenantId, isControlPermission: "1" })
            };
            const { data } = yield call(loadOrgTreeByPermission, param);
            let tree = [];
            if(checkResData(data, 'tree')) {
                tree = parseTreeStructure(data.data, function(item) {
                    return {
                        selectable: item.nodeType === "org" ? true : false
                    }
                });
            }
            return tree;
        },

        /**
         * 行政区划树
         */
        *loadDivisionTreeByPermission({ payload }, { call, put, select }) {
            let param = {
                parameters: JSON.stringify({ tenantId, level: "4" })
            };
            const { data } = yield call(loadDivisionTreeByPermission, param);
            let tree = [];
            if(checkResData(data, 'tree')) {
                tree = parseTreeStructure(data.data);
            }
            return tree;
        },

        /**
         * 车辆树
         */
        *loadCarTree({ payload = {} }, { call, put, select }) {
            let params = { 
                parameters: JSON.stringify(parseReqParameter({ carClassesCode: payload.code }))
            };
            const { data } = yield call(loadCarTree, params);
            let tree = [];
            if(checkResData(data, 'tree')) {
                tree = parseTreeStructure((data.data || {}).data, function(item) {
                    return {
                        selectable: item.nodeType === "car" ? true : false,
                        carCode: (item.attributes || {}).carCode
                    }
                });
            }
            return tree;
        },

    }, 

    reducers : {
        //状态更新
        updateState(state, action) {
            return { ...state, ...action.payload };
        }
    }
}

