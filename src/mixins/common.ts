
export default {
	install: function (Vue, options) {
    Vue.prototype.$loactionHref = function (href, target = ''){
      this.$Loading.start()
			location.href = href
    };
	}
}