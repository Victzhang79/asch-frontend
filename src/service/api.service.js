angular.module('asch').service('apiService', function($http, $rootScope,$location) {

	function json2url(json) {
		var arr = [];
		var str = '';
		for (var i in json) {
			str = i + '=' + json[i];
			arr.push(str);
		}
		return arr.join('&');
	};
	function fetch(url, data, method) {
		var cb = function(res) {
			// if (res.error.returnCode == '10007') {
			// 	window.setTimeout( function(){
			// 		toastError('您没有权限访问,请重新登录');
			// 		window.location.href = '#/login';
			// 		return;
			// 	}, 200 );
			// }
		};
		if (data) {
			data.from = 'asch';
			/*/!*上线要删掉*!/
			data.admin_member_id = $location.search().admin_member_id;
			/!*-------*!/*/
		}
		method = method.toLowerCase();
		if (method == 'get') {
			var params = json2url(data);
			return $http.get(url + '?' + params).success(function(res) {
				cb(res);
			});
		} else {
			return $http.post(url, data, {withCredentials: true}).success(function(res) {
				cb(res);
			});
		}
	}

	this.loginin = function(params) {
		return fetch('{{loginApi}}', params, 'post');
	};
});
