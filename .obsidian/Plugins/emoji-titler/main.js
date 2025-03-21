/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => EmojiTitlerPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian2 = require("obsidian");

// src/settings.ts
var import_obsidian = require("obsidian");
var EmojiTitlerSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app2, plugin) {
    super(app2, plugin);
    this.EmojiSettings = [];
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Emoji Titler Settings" });
    new import_obsidian.Setting(this.containerEl).setDesc("Note! This plugin does not have default shortcuts set to prevent shortcut conflicts. Assign shortcuts for each emoji directly. A good option is to use Ctrl(Cmd)+Shift in combination with a number to assign each emoji, and the - key for deletion.").addButton((cb) => {
      cb.setButtonText("Specify shortcuts").setCta().onClick(() => {
        app.setting.openTabById("hotkeys");
        const tab = app.setting.activeTab;
        tab.searchInputEl.value = `Emoji Titler:`;
        tab.updateHotkeyVisibility();
      });
    });
    containerEl.createEl("h2", { text: "Specify Emojis" });
    new import_obsidian.Setting(this.containerEl).setDesc("Add new emoji setting / Delete the last one").addButton((cb) => {
      cb.setIcon("plus").setCta().onClick(() => {
        const newIndex = this.plugin.settings.emojis.length;
        this.plugin.settings.emojis.push({ id: newIndex, name: "", emoji: "" });
        this.addEmojiSetting(newIndex);
        this.plugin.addCommand(this.plugin.getInsertCmd(newIndex));
      });
    }).addButton((cb) => {
      cb.setIcon("minus").onClick(() => {
        const removedEmoji = this.plugin.settings.emojis.pop();
        if (removedEmoji) {
          const removedEmojiSet = this.EmojiSettings.pop();
          this.containerEl.removeChild(removedEmojiSet.settingEl);
          this.plugin.app.commands.removeCommand(
            `${this.plugin.manifest.id}:${this.plugin.getInsertCmd(removedEmoji.id)["id"]}`
          );
        }
      });
    });
    for (let i = 0; i < this.plugin.settings.emojis.length; i++) {
      this.addEmojiSetting(i);
    }
  }
  addEmojiSetting(newIndex) {
    const setting = new import_obsidian.Setting(this.containerEl).setName(`emoji ${newIndex}`).addText(
      (text) => text.setPlaceholder(`emoji ${newIndex}`).setValue(this.plugin.settings.emojis[newIndex].emoji).onChange(async (value) => {
        this.plugin.settings.emojis[newIndex].emoji = value;
        await this.plugin.saveSettings();
      })
    );
    this.EmojiSettings.push(setting);
  }
};

// src/main.ts
var DEFAULT_SETTINGS = {
  emojis: [
    { id: 0, name: "seedling", emoji: "\u{1F331}" },
    { id: 1, name: "leaves", emoji: "\u{1F33F}" },
    { id: 2, name: "tree", emoji: "\u{1F333}" },
    { id: 3, name: "done", emoji: "\u2705" },
    { id: 4, name: "", emoji: "" }
  ],
  tag_on: true
};
var EmojiTitlerPlugin = class extends import_obsidian2.Plugin {
  async onload() {
    await this.loadSettings();
    for (let i = 0; i < this.settings.emojis.length; i++) {
      this.addCommand(this.getInsertCmd(i));
    }
    this.addSettingTab(new EmojiTitlerSettingTab(this.app, this));
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  getInsertCmd(index) {
    return {
      id: `insert-emoji-${index}`,
      name: `Insert emoji ${index} in title`,
      callback: async () => {
        await this.editEmojiTitle(this.settings.emojis[index]);
      }
    };
  }
  async editEmojiTitle(input_emoji) {
    const file = this.app.workspace.getActiveFile();
    if (!(file instanceof import_obsidian2.TFile)) {
      return;
    }
    let newName = file.basename;
    const newNameArr = [...newName];
    if (newNameArr[0] == input_emoji.emoji) {
      newNameArr.shift();
      newName = newNameArr.join("");
    } else {
      for (let i = 0; i < this.settings.emojis.length; i++) {
        if (newNameArr[0] == this.settings.emojis[i].emoji) {
          newNameArr.shift();
          newName = newNameArr.join("");
          break;
        }
      }
      newName = `${input_emoji.emoji}${newName}`;
    }
    const newPath = file.getNewPathAfterRename(newName);
    await this.app.fileManager.renameFile(file, newPath);
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async onunload() {
  }
};


/* nosourcemap */