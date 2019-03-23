/**
 * 按钮权限
 * author : vtx gjh
 */
import comm from '../../config/comm.config.js';
import permissionCode from '../../config/permission.config.js';
import { getFunctionList } from '../../services/common.service.js';

import forIn from 'lodash/forIn';

const functionCodesMap = {};
forIn(permissionCode, function(value, key) {
    functionCodesMap[key] = !comm.config.isBtnSwitch;
})

export default {

	namespace : 'permission',

	state : {
        switchState : comm.config.isBtnSwitch, // 按钮开关权限
        functionCodesMap : functionCodesMap
	},

	subscriptions : {
        setup({history,dispatch}){
            dispatch({type:"getFunctionList"});
        }
	},

	effects : {
        *getFunctionList({payload},{select,call,put}){
            let { functionCodesMap, switchState } = yield select(({permission})=>permission);
            if(switchState){
                let {data}=yield call(getFunctionList);
                if(!!data && !data.result) {
                    if('data' in data) {
                        let dataSource = data.data;
                        forIn(permissionCode, function(value, key) {
                            const valueClone = {...value};
                            delete valueClone.name;
                            functionCodesMap[key] = 
                                    _.findIndex(dataSource, valueClone) != -1 ? true : false;
                        })
                        yield put({
                            type : 'updateState',
                            payload : {
                                functionCodesMap : functionCodesMap
                            }
                        })
                    }
                }
            }
        }
	},

	reducers : {
		//状态更新
		updateState(state, action) {
            return { ...state, ...action.payload };
        }
	}
}