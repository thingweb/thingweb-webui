# thingweb-webui
A W3C WoT "current practices" compliant web client.

Static HTML5 and javascript, dependencies managed with bower.

## Basic running
Just install all frontend-deps with bower (you need node.js and ``npm -g install bower``)
```bash
bower install
```
Then you can serve the files from any HTTP (or HTTP/2) server. 
 
Dev Example
```bash
# use any webserver - serve is just an example
npm install -g serve
serve
```
## CoAP Polyfill

For CoAP support, please run the [CoAP polyfill](https://github.com/ynh/coap-polyfill) from YNH (runnable jar in this repo)

```bash
java -jar coap-polyfill-1.0.0-M3.jar
```

## Minified build / optimizations
This project is meant as an explorative prototype / reference implementation - not for productive use.

if you are certain you need an optimized build, install dev-dependencies with NPM 
and use gulp (you need node.js and ``npm -g install gulp-cli``) to run optimizers.

The shrinked page is availiable in /dist.

```bash
npm install 
gulp
```

## License 
MIT

## Authors
Johannes Hund (@horus), Daniel Peintner (@danielpeintner) and the Thingweb community