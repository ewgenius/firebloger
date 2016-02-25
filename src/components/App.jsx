import 'normalize.css';
import 'styles/App.scss';

import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
import Paper from 'material-ui/lib/paper';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import IconButton from 'material-ui/lib/icon-button';
import RaisedButton from 'material-ui/lib/raised-button';
import EditorFormatBold from 'material-ui/lib/svg-icons/editor/format-bold';
import EditorFormatItalic from 'material-ui/lib/svg-icons/editor/format-italic';
import EditorFormatUnderlined from 'material-ui/lib/svg-icons/editor/format-underlined';
import EditorFormatListBulleted from 'material-ui/lib/svg-icons/editor/format-list-bulleted';
import EditorFormatListNumbered from 'material-ui/lib/svg-icons/editor/format-list-numbered';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    this.onChange = (editorState) => this.setState({editorState});
  }

  handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  _onBoldClick() {
    const {editorState} = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }

  _onItalicClick() {
    const {editorState} = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  }

  render() {
    const {editorState} = this.state;
    return (
      <div className="app">
        <Paper>
          <Toolbar className="toolbar">
            <ToolbarGroup float="left">
              <IconButton style={{marginTop: 4}} onClick={this._onBoldClick.bind(this)}><EditorFormatBold/></IconButton>
              <IconButton style={{marginTop: 4}} onClick={this._onItalicClick.bind(this)}><EditorFormatItalic/></IconButton>
              <IconButton style={{marginTop: 4}}><EditorFormatUnderlined/></IconButton>
              <IconButton style={{marginTop: 4}}><EditorFormatListBulleted/></IconButton>
              <IconButton style={{marginTop: 4}}><EditorFormatListNumbered/></IconButton>
            </ToolbarGroup>
          </Toolbar>
          <div className="content">
            <Editor className="editor" editorState={editorState} onChange={this.onChange} handleKeyCommand={this.handleKeyCommand}/>
          </div>
        </Paper>
      </div>
    );
  }
}

App.defaultProps = {};

export default App;
