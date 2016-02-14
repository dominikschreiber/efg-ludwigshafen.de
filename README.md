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

## deploying

The actual website efg-ludwigshafen.de is hosted by a germany-based web hoster
where we only have FTP access to the server machine. To minimize the pain of
deploying the current state to the production server, it is recommended to
create [git hooks](https://git-scm.com/book/uz/v2/Customizing-Git-Git-Hooks):

```bash
# content of file: .git/hooks/pre-push
npm install
npm run build
ncftpput -R -u {{user}} -p {{password}} {{host}} {{root-folder}} {vendor,main}.min.{js,css}
ncftpput -R -u {{user}} -p {{password}} {{host}} {{root-folder}} index.html
ncftpput -R -A -u {{user}} -p {{password}} {{host}} {{root-folder}}/assets assets
ncftpput -R -u {{user}} -p {{password}} {{host}} {{root-folder}}/data data
```

```bash
# execute this once
brew install ncftp
ln -s .git/hooks/pre-push .git/hooks/post-merge
```

If you don't know user/password/host/root-folder you might not be in a
position where you should know them. But if you feel you should, kindly ask
[dominikschreiber](http://github.com/dominikschreiber).

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