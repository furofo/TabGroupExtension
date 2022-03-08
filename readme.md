
## Auto Tab Group Extension 
---
<p align='center'>
<img src='https://user-images.githubusercontent.com/38140593/144671693-1578d049-bcd5-43fd-9227-e065125ae021.png' width=450px />
</p>

- Chromium browser extension (Chrome/Brave)
- **[Download the extension here!](https://chrome.google.com/webstore/detail/auto-tab-groups/nicjeeimgboiijpfcgfkbemiclbhfnio?hl=en)**

## Youtube Guide
---
<p align='center'>
<a href="https://www.youtube.com/watch?v=aLIIAZAC4bo">
<img width='450px' src="https://img.youtube.com/vi/aLIIAZAC4bo/maxresdefault.jpg" />
</a>
</p>


## Extension Overview 

- Automatically sorts chrome tabs using [Google Tab Groups](https://blog.google/products/chrome/manage-tabs-with-google-chrome/) 
- Sorts automatically each time a chrome tab is loaded or updated. 

### Inputs
- `Selector`: Group selector to add/edit/delete
- `Title`: Name of tabgroup that tab gets sorted into
- `Domain`: String in URL to determine tab group
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


