/**
 * 高阶组件
 */
import React from 'react';
import PropTypes from 'prop-types';

import isFunction from 'lodash/isFunction';

function getDisplayName(WrappedComponend) {
    return WrappedComponend.displayName ||
           WrappedComponend.name ||
           'Component';
}

function Container(params={}) {

    let { namespace } = params;

    return function HOCFactory(WrappedComponend) {
        return class HOC extends React.Component {

            static displayName = `HOC(${getDisplayName(WrappedComponend)})`

            render() {
                const self = this;
                const { dispatch } = this.props;

                let newProps = {};
                if(namespace && isFunction(dispatch)) {
                    newProps = {
                        dispatch({type, payload}) {
                            dispatch({
                                type: type.indexOf('/') > -1 ? type : `${namespace}/${type}`,
                                payload
                            })
                        }
                    }
                }

                return <WrappedComponend {...this.props} {...newProps}/>
            }
        }
    }
}

export default Container;

