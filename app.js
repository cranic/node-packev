var _ = require('lodash');
var events = require('events');
var request = require('request');

function Packev(options) {
    var that = this;
    var lastCheck = new Date().getTime();
    var lastKeys = [];

    var defaults = {
        interval: 5000,
        start: 5000,
        filter: null,
        endpoint: 'http://registry.npmjs.org/-/all/since?stale=update_after&startkey=',
        fullPackage: false
    };

    var job = function() {
        var timestamp = !defaults.start ? lastCheck : new Date().getTime() - defaults.start;
        var url = defaults.endpoint + timestamp;

        defaults.start = 0;
        lastCheck = new Date().getTime();

        request(url, function(err, header, data) {

            if (err)
                return that.emit('error', err);

            try {
                data = JSON.parse(data);
            } catch (err) {
                return that.emit('error', err);
            }

            Object.keys(data).forEach(function(key) {
                if (key !== '_updated' && lastKeys.indexOf(key) === -1)
                    process.nextTick(function() {
                        var next = function(){
                            if (defaults.filter && defaults.filter(data[key]))
                                that.emit('data', data[key]);
                            else if (!defaults.filter)
                                that.emit('data', data[key]);
                        };

                        if(defaults.fullPackage)
                            request('http://registry.npmjs.org/' + data[key].name + '/latest', function(err, header, pack){
                                try {
                                    pack = JSON.parse(pack);
                                } catch (err) {
                                    return that.emit('error', err);
                                }
                                data[key] = pack;
                                next();
                            });
                        else
                            next();
                    });
            });

            lastKeys = Object.keys(data);
            that.emit('cicle', header, data);
        });
    };

    var interval = null;

    this.start = function() {
        interval = setInterval(job, defaults.interval);
        that.emit('start');
        this.status = 'running';
    };

    this.stop = function() {
        clearInterval(interval);
        that.emit('stop');
        this.status = 'stopped';
    };

    this.status = 'stopped';

    _.merge(defaults, options);

    return this;

}

Packev.prototype = events.EventEmitter.prototype;

module.exports = Packev;
