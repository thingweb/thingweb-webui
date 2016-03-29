# thingweb-webui
A W3C WoT "current practices" compliant web client.

Static HTML5 and javascript, dependencies managed with bower.

## Basic running

```bash
bower install

# use any webserver - serve is just an example
npm install -g serve
serve
```

For CoAP support, please run the [CoAP polyfill](https://github.com/ynh/coap-polyfill) from YNH (runnable jar in this repo)

```bash
java -jar coap-polyfill-1.0.0-M3.jar
```

## License 
MIT

## Authors

Johannes Hund (@horus), Daniel Peintner (@danielpeintner) and the Thingweb community