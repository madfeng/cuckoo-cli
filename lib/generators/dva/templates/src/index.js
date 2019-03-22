import dva from 'dva';
import './index.less';

// JavaScript 实用工具库
import _ from 'lodash';
import './utils/global.js';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
