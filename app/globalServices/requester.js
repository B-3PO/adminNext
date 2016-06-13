angular
  .module('adminNext')
  .factory('requester', requesterService);



/**
  * @name requester
  * @module requester
  *
  * @description
  *
  */
requesterService.$inject = ['$http'];
function requesterService($http) {
  var service = {
    head: head,
    get: get,
    post: post,
    put: put,
    del: del
  };
  return service;





  /**
    * @name head
    * @function
    *
    * @description
    *
    * @param {string} url
    * @param {object} [_headers]
    * @param {function} [callback]
    */
  function head(url, headers, baseUrl) {
    var callback = arguments[arguments.length - 1];

    return request({
      baseUrl: baseUrl,
      method: 'HEAD',
      url: url,
      headers: headers,
      callback: typeof callback === 'function' ? callback : undefined
    });
  }


  /**
    * @name get
    * @function
    *
    * @description
    *
    * @param {string} url
    * @param {object} [data]
    * @param {object} [_headers]
    * @param {function} [callback]
    */
  function get(url, data, headers, baseUrl) {
    var callback = arguments[arguments.length - 1];

    return request({
      baseUrl: baseUrl,
      method: 'GET',
      url: url,
      data: data,
      headers: headers,
      callback: typeof callback === 'function' ? callback : undefined
    });
  }


  /**
    * @name post
    * @function
    *
    * @description
    *
    * @param {string} url
    * @param {object} [data]
    * @param {object} [_headers]
    * @param {function} [callback]
    */
  function post(url, data, headers, baseUrl) {
    var callback = arguments[arguments.length - 1];

    return request({
      baseUrl: baseUrl,
      method: 'POST',
      url: url,
      data: data,
      headers: headers,
      callback: typeof callback === 'function' ? callback : undefined
    });
  }


  /**
    * @name put
    * @function
    *
    * @description
    *
    * @param {string} url
    * @param {object} [data]
    * @param {object} [_headers]
    * @param {function} [callback]
    */
  function put(url, data, headers, baseUrl) {
    var callback = arguments[arguments.length - 1];

    return request({
      baseUrl: baseUrl,
      method: 'PUT',
      url: url,
      data: data,
      headers: headers,
      callback: typeof callback === 'function' ? callback : undefined
    });
  }

  /**
    * @name del
    * @function
    *
    * @description
    *
    * @param {string} url
    * @param {object} [data]
    * @param {object} [_headers]
    * @param {function} [callback]
    */
  function del(url, headers, baseUrl) {
    var callback = arguments[arguments.length - 1];

    return request({
      baseUrl: baseUrl,
      method: 'DELETE',
      url: url,
      headers: headers,
      callback: typeof callback === 'function' ? callback : undefined
    });
  }




  function request(options) {
    var requestObj = {
      method: options.method
    };

    if (options.url.indexOf('http') === -1) {
      requestObj.url = options.baseUrl || '';
      requestObj.url += options.url;
    } else { requestObj.url = options.url; }

    requestObj.headers = requestObj.headers || {};
    angular.extend(requestObj.headers, options.headers || {});

    if (requestObj.url.indexOf('/api/') === -1) {
      requestObj.headers.skipAuthorization = true;
    }

    if (options.data !== undefined) {
      requestObj.data = options.data;
    }

    return $http(requestObj).success(function (response, status, headers) {
        if (typeof options.callback === 'function') { options.callback(undefined, response, headers); }
      }).error(function (response, status) {
        if (typeof options.callback === 'function') { options.callback({status: status, response: response}); }
      });
  }
}
