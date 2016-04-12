# efg-ludwigshafen.github.io

Website of the baptist church [EfG Ludwigshafen](http://efg-ludwigshafen.de), Germany.

## getting started

To serve this project locally clone it and serve with whatever http file server you prefer:

```bash
git clone https://github.com/efg-ludwigshafen/efg-ludwigshafen.github.io.git .
python -m SimpleHTTPServer
# or use http-server (npm install -g http-server)
# or clone into a folder served by apache/nginx/lighttpd
```

## development

This website is an [Angular 1](https://angularjs.org/) single page application. You'll need
[node](https://nodejs.org) (which brings [npm](https://www.npmjs.com/) which you'll also need)
and a text editor of your choice (e.g. [ATOM](https://atom.io/), [Brackets](http://brackets.io/)
or [VSCode](https://code.visualstudio.com/)). And [GraphicsMagick](http://www.graphicsmagick.org/)
(because we resize our image assets with it).

To get a deep dive into the code structure head over to the [wiki page](https://github.com/efg-ludwigshafen/efg-ludwigshafen.github.io/wiki/Development).

## production

This website can be served by any http file server anywhere (especially in
[gh-pages](https://pages.github.com/)). Its configuration/copywriting is done in
[yml](http://www.yaml.org/start.html) files located in [`./data`](./data). However,
there are some dynamic parts (i.e. sermons, downloads) which are handled by calls
to the JSON APIs of an [ownCloud](https://owncloud.org/) instance.

To see how ownCloud needs to be configured and which files need to be put where to
configure this website, take a look at the [wiki page](https://github.com/efg-ludwigshafen/efg-ludwigshafen.github.io/wiki/Production).

## license

- source code (i.e. `/.*\.(js|less|html)$/`) is [MIT licensed](LICENSE)
- content copy (i.e. `/.*\.yml$/` and this README) is [CC-BY-NC licensed](https://creativecommons.org/licenses/by-nc/4.0)
- assets (i.e. `/.*\.(jpg|png|svg)$/`) are used with permission but not publicly licensed
