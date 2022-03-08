
## <img src='https://user-images.githubusercontent.com/64287087/157335433-db53e4ab-1e63-4bd5-93ca-ee25a38111b1.png' width=35px /> Auto Tab Group Extension <img src='https://user-images.githubusercontent.com/64287087/157335433-db53e4ab-1e63-4bd5-93ca-ee25a38111b1.png' width=35px />

![tabs](https://user-images.githubusercontent.com/64287087/157336357-667546c5-f42a-47bf-8afe-9c25d617d240.png)

<p align='center'>
<img src='https://user-images.githubusercontent.com/64287087/157335341-ac6f2629-34cd-4618-a116-59dcb60831b7.png' width=450px />
</p>

- Chromium browser extension (Chrome/Brave)
- **[Download link](https://chrome.google.com/webstore/detail/auto-tab-groups/nicjeeimgboiijpfcgfkbemiclbhfnio?hl=en)**

## Youtube Guide
<p align='center'>
<a href="https://www.youtube.com/watch?v=aLIIAZAC4bo">
<img width='450px' src="https://img.youtube.com/vi/aLIIAZAC4bo/maxresdefault.jpg" />
</a>
</p>


## Extension Overview 

- Automatically sorts tabs using [Google Tab Groups](https://blog.google/products/chrome/manage-tabs-with-google-chrome/) 
- Sorts automatically each time a page is loaded or updated. 

### Inputs
- `Selector`: Group selector to add/edit/delete
- `Title`: Name of sorted tab group
- `Domain`: String in URL to determine grouping
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


