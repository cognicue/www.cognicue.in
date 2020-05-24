# CogniCue - Converting Emotions into Analytics

![Build gh-pages](https://github.com/bodyspeaksbetter/www.cognicue.in/workflows/Build%20gh-pages/badge.svg)

This repo hosts the code for [www.cognicue.in](https://www.cognicue.in/) on the `master` branch which builds and serves through `gh-pages`.

`master` is protected and only ever gets changed when merging develop (`git merge develop --ff`).


## Testing locally

Make sure you have python & pip installed first.

1. Open Terminal and navigate to the project root directory,
2. Install dependencies `pip install -r requirements.txt`,
3. Run build script `python build.py`
4. In another terminal, run  `cd build && python -m http.server`
5. Open web browser and test http://localhost:8000/demo/facs/
