import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.less';

import { Button } from 'antd';

import container from './Container';

function IndexPage({dispatch, example}) {
    
    const {
        tip
    } = example;

    const change = () => {
        dispatch({
            type: 'updateState',
            payload: {
                tip: !tip
            }
        })
    }

    return (
        <div className={styles.normal}>
            <h1 className={styles.title}>{tip ? 'Yay! Welcome to dva!' : 'Yay! Welcome to vtx-cli!'}</h1>
            <div className={styles.welcome} />
            <ul className={styles.list}>
                <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
                <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
            </ul>
            <Button onClick={change}>切换</Button>
        </div>
    );
}

export default connect(
    ({example}) => ({example})
)(container({namespace: 'example'})(IndexPage));
