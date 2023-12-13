## <img src='https://user-images.githubusercontent.com/64287087/159755213-939e9420-6a14-469c-81fb-d8906f0aa553.png' width=35px />[Auto Tab Group Extension](https://chrome.google.com/webstore/detail/auto-tab-groups/nicjeeimgboiijpfcgfkbemiclbhfnio?hl=en) <img src='https://user-images.githubusercontent.com/64287087/159755213-939e9420-6a14-469c-81fb-d8906f0aa553.png' width=35px />
---

<!-- ![bar](https://user-images.githubusercontent.com/64287087/159754725-e75cab4f-845e-4fe5-bee7-703c9184359d.png) -->

<p align='center'>
  <img src='https://user-images.githubusercontent.com/64287087/159754725-e75cab4f-845e-4fe5-bee7-703c9184359d.png' width=1000px />
  <img src='https://user-images.githubusercontent.com/64287087/159754660-1ce732a5-6ed4-42f5-8bce-1b1940a93ebd.png' width=400px />
</p>

- Chromium browser extension (Chrome/Brave)
- **[Download link](https://chrome.google.com/webstore/detail/auto-tab-groups/nicjeeimgboiijpfcgfkbemiclbhfnio?hl=en)**

## Table of Contents
- [Youtube Guide](#youtube-guide)
- [Update as of 10/25/2023](#update-as-of-10252023)
- [Extension Overview](#extension-overview)
  - [Inputs](#inputs)
  - [Edit/Add Rule(s)](#editadd-rules)
  - [Delete Rule(s)](#delete-rules)
- [How Tool Works](#how-tool-works)
- [Running Locally](#running-locally)

## Youtube Guide
<p align='center'>
  <a href="https://www.youtube.com/watch?v=sloz6SB8Id0">
    <img width='450px' src="https://img.youtube.com/vi/aLIIAZAC4bo/maxresdefault.jpg" />
  </a>
</p>

## UPDATE AS OF 10/25/2023

-- Working on integrating TypeScript and CI/CD pipeline using JEST to run unit tests on code, will comment on code and readme accordingly.
<br/>
The current version uses TypeScript, and Jest to test TypeScript code functionality. This is to make development and testing functionality easier. Then uses Webpack to bundle all JS files into a `bundle.js` file will still work for the chrome extension once compiled down to JavaScript.

## Extension Overview 

- Automatically sorts tabs using [Google Tab Groups](https://blog.google/products/chrome/manage-tabs-with-google-chrome/) 
- Sorts automatically each time a page is loaded or updated. 

### Inputs
- `Selector`: Group selector to add/edit/delete
- `Title`: Name of sorted tab group
- `Domain`: String in URL to determine grouping, can separate multiple URLs with commas
- `Color`: Tab group color

Make sure to set all values ***no fields can be left blank*** or the extension will throw a descriptive error

### Edit/Add Rule(s)
---
- `Select` one or multiple checkboxes on the left. 
- Add a  `Title`, `Domain`, and `Color` then click the `SAVE GROUP(s)` button.

### Delete Rule(s)
---
- Check one or multiple checkboxes on the left and click `Delete Group(s)`
- Click `Confirm` on the pop-up window to proceed

***This will permanently delete your rule though so keep this in mind.***

## How Tool Works
---
- Extension does not collect any data other than rule preferences and stores that in local variables for help with logic
- Back-end logic triggered upon page load
1.  Loads an object from google.sync API that represents the rules a user has set. 
2. Loads all tab groups currently present on the page
3. If the URL visited follows one of the rules set, it looks to see if any of the current tab groups has the same name and puts the tab in that group. 
4. If not it creates a new tab group with the rule, name, and color. 

Rule preferences are saved and retrieved using chrome.storage API detailed here https://developer.chrome.com/docs/extensions/reference/storage/ 

## Running locally

---

1. Make sure you have TypeScript installed globally on your computer.
2. Use Git Clone `git@github.com:furofo/TabGroupExtension.git` for SSH or `git clone https://github.com/furofo/TabGroupExtension.git` for HTTPS.
3. Open the project, and in the command prompt for the root directory, run the command `npm install` to install dependencies.
4. Use `npm run test` to run the Jest tests in the test folder to ensure they pass.
5. Use `npm run build-all` to build all necessary JavaScript files from TypeScript in the correct folders. You should now see a `dist` folder in the root of the project.

<details>
  <summary>JavaScript Structure details</summary> 
  Most of the JavaScript files compile down to a simple `background.js` file in the `dist` folder at the root of the project. The `background.js` is compiled separately because it is needed separately for the background service worker.
  The `options.js` file is also compiled into a separate `options` folder with associated HTML and CSS. This is to keep the logic of the options/settings page separate. 
</details>

6. Go to "manage extensions" or enter `brave://extensions/` in your browser's address bar to access the extensions manager.
7. Make sure "developer mode" is toggled on in the top right corner.
8. Click "load unpacked" in the top left corner.
9. Navigate to the `tabGroupExtensions` folder and select it to load the extension.
10. You should now be able to use the extension!




