import GlUpload from './src/upload';

/* istanbul ignore next */
GlUpload.install = function (Vue) {
    Vue.component(GlUpload.name, GlUpload);
};

export default GlUpload;