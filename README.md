# Remove Links

- [Description](#description)
- [How to Contribute](#how-to-contribute)
- [Environment Setup](#environment-setup)
  - [Installing](#installing)
  - [Writing](#writing)
  - [Testing](#testing)

## Description

An extension that allows you to disable certain hyperlink protocols on a page. The original purpose was to disable the mailto protocol on ZenDesk. But I figured I would try to make it remove whatever protocols you don't like (http, tel, whatever). This is mostly just me practicing a complete project with all the things a project should have like versioning, deploying to store, documentation, etc.

Current Features:

- Can turn it on and off
- Disables all links on the page
- Disables any future links added to page after initial load
- Can re-enable links whenever you want
- Choose which protocols you want to remove (http, mailto, tel, etc.)

Next:

- Can white-/black-list websites from running the app

Future:

- autofill from [URI scheme list](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml)
- have white-/black-listing pull from current site (pages or entire sites)
- create options page to set values more directly
  - import/export config
- styling
  - create icon for toggle on off
  - make protocols like a tagging system on forums

## How to Contribute

If you would like to contribute, or think there are improvements you can make follow the instructions here to be able to make and test changes.

## Environment Setup

- [Google Chrome](https://www.google.com/chrome/)
- [git](https://git-scm.com/downloads)
- [GitHub](https://github.com/join)
- [ESLint](https://eslint.org/docs/user-guide/getting-started): Used for identifying and reporting on patterns found in ECMAScript/JavaScript code. I like it more than JSLint. Needs [Node](https://nodejs.org/en/download/).

Optional:

- [VS Code](https://code.visualstudio.com/download): My preferred text editor/ IDE.
  Extensions:
  - ESLint: runs ESLint while editing files
  - Markdown All in One: useful shortcuts and commands for markdown
  - markdownlint: cool linter for markdown
  - Spell Right: VS Code doesn't have native spellcheck.
- [iTerm2 + oh-my-zsh](https://gist.github.com/kevin-smets/8568070): just a more useable terminal. I only use it when I'm too lazy to open VS Code though

### Installing

```bash
git clone https://github.com/draav/remove-hyperlink-hrefs.git
```

### Writing

I am using a linter called ESLint, so verify all code written by either installing the VS code extension (it will underline and notify of any violations) or just use the console command:

```bash
eslint file.js
```

It should automatically use the eslintrc.json that's in this repo.

### Testing

- [Load Unpacked extension](https://developer.chrome.com/extensions/getstarted): just check the first few instructions on how to get the app loaded into chrome
- [Debug using Inspector](https://developer.chrome.com/apps/tut_debugging)
