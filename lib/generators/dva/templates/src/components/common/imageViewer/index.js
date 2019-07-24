import React from 'react';
import ReactDOM from 'react-dom';

import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';

import Immutable from 'immutable';
import cloneDeep from 'lodash/cloneDeep';

import { 
	checkMode, 
	VIEWER, 
	GALLERY 
} from './-internal';

import { isObject, isArray, isFunction } from './util';

class ImageViewer extends React.Component {

	/**
	 * props
	 * visible {[Boolean]}  [是否显示]
	 * photo   {[Object || Array]}  [图片]  {id: '', name: ''} || [{id: '', name: ''}]
	 * index   {[Number]} photo [图片下标 用于多张图片展示，从 0 开始] 
	 * prefix  {[String]} [图片前缀]
	 * options {[Object]} [viewerjs 配置项]
	 */
	constructor(props) {
		super(props);

		this.state = {

		}

		this.prefix = 'prefix' in props ? props.prefix : '/cloudFile/common/downloadFile?id=';
		this.options = props.options || {};

		this.getContainer = this.getContainer.bind(this);
		this.renderComponent = this.renderComponent.bind(this);
		this.view = this.view.bind(this);
	}

	imageRef = ref => this.image = ref;

    componentWillUpdate(nextProps, nextState) {
    	// visible 为true时
    	if(nextProps.visible && !Immutable.is(this.props.visible, nextProps.visible)) {
			this.view(nextProps);
		}
    }

    componentWillUnmount() {
    	if (this.container) {
      		ReactDOM.unmountComponentAtNode(this.container);
      		this.container.parentNode.removeChild(this.container);
      		this.container = null;
    	}
    }

    view(props) {
    	if (!this.container) {
			this.container = this.getContainer();
		}

		let {
			node: children,
			index
		} = this.renderComponent(props);
		if(!children) {
			return;
		}
		ReactDOM.unstable_renderSubtreeIntoContainer(
			this,
			children,
			this.container
		)
		
		let _t = this;
        this.viewer = new Viewer(this.image,{
        	// 关闭后
		  	hidden() {
		  		if('onClose' in _t.props && isFunction(_t.props.onClose)) {
		  			_t.props.onClose();
		  			// 销毁
		  			_t.viewer.destroy();
		  		}
		  	},
		  	view(e) {
		  		if('onIndexChange' in _t.props && isFunction(_t.props.onIndexChange)) {
		  			// 图片下标变更
		  			_t.props.onIndexChange(e.detail.index);
		  		}
		  	},
		  	...this.options
        })
        this.viewer.view(index);
    }

	getContainer() {
		const container = document.createElement('div');
		container.style.display = 'none';
		document.body.appendChild(container);
		return container;
	}

	renderComponent = (props) => {
		let { photo = {}, index = 0 } = props;

		let node = null;
		let mode = checkMode(photo);

		let newPhoto = cloneDeep(photo);
		// 单张
		if (mode === VIEWER) {
			index = 0;
			newPhoto = isObject(newPhoto) ? newPhoto : newPhoto[0];
			node = (
				<div>
					<img ref={this.imageRef} src={`${this.prefix}${newPhoto.id}`} alt={newPhoto.name} />
				</div>
			)
		}

		// 多张
		if (mode === GALLERY) {
			let len = newPhoto.length - 1;
			index = index < 0 ? 0 : index;
			index = index > len ? len : index;
			node = (
				<div>
					<ul ref={this.imageRef}>
						{
							newPhoto.map(item => (
								<li key={item.id}>
									<img src={`${this.prefix}${item.id}`} alt={item.name} />
								</li>
							))
						}
					 </ul>
				 </div>
			)
		}

		return { node, index };
	}

	render() {

		return null;
	}
}

export default ImageViewer;