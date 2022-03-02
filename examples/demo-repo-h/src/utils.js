function util1 () {
  return 'util1'
}

function util2 () {
  return 'util2'
}


export { util1, util2 }


var HttpHaha = /** @class */ (function () {
    function HttpHaha(config) {
        
    }
    HttpHaha.prototype.request = function (config) {
        return config
    };
    return HttpHaha;
}());

export { HttpHaha };

