import React from 'react';
import EditorKit, { EditorKitDelegate } from '@standardnotes/editor-kit';
import { TDDocument, Tldraw, TldrawApp } from '@tldraw/tldraw';
import Switch from 'react-switch';

export enum HtmlElementId {
  snComponent = 'sn-component',
  textarea = 'textarea',
}

export enum HtmlClassName {
  snComponent = 'sn-component',
  textarea = 'sk-input contrast textarea',
}

export interface EditorInterface {
  printUrl: boolean;
  text: string;
  darkMode: boolean;
}

const initialState = {
  printUrl: false,
  text: '',
  darkMode: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
};


let keyMap = new Map();

export default class Editor extends React.Component<{}, EditorInterface> {
  private editorKit?: EditorKit;

  constructor(props: EditorInterface) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.configureEditorKit();
  }

  configureEditorKit = () => {
    const delegate: EditorKitDelegate = {
      /** This loads every time a different note is loaded */
      setEditorRawText: (text: string) => {
        this.setState({
          ...initialState,
          text,
        });
      },
      clearUndoHistory: () => { },
      getElementsBySelector: () => [],
    };

    this.editorKit = new EditorKit(delegate, {
      mode: 'plaintext',
      supportsFileSafe: false,
    });
  };

  saveText = (text: string) => {
    this.saveNote(text);
    this.setState({
      text: text,
    });
  };

  saveNote = (text: string) => {
    /**
     * This will work in an SN context, but breaks the standalone editor,
     * so we need to catch the error
     */
    try {
      this.editorKit?.onEditorValueChanged(text);
    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  onKeyDown = (e: React.KeyboardEvent | KeyboardEvent) => {
    keyMap.set(e.key, true);
    // Do nothing if 'Control' and 's' are pressed
    if (keyMap.get('Control') && keyMap.get('s')) {
      e.preventDefault();
    }
  };

  onKeyUp = (e: React.KeyboardEvent | KeyboardEvent) => {
    keyMap.delete(e.key);
  };

  onPictureChange = (app: TldrawApp) => {
    this.saveText(JSON.stringify(app.document));
  };

  handleDarkmodeChange = (checked: boolean, event: MouseEvent | React.SyntheticEvent<KeyboardEvent | MouseEvent, Event>, id: string) => {
    this.setState({ darkMode: checked });
  }

  render() {
    const { text } = this.state;
    var parsed_text: TDDocument | undefined = undefined;
    try {
      parsed_text = JSON.parse(text);
    } catch (e: any) {
      parsed_text = {
          id: 'doc',
          name: 'Note',
          version: TldrawApp.version,
          pages: {
            page: {
              id: 'page',
              shapes: {},
              bindings: {},
            },
          },
          pageStates: {
            page: {
              id: 'page',
              selectedIds: [],
              camera: {
                point: [0, 0],
                zoom: 1,
              }
            },
          },
          assets: {},
        };
    }

    return (
      <div
        className={
          HtmlElementId.snComponent + (this.state.printUrl ? ' print-url' : '')
        }
        id={HtmlElementId.snComponent}
        tabIndex={0}
        style={{ paddingRight: 20 }}
      >
        <div style={{ position: 'absolute', zIndex: 1000, top: 5, left: 5, display: 'flex' }}>
          <Switch onChange={this.handleDarkmodeChange} checked={this.state.darkMode} uncheckedIcon={false} checkedIcon={false} onColor="#7af" />
        </div>
        <div style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
          <Tldraw document={parsed_text} showPages={false} darkMode={this.state.darkMode} showMenu={false} onPersist={this.onPictureChange} />
        </div>
      </div>
    );
  }
}
