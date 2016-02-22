angular.module("coap",[]).provider('CoAP', [
function CoapProvider() {
  var proxyHost = 'http://localhost:8080'

  this.setProxy = function setProxy(value) {
    proxyHost = value;
  }

  this.$get = ['$window', '$log', '$q',
    function CoapServiceFactory($window,$log,$q) {

      if ($window.coap_proxy) {
        //coap.js is loaded

        if (proxyHost !== $window.coap_proxy) {
          $log.warn("coap proxy mismatch, overriding with configured");
          $window.coap_proxy = proxyHost;
        }

      } else {
        //not loaded

        $window.coap_proxy = proxyHost;

        var status_map = {
          64: {
            status: 200,
            statusText: 'OK'
          },
          65: {
            status: 201,
            statusText: 'Created'
          },
          66: {
            status: 202,
            statusText: 'Deleted'
          },
          67: {
            status: 203,
            statusText: 'Valid'
          },
          68: {
            status: 204,
            statusText: 'Changed'
          },
          69: {
            status: 205,
            statusText: 'Content'
          },
          128: {
            status: 400,
            statusText: 'Bad Request'
          },
          129: {
            status: 401,
            statusText: 'Unauthorized'
          },
          130: {
            status: 402,
            statusText: 'Bad Option'
          },
          131: {
            status: 403,
            statusText: 'Forbidden'
          },
          132: {
            status: 404,
            statusText: 'Not Found'
          },
          133: {
            status: 405,
            statusText: 'Method Not Allowed'
          },
          141: {
            status: 413,
            statusText: 'Request Entity Too Large'
          },
          143: {
            status: 415,
            statusText: 'Unsupported Content-Format'
          },
          160: {
            status: 500,
            statusText: 'Internal Server Error'
          },
          161: {
            status: 501,
            statusText: 'Not Implemented'
          },
          162: {
            status: 502,
            statusText: 'Bad Gateway'
          },
          163: {
            status: 503,
            statusText: 'Service Unavailable'
          },
          164: {
            status: 504,
            statusText: 'Gateway Timeout'
          },
          165: {
            status: 505,
            statusText: 'Proxying Not Supported'
          }
        };

        function CoAPRequest(type) {
          this.method = 'GET';
          this.uri = null;
          this.async = true;
          this.onreadystatechange = function() {

          };
          this.readyState = 0;
          this.payload = '';
          this.onload = function() {

          };
          this.onerror = function() {

          };

        }

        CoAPRequest.prototype.open = function(method, uri, async) {
          this.method = method;
          this.uri = uri;
          this.async = async;
        };

        CoAPRequest.prototype.setRequestHeader = function() {

        };

        CoAPRequest.prototype.abort = function() {

        };
        CoAPRequest.prototype.getAllResponseHeaders = function() {

        };

        CoAPRequest.prototype.send = function(payload) {
          this.payload = payload;
          var self = this;
          var xhr = new XMLHttpRequest();
          xhr.open('POST', window.coap_proxy + '/request', this.async);
          xhr.setRequestHeader('Content-Type', 'application/json');
          var jsondata = JSON.stringify({
            'method': this.method,
            'url': this.uri,
            'payload': this.payload
          });
          xhr.onreadystatechange = function() {
            self.readyState = xhr.readyState;
            self.onreadystatechange();
          };

          function processResponse() {
            var o = JSON.parse(xhr.responseText);
            if ('error' in o) {
              self.error = o.error;
            } else {
              self.error = null;
              var status = (status_map[o.code] || {
                status: 500,
                statusText: 'Unkown Status ' + o.code
              });
              self.status = status.status;
              self.statusText = status.statusText;
              self.code = o.code;
              self.responseText = o.payload;
            }
          }

          xhr.onload = function() {
            processResponse();
            if (self.error) {
              self.onerror();
            } else {
              self.onload();
            }
          };
          xhr.onerror = function() {
            self.onerror();
          };
          xhr.send(jsondata);
          if (!this.async) {
            processResponse();
          }
        };
      }

      //we should now have CoAPRequest
      var self = {}

      self.doCoapReq = function doCoapReq(method,uri,payload) {
        var deferred = $q.defer();
        var request = new CoAPRequest();
        request.open(method, uri, true);

        request.onload = function () {
          deferred.resolve(request.responseText);
        };

        request.onerror = function() {
          deferred.reject(request.error);
        }
        request.send(payload);

        return deferred.promise;
      }

      self.get = function get(uri) {
        return self.doCoapReq('GET',uri);
      }

      self.put = function put(uri, payload) {
        return self.doCoapReq('PUT',uri,payload);
      }

      self.post = function post(uri, payload) {
          return self.doCoapReq('POST',uri,payload);
      }

      self.delete = function _delete(uri) {
        return self.doCoapReq('DELETE',uri);
      }


      return self
    }
];

}]);
