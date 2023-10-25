
## <img src='https://user-images.githubusercontent.com/64287087/159755213-939e9420-6a14-469c-81fb-d8906f0aa553.png' width=35px />[Auto Tab Group Extension](https://chrome.google.com/webstore/detail/auto-tab-groups/nicjeeimgboiijpfcgfkbemiclbhfnio?hl=en) <img src='https://user-images.githubusercontent.com/64287087/159755213-939e9420-6a14-469c-81fb-d8906f0aa553.png' width=35px />
---

<!-- ![bar](https://user-images.githubusercontent.com/64287087/159754725-e75cab4f-845e-4fe5-bee7-703c9184359d.png) -->

<p align='center'>
  <img src='https://user-images.githubusercontent.com/64287087/159754725-e75cab4f-845e-4fe5-bee7-703c9184359d.png' width=1000px />
<img src='https://user-images.githubusercontent.com/64287087/159754660-1ce732a5-6ed4-42f5-8bce-1b1940a93ebd.png' width=400px />

</p>

- Chromium browser extension (Chrome/Brave)
- **[Download link](https://chrome.google.com/webstore/detail/auto-tab-groups/nicjeeimgboiijpfcgfkbemiclbhfnio?hl=en)**

## Youtube Guide
<p align='center'>
<a href="https://www.youtube.com/watch?v=sloz6SB8Id0">
<img width='450px' src="https://img.youtube.com/vi/aLIIAZAC4bo/maxresdefault.jpg" />
</a>
</p>


## Extension Overview 

- Automatically sorts tabs using [Google Tab Groups](https://blog.google/products/chrome/manage-tabs-with-google-chrome/) 
- Sorts automatically each time a page is loaded or updated. 

### Inputs
- `Selector`: Group selector to add/edit/delete
- `Title`: Name of sorted tab group
- `Domain`: String in URL to determine grouping, can separate multiple urls with commas
- `Color`: Tab group color

Make sure to set all values ***no fields can be left blank*** or the extension will throw a descriptive error

### Edit/Add Rule(s)
---
- `Select` one or multiple checkboxes on the left. 
- Add a  `Title`, `Domain`, and `Color` then click `SAVE GROUP(s)` button.

### Delete Rule(s)
---
- Check one or multiple checkboxes on the left and click `Delete Group(s)`
- Click `Confirm` on pop up window to proceed

***This will permantly delete your rule though so keep this in mind.***


## How Tool Works
---
- Extension does not collect any data other than rule preferences and stores that in local variables for help with logic
- Back-end logic triggered upon page load
1.  Loads an object from google.sync that represents the rules a user has set. 
2. Loads all tab groups currently present on page
3. If url visited follows one of the rules set, it looks to see if any of the current tab groups has the same name and puts tab in that group. 
4. If not it creates a new tab group with rule, name, and color. 

Rule preferences are saved and retrieved using chrome.storage API detailed here https://developer.chrome.com/docs/extensions/reference/storage/ 

## Running locally
---
-Project is configured to run via typescript and when files are compiled to javascript are moved to dist folder.
-Tests are configured to run via Jest.
-To run locally make sure typescript installed, clone repo, make sure dist folder is added to root of project.

