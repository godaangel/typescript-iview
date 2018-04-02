import axios from 'axios'

class Ajax {
	request(url = '', params = {}, method = 'POST', responseType = 'json'){
		let iView = window['iView'];
		axios.interceptors.request.use(function (config) {
	    iView.LoadingBar.start();
	    return config;
	  });

		return axios({
			url: url, 
			data: params, 
			method: method,
			responseType: responseType
		}).then(function (response) {
			iView.LoadingBar.finish();
	    return Promise.resolve(response.data);
	  })
	  .catch(function (error) {
	  	iView.LoadingBar.error();
	    return Promise.reject(error);
	  });
	}
}

export default new Ajax()