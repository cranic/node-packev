Packev
======

Packev is a monitoring tool that emits an event everytime a new package is
updated or created in NPM.

#### Usage

```javascript
var packev = require('packev');
var options = {
    interval : 3000
};
var monitor = new packev(options);

monitor.on('data', function(package){
    console.log('New package in NPM: ', package.name);
});

monitor.on('error', function(err){
    throw err;
});

// All setted up, let's start the monitor
monitor.start();
```

#### Methods

* `on(event, callback)` register a callback for an event.
* `start()` starts the monitor.
* `stop()` stops the monitor.
* `status` a string containing the current status, can be `running` or `stopped`

#### Events

* `data` fired when a new/updated package is found, its callback receives the
package object.
* `error` when something whent wront, it's fired, its callback receives a error
object.
* `cicle` emitted when a checking cicle has ended.
* `stop` emitted when the check engine has stoped, after calling `stop()`.
* `start` emitted when the check engine has started, after calling `start()`.

#### Options

* `interval` set the interval in miliseconds to check for new packages. Default
is `5000`.
* `start` time in miliseconds to be removed from the first check time. This
way we can fetch older updates. Default is `5000`.
* `filter` a function that receives the package object and can be used to filter
what packages will be emitted, returning `true` or `false`. Default is `null`.
* `endpoint` the url fom where the package check will run.
* `fullPackage` a boolean to allow or not the full package information to be
fetched, default is `false`.

#### TODO

* Tests
* Documentation
* In-code documentantion

#### Licence (MIT)

Copyright (c) 2013 Cranic Tecnologia e Informática LTDA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.


