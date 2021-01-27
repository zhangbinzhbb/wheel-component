import searchCompany from './src/searchCompany';

/* istanbul ignore next */
searchCompany.install = function (Vue) {
    Vue.component(searchCompany.name, searchCompany);
};

export default searchCompany;
