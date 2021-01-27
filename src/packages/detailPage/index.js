import GlDetail from './src/detail';

/* istanbul ignore next */
GlButton.install = function (Vue) {
    Vue.component(GlDetail.name, GlDetail);
};

export default GlDetail;
