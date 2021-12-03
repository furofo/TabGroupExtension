
# Auto Tab Group Extension 

![image](https://user-images.githubusercontent.com/38140593/144671693-1578d049-bcd5-43fd-9227-e065125ae021.png)

To use this extension, make sure you use a chromium browser.

[Download the extension here!](https://chrome.google.com/webstore/detail/auto-tab-groups/nicjeeimgboiijpfcgfkbemiclbhfnio?hl=en)

Then to make it easier to use extension click jigsaw button in top right corner beside profile pic. Find the extension there,  then click the pin icon to create an icon you click on by the browser

# Youtube Guide On How To Use Tool


[![Watch the tutorial video](https://img.youtube.com/vi/aLIIAZAC4bo/maxresdefault.jpg)](https://www.youtube.com/watch?v=aLIIAZAC4bo)


## Extension Overview 

This extensions purpose is to auto sort your chrome tabs using Google Tab Groups ( [detailed here](https://blog.google/products/chrome/manage-tabs-with-google-chrome/) ) and rules you set.  You can set up to 3 rules to sort your tabs by and they sort automatically each time a chrome tab is loaded or updated. 

The first column Name is the name of the tabgroup that tab gets sorted into. The second column, MATCHINGTEXT is the string this extension searches in the URL to determine if it goes into this particular tab group. For instance if it is set to "test2" any website you visit with test 2 in the url will be put into this tab group. 

You can also specify multiple terms to search with by separating them with commas. For instance, if you assign a groupd with NAME column of Colors, and MATCHING TEXT of blue, yellow, and green; any url you load with those search terms will go in the Tab Group Named Color.  The final column COLOR, is the color of this tab group that gets set.


When setting these values no fields can be left blank or the extension will throw a descriptive error. To add  or edit a rule check one or multiple checkboxes on the left and click Edit/Add Group Button. Then make sure NAME and MATCHINGTEXT columns have a value and that color box has a value selected then click SAVE GROUP(s) button.


To delete a rule or multiple rules, check one or multiple checkboxes on the left and click DELETE Group Button. This will display a confirmation message askign you if you are sure you want to delete. You can cancel this by clicking red Go Back button or the x in top right corner. To confirm delete click Green Confirm Button. This will permantly delete your rule though so keep this in mind. 

## How Tool Works

This extension does not collect any data other than rule preferences and stores that in local variables for help with logic. When a new tab is created and the page loads, or if current tab is changed to another url and loads, then the backend logic is triggered. First it loads an object from google.sync that represents the rules a user has set. Then it loads all tabgroups currently present on page. If the url visited follows one of the rules set, it looks to see if any of the current tab groups has the same name as that rule. If it does it puts the tab in that group. If not it creates a new tabgroup with the rule name and color. 

Rule preferences are saved and retrieved using chrome.storage API detailed here https://developer.chrome.com/docs/extensions/reference/storage/ 


