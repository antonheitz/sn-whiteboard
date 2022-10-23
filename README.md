# Standard Notes Drawing Extension

A extension for Standard Notes utilizing the [Standard Notes extension template](https://github.com/standardnotes/editor-template-cra-typescript) and the [TLDraw React Package](https://github.com/Tldraw/Tldraw).

## Add to your Standard Notes Account

Simply add the extension via the github pages.

> TBD

Also you can self-host the extension, a guide below.

## Self hosting

1. Clone the repo:

```
git clone git@github.com:antonheitz/sn-tldraw-editor.git
cd sn-tldraw-editor
```

2. Install the dependencies with `yarn install`.
3. Build the extension with `yarn build`.
4. Serve the `build` folder that got created in 3. Please keep in mind that only the Desktop App will allow extensions not served via HTTPS.

Hint: to serve the build folder you can use the recomended `sudo npm install -g http-server` and run `yarn server` in the root of the project. Then the extension link will be `http://localhost:3000/ext.json`.

# Have fun drawing
