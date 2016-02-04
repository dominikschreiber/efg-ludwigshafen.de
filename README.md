# efg-ludwigshafen.github.io

Website of the baptist church EfG Ludwigshafen, Germany.

## developing

To get started, perform the following steps:

```bash
# clone the repository
git clone git@github.com:efg-ludwigshafen/efg-ludwigshafen.github.io
# cd to the cloned repository
cd efg-ludwigshafen.github.io
# install GraphicsMagick (from somewhere -- mac users have it easy here)
brew install GraphicsMagick
# install dependencies (installs bower dependencies as well)
npm install
# start the development build (concat + uglify js, start server at ::8000)
npm start
```

## copywriting

Content is placed in [YAML](http://yaml.org/) files in the [/data](./data)
folder. Those files contain an explaining header with a more-or-less final
"schema" as well as possible notes on the stability of this schema (oriented
at nodejs' [stability index](https://nodejs.org/api/documentation.html#documentation_stability_index))
and the routes that are created for the resource. This would be for example

```yml
# ${id}:
#     name: String
#     thumbnail: url|classList
#     poster: url
#
# @creates #!/foo/${id}
# @stability 1
```