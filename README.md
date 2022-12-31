# Standard Notes Whiteboard Extension

A extension for Standard Notes utilizing the [Standard Notes extension template](https://github.com/standardnotes/editor-template-cra-typescript) and the [TLDraw React Package](https://github.com/Tldraw/Tldraw).

It Works on Dektop, Mobile and Web.

## Add to your Standard Notes Account

Simply add the extension via the github pages.

> https://antonheitz.github.io/sn-whiteboard/whiteboard.json

Also you can self-host the extension, a guide below.

## Self hosting

1. Clone the repo:

```
git clone git@github.com:antonheitz/sn-whiteboard.git
cd sn-whiteboard
```

2. Install the dependencies with `yarn install`.
3. Build the extension with `yarn build`.
4. Serve the `build` folder that got created in 3. Please keep in mind that only the Desktop App will allow extensions not served via HTTPS.

Hint: to serve the build folder you can use the recomended `sudo npm install -g http-server` and run `yarn server` in the root of the project. Then the extension link will be `http://localhost:3000/whiteboard.json`.

# Have fun drawing
