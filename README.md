# FLINT JSON Editor
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

The `FLINT JSON Editor` is a platform-independent desktop app built on [`Electron`](https://www.electronjs.org/), [`React`](https://reactjs.org/) and [`Webpack`](https://webpack.js.org/). It is mainly used to create projects from pre-defined packages/set of JSON files. It can be used to create a CFG file by choosing a set of JSON files, or to open a project or set of JSON files either in a scratch based JSON editor or in a form-based editor. It is then used to power FLINT and its models.

## Key Features 

-   Users can choose a specific type of project and the application would create a set of JSON templates, which can then be easily edited by users. FLINT uses JSON files for a particular type of project like `Standard GCBM Project`, `GCBM + Peatland Project` and more, thus easing the process for users.
-   Users can choose the files for a project and choose to create a CFG file that points to the JSON files which are used for a particular project. It is aided by a `transfer-list` implementation where a CFG file can be created along with the corresponding JSON files. 
-   With the Open Project feature, Users won't need to select JSON files multiple times. We can now open a project which consists of multiple JSON files at one go and the users will also have the flexibility to remove JSON files from the dashboard before launching the editor.
-   A **ScratchJSONEditor** and **Form-like Editors** has been built from scratch to create/edit JSON files.
-   From a UI/UX perspective, a drag-and-drop feature has been added to drag a tab from one position to another.. The directory of the currently opened file is also shown at the title bar of the application.     

Have a look at the [Wiki Section](https://github.com/moja-global/FLINT-JSON-Interface/wiki/Google-Summer-of-Code%2720-documentation-by-Abhishek-Garain) of the Project to get a deep dive into the whole project and understand it from a user perspective.

## Development Setup

Before setting up the local dependenices, make sure that the latest version of [NodeJS](https://nodejs.org/), [NPM](https://www.npmjs.com/) and [Yarn](https://yarnpkg.com/) are installed. Follow the below mentioned steps to get started: 

1. Clone the repository and enter into the directory: 
	```
	git clone https://github.com/moja-global/FLINT-JSON-Interface
    cd FLINT-JSON-Interface/FLINT_JSON_Editor
    ```
2. Install the dependenices: 
	```
	npm install
	```
3. Start the Project: 
	```
	npm start
	```
## Installation

The app is built on ElectronJS which explains that the application is meant to be platform independent. The `v1` release can be found on the [GitHub Releases](https://github.com/moja-global/GSoC.FLINT.JSON_Interface/releases/tag/v1.0.0).

| [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Windows_logo_-_2012.svg/480px-Windows_logo_-_2012.svg.png" width=100 />](https://github.com/moja-global/GSoC.FLINT.JSON_Interface/releases/download/v1.0.0/flint_json_editor-1.0.0.Setup.exe) | [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Logo-ubuntu_cof-orange-hex.svg/1024px-Logo-ubuntu_cof-orange-hex.svg.png" width=100 />](https://github.com/moja-global/GSoC.FLINT.JSON_Interface/releases/download/v1.0.0/flint-json-editor_1.0.0_amd64.deb)  | [<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fedora_logo.svg/1024px-Fedora_logo.svg.png" width=100 />](https://github.com/moja-global/GSoC.FLINT.JSON_Interface/releases/download/v1.0.0/flint_json_editor-1.0.0-1.x86_64.rpm)  | [<img src="https://upload.wikimedia.org/wikipedia/commons/7/71/Finder_icon_macOS_Yosemite.png" width=100 /> ](https://github.com/moja-global/FLINT-JSON-Interface/releases/download/v1.0.0/flint_json_editor_1.0.0.dmg) | [<img src="https://cdn.pixabay.com/photo/2018/09/12/02/52/file-icon-3671167_960_720.png" width=100 />](https://github.com/moja-global/GSoC.FLINT.JSON_Interface/releases/download/v1.0.0/flint_json_editor-darwin-x64-1.0.0.zip) |
|---|---|---|---|---|

## Reporting Issues

Have a look at the below steps to get started with reporting bugs as a user or developer:

1. Navigate to the main page of the repository where you found the bug.
2. Under the repository name, click **Issues**.
3. Click the green **New Issue** button
4. Click the green button **Get Started** in the Bug Report box.
5. Use a clear and descriptive title.
6. Follow the template and provide as much information as possible.
7. Add ways through which the bug can be reproduced by the maintainer.
8. Attach files, screenshots and/or animated GIFs.
9. Click the green button **Submit New Issue** at the bottom right corner.

## How to Get Involved?  

moja global welcomes a wide range of contributions as explained in [Contributing document](https://github.com/moja-global/About-moja-global/blob/master/CONTRIBUTING.md) and in the [About moja-global Wiki](https://github.com/moja-global/.github/wiki).  

## FAQ and Other Questions  

* You can find FAQs on the [Wiki](https://github.com/moja.global/.github/wiki).  
* If you have a question about the code, submit [user feedback](https://github.com/moja-global/About-moja-global/blob/master/Contributing/How-to-Provide-User-Feedback.md) in the relevant repository  
* If you have a general question about a project or repository or moja global, [join moja global](https://github.com/moja-global/About-moja-global/blob/master/Contributing/How-to-Join-moja-global.md) and 
    * [submit a discussion](https://help.github.com/en/articles/about-team-discussions) to the project, repository or moja global [team](https://github.com/orgs/moja-global/teams)
    * [submit a message](https://get.slack.help/hc/en-us/categories/200111606#send-messages) to the relevant channel on [moja global's Slack workspace](mojaglobal.slack.com). 
* If you have other questions, please write to info@moja.global   
  

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://moja.global"><img src="https://avatars1.githubusercontent.com/u/19564969?v=4" width="100px;" alt=""/><br /><sub><b>moja global</b></sub></a><br /><a href="#projectManagement-moja-global" title="Project Management">📆</a></td>
    <td align="center"><a href="http://abhi-blogs.web.app"><img src="https://avatars1.githubusercontent.com/u/36303692?v=4" width="100px;" alt=""/><br /><sub><b>Abhishek Garain</b></sub></a><br /><a href="https://github.com/moja-global/GSoC.FLINT.JSON_Interface/commits?author=abhi211199" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mfellows"><img src="https://avatars0.githubusercontent.com/u/8548157?v=4" width="100px;" alt=""/><br /><sub><b>Max Fellows</b></sub></a><br /><a href="https://github.com/moja-global/GSoC.FLINT.JSON_Interface/pulls?q=is%3Apr+reviewed-by%3Amfellows" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="https://github.com/gmajan"><img src="https://avatars0.githubusercontent.com/u/8733319?v=4" width="100px;" alt=""/><br /><sub><b>Guy Janssen</b></sub></a><br /><a href="https://github.com/moja-global/GSoC.FLINT.JSON_Interface/pulls?q=is%3Apr+reviewed-by%3Agmajan" title="Reviewed Pull Requests">👀</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!


## Maintainers Reviewers Ambassadors Coaches

The following people are Maintainers Reviewers Ambassadors or Coaches  
<table><tr>
  <td align="center"><a href="http://abhi-blogs.web.app"><img src="https://avatars1.githubusercontent.com/u/36303692?v=4" width="100px;" alt=""/><br /><sub><b>Abhishek Garain</b></sub></a><br /><a href="https://github.com/moja-global/GSoC.FLINT.JSON_Interface/commits?author=abhi211199" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mfellows"><img src="https://avatars0.githubusercontent.com/u/8548157?v=4" width="100px;" alt=""/><br /><sub><b>Max Fellows</b></sub></a><br /><a href="https://github.com/moja-global/GSoC.FLINT.JSON_Interface/pulls?q=is%3Apr+reviewed-by%3Amfellows" title="Reviewed Pull Requests">👀</a></td>  
</tr>
</table>

**Maintainers** review and accept proposed changes  
**Reviewers** check proposed changes before they go to the Maintainers  
**Ambassadors** are available to provide training related to this repository  
**Coaches** are available to provide information to new contributors to this repository  
