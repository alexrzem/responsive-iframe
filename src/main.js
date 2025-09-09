import { createApp } from 'vue';
import './style.css';

import App from './App.vue';

import { createVCodeBlock } from '@wdns/vue-code-block';

const VCodeBlock = createVCodeBlock({
    // options
});

const app = createApp(App);
app.use(VCodeBlock);
app.mount('#app');
