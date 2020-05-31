import Vue from 'vue';
import {library, config} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon, FontAwesomeLayers} from '@fortawesome/vue-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {fab} from '@fortawesome/free-brands-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';

config.autoAddCss = true;
library.add(fas, fab, far);

Vue.component('fa-layer', FontAwesomeLayers);
Vue.component('fa', FontAwesomeIcon);
