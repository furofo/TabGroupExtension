"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editButtonLogic = exports.saveButtonLogic = exports.deleteButtonLogic = exports.goBackButtonLogic = exports.isChecked = exports.updateInputWhenTyped = exports.isBlank = exports.toggleDisplays = exports.toggleInputAndDropdown = exports.toggleDropdownBox = exports.toggleInputDisabled = exports.toggleElementDisplay = exports.populateTabGroupsArrayFromChromeStorage = exports.reorderTabGroups = exports.getTabGroups = exports.addDropDownMenuOnClickListeners = exports.determineClickHandlerInB = exports.toggleButtonText = exports.zoomReg = exports.zoomLg = exports.tabGroupsArray = exports.isCheckedArray = exports.editAddButton = exports.addButton = exports.gobackButton = exports.deleteButton = void 0;
var popup_1 = require("./popup");
var alertBoxes_1 = require("./alertBoxes");
// get variables for buttons ahere
exports.deleteButton = document.getElementById('delete-group');
exports.gobackButton = document.getElementById('go-back');
exports.addButton = document.getElementById('add-group');
exports.editAddButton = document.getElementById('edit-add-group');
exports.isCheckedArray = document.querySelectorAll('.container input');
var colors = { 'blue': '#8ab4f7', 'yellow': '#fed663', 'purple': '#c589f9', 'green': '#81c895', 'red': '#f18b82', 'pink': '#ff8bcb', 'orange': '#fbac70', 'cyan': '#78d9ec', 'grey': 'grey' };
var tabGroupsPromiseResolve;
var tabGroupsPromise = new Promise(function (resolve) {
    tabGroupsPromiseResolve = resolve;
});
function isNotEmptyObject(obj) {
    return Object.keys(obj).length > 0;
}
exports.tabGroupsArray = [];
exports.zoomLg = document.getElementById('zoom-lg');
exports.zoomReg = document.getElementById('zoom-reg');
// function that switches a btn elements inner html between two strings
var toggleButtonText = function (btn, str1, str2) {
    btn.innerHTML = (btn.innerHTML === str1) ? str2 : str1;
};
exports.toggleButtonText = toggleButtonText;
// Looks at second argument for parent element, if it has parent element
// that doesn't have class of dropdown and doesn't match element in the elmeArr toggles
// active-box away from it, ignores drop down when clicked since
// we have a functoin for that already that toggles when that is clicked among other things.
var determineClickHandlerInB = function (elemArr, elemToMatch) {
    for (var i = 0; i < elemArr.length; i += 1) {
        if (elemToMatch.parentElement) {
            // check if the element is the svg clicked, the path in the svg or dropdown, if any of these
            // use the other click handler set for dropdown instead
            // without this two click events are fired leading to issues with drop down boxes not closing properly
            if (!elemToMatch.classList.contains('dropdown')
                && !elemToMatch.parentElement.classList.contains('dropdown') && elemToMatch.tagName !== 'path'
                && elemToMatch.parentElement !== elemArr[i]) {
                elemArr[i].classList.toggle('active-box');
            }
        }
    }
};
exports.determineClickHandlerInB = determineClickHandlerInB;
// this loops through all visible drop down boxes and assigns htem on click listeners
function addDropDownMenuOnClickListeners() {
    var dropDownAll = document.querySelectorAll('.dropdown');
    var boxAll = document.querySelectorAll('.box');
    var _loop_1 = function (i) {
        dropDownAll[i].onclick = function () {
            for (var j = 0; j < boxAll.length; j++) {
                if (i !== j && boxAll[j].classList.contains('active-box')) {
                    boxAll[j].classList.toggle('active-box');
                }
            }
            boxAll[i].classList.toggle('active-box');
        };
        var _loop_2 = function (color) {
            if (color === 'grey')
                return "continue";
            var colorBox = boxAll[i].querySelector(".".concat(color, "-box")); // Casting here
            if (colorBox !== null) {
                colorBox.onclick = function (event) {
                    var targetElement = event.currentTarget;
                    if (targetElement && targetElement.parentElement) {
                        targetElement.parentElement.style.backgroundColor = colors[color];
                        targetElement.parentElement.classList.toggle('active-box');
                        targetElement.parentElement.setAttribute('value', color);
                    }
                };
            }
        };
        for (var color in colors) {
            _loop_2(color);
        }
    };
    for (var i = 0; i < dropDownAll.length; i++) {
        _loop_1(i);
    }
}
exports.addDropDownMenuOnClickListeners = addDropDownMenuOnClickListeners;
function getTabGroups() {
    return tabGroupsPromise;
}
exports.getTabGroups = getTabGroups;
//this takes an array of Object representing tabGroup Rules and this returns an copy array of Objects but renames the property of them to represent the GROUP number
//starts with GROUP1 and goes on until the end of the array. This is to prevent situation where Tab Group 1 deleted last time and tab group 2 repeats for instance, guarinties unique tab
// group names
function reorderTabGroups(tabGroupsArrayOfObjects) {
    var newTabGroups = [];
    var groupNumberForNewTabGroups = 1;
    for (var i = 0; i < tabGroupsArrayOfObjects.length; i++) {
        if (isNotEmptyObject(tabGroupsArrayOfObjects[i])) {
            var tabGroup = tabGroupsArrayOfObjects[i];
            for (var key in tabGroup) {
                var newKey = "GROUP" + groupNumberForNewTabGroups;
                groupNumberForNewTabGroups += 1;
                var newObject = {};
                newObject[newKey] = tabGroup[key];
                newTabGroups.push(newObject);
            }
        }
    }
    return newTabGroups;
}
exports.reorderTabGroups = reorderTabGroups;
function populateTabGroupsArrayFromChromeStorage() {
    return __awaiter(this, void 0, void 0, function () {
        var result, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, chrome.storage.sync.get(['TABGROUPS'])];
                case 1:
                    result = _a.sent();
                    //put all TabGroup Rules in to TabGroups Array
                    exports.tabGroupsArray = [];
                    if (!(Object.keys(result).length !== 0)) return [3 /*break*/, 3];
                    //first thing we do is initzlze array to blank array to make sure it wlways starts empty 
                    for (i = 0; i < result.TABGROUPS.length; i += 1) {
                        if (result.TABGROUPS[i] !== null) {
                            exports.tabGroupsArray.push(result.TABGROUPS[i]);
                        }
                    }
                    exports.tabGroupsArray = reorderTabGroups(exports.tabGroupsArray);
                    return [4 /*yield*/, chrome.storage.sync.set({ TABGROUPS: exports.tabGroupsArray })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, exports.tabGroupsArray];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.populateTabGroupsArrayFromChromeStorage = populateTabGroupsArrayFromChromeStorage;
// get chrome storage tabgropus object 
window.onload = function () { return __awaiter(void 0, void 0, void 0, function () {
    var settingsIcon, result, i, ruleElement, checkedNameField, checkedUrlField, box, group;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                settingsIcon = document.getElementById('settings-icon');
                // Check if the element exists to avoid null reference errors
                if (settingsIcon) {
                    // Add a click event listener to the SVG element
                    settingsIcon.addEventListener('click', function () {
                        // Log the SVG element to the console when it is clicked
                        console.log("settings wheel clicked", settingsIcon);
                        chrome.runtime.openOptionsPage();
                    });
                }
                return [4 /*yield*/, chrome.storage.sync.get(['TABGROUPS'])];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, populateTabGroupsArrayFromChromeStorage()];
            case 2:
                _a.sent();
                if (Object.keys(result).length !== 0 && result['TABGROUPS'] !== null) {
                    for (i = 0; i < exports.tabGroupsArray.length; i += 1) {
                        ruleElement = (0, popup_1.createRuleElement)();
                        checkedNameField = ruleElement.querySelector('.name-content > input');
                        checkedUrlField = ruleElement.querySelector('.flex-center');
                        box = ruleElement.querySelector('.box');
                        group = Object.keys(exports.tabGroupsArray[i])[0];
                        if (Object.prototype.hasOwnProperty.call(exports.tabGroupsArray[i], group)
                            && exports.tabGroupsArray[i][group].NAME !== undefined) {
                            checkedNameField.setAttribute('value', exports.tabGroupsArray[i][group].NAME);
                            checkedUrlField.setAttribute('value', exports.tabGroupsArray[i][group].URL.join(', '));
                            box.setAttribute('value', exports.tabGroupsArray[i][group].COLOR);
                            box.style.backgroundColor = colors[exports.tabGroupsArray[i][group].COLOR];
                            checkedUrlField.value = exports.tabGroupsArray[i][group].URL.join(', '); // Assuming URL is an array of strings
                            checkedNameField.value = exports.tabGroupsArray[i][group].NAME;
                        }
                    }
                }
                return [2 /*return*/];
        }
    });
}); };
// Switches an elements display between none and block
var toggleElementDisplay = function (elem) {
    var selectedElem = elem;
    if (window.getComputedStyle(selectedElem, null).display === 'block') {
        selectedElem.style.display = 'none';
    }
    else {
        selectedElem.style.display = 'block';
    }
};
exports.toggleElementDisplay = toggleElementDisplay;
// Toggles input disabled from true and false and border to none and solid px effectively
var toggleInputDisabled = function (elem) {
    elem.disabled = !elem.disabled;
    elem.style.border = elem.disabled ? 'none' : '1px solid grey';
};
exports.toggleInputDisabled = toggleInputDisabled;
// Hides and unhides the dropdown box for the color picker box
var toggleDropdownBox = function (elem) {
    var selectedElem = elem;
    selectedElem.style.display = (window.getComputedStyle(selectedElem, null).display === 'none') ? 'flex' : 'none';
};
exports.toggleDropdownBox = toggleDropdownBox;
// helper function for toggling input and dropdown
var toggleInputAndDropdown = function (nameField, urlField, dropDown) {
    (0, exports.toggleInputDisabled)(nameField);
    (0, exports.toggleInputDisabled)(urlField);
    (0, exports.toggleDropdownBox)(dropDown);
};
exports.toggleInputAndDropdown = toggleInputAndDropdown;
// helper function for toggling display elements
var toggleDisplays = function (button) {
    var goBackButton = document.getElementById('go-back');
    var deleteButton = document.getElementById('delete-button');
    if (goBackButton) {
        (0, exports.toggleElementDisplay)(goBackButton);
    }
    if (deleteButton) {
        (0, exports.toggleElementDisplay)(deleteButton);
    }
    (0, exports.toggleButtonText)(button, "Select", "Save");
};
exports.toggleDisplays = toggleDisplays;
// helper function for setting field values
var setValues = function (nameField, urlField, box, title, url, color) {
    nameField.setAttribute('value', title);
    nameField.value = title;
    urlField.setAttribute('value', url[0]);
    urlField.value = url[0];
    box.setAttribute('color', color);
    box.style.backgroundColor = colors[color];
};
// Returns true if either name or url or color field is blank if it is checked in tool false othersiwe
var isBlank = function (isCheckedArray, checkedNameField, checkedUrlField, boxField) {
    for (var i = 0; i < isCheckedArray.length; i += 1) {
        if (isCheckedArray[i].checked) {
            if (!checkedNameField[i].value || !checkedUrlField[i].value
                || boxField[i].getAttribute('value') === 'grey') {
                return true;
            }
        }
    }
    return false;
};
exports.isBlank = isBlank;
function updateInputWhenTyped(e) {
    var target = e.target;
    target.setAttribute('value', target.value);
}
exports.updateInputWhenTyped = updateInputWhenTyped;
// Loops through list and sees if a value is checked, if not returns false otherwise returns true
var isChecked = function (isCheckedArray) {
    var checkedInput = false;
    for (var i = 0; i < isCheckedArray.length; i += 1) {
        if (isCheckedArray[i].checked)
            checkedInput = true;
    }
    return checkedInput;
};
exports.isChecked = isChecked;
var goBackButtonLogic = function (isCheckedArray, dropDownBox) {
    var _a, _b;
    // toggle element display buttons
    if (exports.editAddButton && exports.addButton && exports.gobackButton) {
        // toggle element display buttons
        (0, exports.toggleDisplays)(exports.editAddButton);
        (0, exports.toggleElementDisplay)(exports.addButton);
        (0, exports.toggleElementDisplay)(exports.deleteButton);
    }
    // update pointer events for check boxes
    document.querySelectorAll('.container').forEach(function (e) {
        e.style.pointerEvents = 'auto';
    });
    // loop through the tabGroupsArray and set corresponding values
    // essentially reverts to original state before edits were made
    var allRules = document.querySelectorAll(".center.rule");
    for (var i = 0; i < exports.tabGroupsArray.length; i++) {
        var checkedNameField = document.querySelectorAll('.name')[i];
        var checkedUrlField = document.querySelectorAll('.flex-center')[i];
        var box = document.querySelectorAll('.box')[i];
        // const group = `GROUP${String(i + 1)}`
        var group = Object.keys(exports.tabGroupsArray[i])[0];
        var title = void 0, url = void 0, color = void 0;
        if (Object.keys(exports.tabGroupsArray[i]).length !== 0) {
            _a = [exports.tabGroupsArray[i][group].NAME, exports.tabGroupsArray[i][group].URL, exports.tabGroupsArray[i][group].COLOR], title = _a[0], url = _a[1], color = _a[2];
        }
        else {
            _b = ['', [''], 'grey'], title = _b[0], url = _b[1], color = _b[2];
        }
        url = url.join(', ');
        setValues(checkedNameField, checkedUrlField, box, title, url, color);
        if (!isCheckedArray[i].checked)
            continue;
        isCheckedArray[i].checked = false;
        (0, exports.toggleInputAndDropdown)(checkedNameField, checkedUrlField, dropDownBox[i]);
    }
    if (allRules.length > exports.tabGroupsArray.length) {
        allRules[allRules.length - 1].remove();
    }
};
exports.goBackButtonLogic = goBackButtonLogic;
var deleteButtonLogic = function (isCheckedArray) { return __awaiter(void 0, void 0, void 0, function () {
    var ruleElements, ruleElementIndexesToRemove, i, checkedNameField, checkedUrlField, box, checkedItem, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, populateTabGroupsArrayFromChromeStorage()];
            case 1:
                _a.sent();
                ruleElements = document.querySelectorAll('.center.rule');
                ruleElementIndexesToRemove = [];
                for (i = 0; i < isCheckedArray.length; i += 1) {
                    checkedNameField = document.querySelectorAll('.name')[i];
                    checkedUrlField = document.querySelectorAll('.flex-center')[i];
                    box = document.querySelectorAll('.box')[i];
                    checkedItem = document.querySelectorAll('.container input')[i];
                    // runs on last item, if checked => remove everything and end here, if not => return 
                    if (isCheckedArray[i].checked) {
                        setValues(checkedNameField, checkedUrlField, box, '', '', 'grey');
                        checkedItem.checked = false;
                        ruleElementIndexesToRemove.push(i);
                        // remove this from tabsGroupArray which should be array of all groups retrieved from google Sync
                        exports.tabGroupsArray.splice(i, 1, {});
                    }
                }
                for (i = 0; i < ruleElementIndexesToRemove.length; i++) {
                    ruleElements[ruleElementIndexesToRemove[i]].remove();
                }
                exports.tabGroupsArray = reorderTabGroups(exports.tabGroupsArray);
                chrome.storage.sync.set({ TABGROUPS: exports.tabGroupsArray }, function () {
                });
                return [2 /*return*/];
        }
    });
}); };
exports.deleteButtonLogic = deleteButtonLogic;
// save logic
var saveButtonLogic = function (button, inputBox, isCheckedArray, checkedNameField, checkedUrlField, boxField, dropDownBox) {
    var _a, _b;
    // your existing code here
    if ((0, exports.isBlank)(isCheckedArray, checkedNameField, checkedUrlField, boxField)) {
        alertBoxes_1.ModalWindow.openModal({
            title: 'Field is Blank!',
            content: 'Make sure name and url fields are not blank, and color box is not grey!'
        });
        return;
    }
    var tabGroupsArray = [];
    isCheckedArray = Array.from(document.querySelectorAll('.container input'));
    // unchecks everything that is checked
    for (var i = 0; i < isCheckedArray.length; i += 1) {
        var groupNumber = "GROUP".concat(String(i + 1));
        // const groupNumber =  Date.now() + Math.random();
        inputBox[i].style.pointerEvents = 'auto';
        // let matchingText = checkedUrlField[i].value;
        // let matchingTextSplitComma = matchingText.split(',');
        // let matchingTextRemoveSpace = matchingTextSplitComma.map((item) => item.trim());
        if (isCheckedArray[i].checked) {
            tabGroupsArray.push((_a = {},
                _a[groupNumber] = {
                    COLOR: document.querySelectorAll('.box')[i].getAttribute('value'),
                    NAME: checkedNameField[i].value,
                    URL: checkedUrlField[i].value.split(',').map(function (item) { return item.trim(); }),
                },
                _a));
            (0, exports.toggleInputAndDropdown)(checkedNameField[i], checkedUrlField[i], dropDownBox[i]);
            isCheckedArray[i].checked = false;
        }
        else if (checkedNameField[i].value && checkedUrlField[i].value
            && boxField[i].getAttribute('value') !== 'grey') {
            tabGroupsArray.push((_b = {},
                _b[groupNumber] = {
                    COLOR: document.querySelectorAll('.box')[i].getAttribute('value'),
                    NAME: checkedNameField[i].value,
                    URL: checkedUrlField[i].value.split(',').map(function (item) { return item.trim(); }),
                },
                _b));
        }
        else {
            tabGroupsArray.push({});
        }
    }
    chrome.storage.sync.set({ TABGROUPS: tabGroupsArray });
    (0, exports.toggleDisplays)(button);
    (0, exports.toggleElementDisplay)(exports.addButton);
    (0, exports.toggleElementDisplay)(exports.deleteButton);
};
exports.saveButtonLogic = saveButtonLogic;
var editButtonLogic = function (button, isCheckedArray, checkedNameField, checkedUrlField, dropDownBox) {
    for (var i = 0; i < isCheckedArray.length; i += 1) {
        document.querySelectorAll('.container')[i].style.pointerEvents = 'none';
        if (isCheckedArray[i].checked) {
            (0, exports.toggleInputAndDropdown)(checkedNameField[i], checkedUrlField[i], dropDownBox[i]);
        }
    }
    (0, exports.toggleDisplays)(button);
    (0, exports.toggleElementDisplay)(exports.addButton);
    (0, exports.toggleElementDisplay)(exports.deleteButton);
};
exports.editButtonLogic = editButtonLogic;
