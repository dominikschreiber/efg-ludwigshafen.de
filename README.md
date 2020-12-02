# efg-ludwigshafen.github.io

The website of [EFG Ludwigshafen](https://efg-ludwigshafen.de), a baptist church in Ludwigshafen, Rhineland-Palatinate, Germany.

This is as plain html as it is going to get: just a single index.html, no build steps, minimal JavaScript. See the comment at the head of the index.html for details on how it works.

For local development, just serve the root folder with whatever http server you envision, e.g.

```bash
python3 -m http.server
```

or

```bash
npx reload
```

The only convention is to have images as jpg (ending in .jpg, not .jpeg or .JPG) and, under the same name as webp, and reference them in their webp format (it will be rewritten to jpg for the Internet Explorer). To convert jpg files to webp use

```bash
# to get cwebp (on mac)
brew install webp
# quality=10, for background-images:
cwebp -q 10 myfile.jpg -o myfile.webp
# quality=50, for images that need higher quality:
cwebp -q 50 myfile.jpg -o myfile.webp
```
