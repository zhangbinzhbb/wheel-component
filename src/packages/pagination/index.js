import GlPagination from './src/pagination';

/* istanbul ignore next */
GlPagination.install = function (Vue) {
    Vue.component(GlPagination.name, GlPagination);
};

export default GlPagination;
