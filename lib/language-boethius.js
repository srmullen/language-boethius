'use babel';

import LanguageBoethiusView from './language-boethius-view';
import { CompositeDisposable } from 'atom';

export default {

  languageBoethiusView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageBoethiusView = new LanguageBoethiusView(state.languageBoethiusViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageBoethiusView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-boethius:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageBoethiusView.destroy();
  },

  serialize() {
    return {
      languageBoethiusViewState: this.languageBoethiusView.serialize()
    };
  },

  toggle() {
    console.log('LanguageBoethius was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
