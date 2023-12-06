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
var _this = this;
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ loggingEnabled: false });
});
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        if (key === "loggingEnabled") {
            console.log("Logging is " + (changes[key].newValue ? "enabled" : "disabled"));
        }
    }
});
// looks through a list of search terms and tells you if url is in them
var isSearchTermInUrl = function (url, searchTerms) {
    if (searchTerms) {
        for (var i = 0; i < searchTerms.length; i++) {
            if (url.includes(searchTerms[i])) {
                return true;
            }
        }
        return false;
    }
};
//function looks through a current browswerTabGroupObject and a then a chromeStorageTabGroup Object and if the name of one of the tab group objects
// in the the browser matches the name from chrome storage object it puts in that tab group and returns true, otherwise returns false
function groupTabIfTabGroupExistsInBrowser(browserTabGroupObject, chromeStorageTabGroupObject, tabId) {
    var matchingTabGroupInBrowser = false;
    for (var i = 0; i < browserTabGroupObject.length; i++) {
        if (chromeStorageTabGroupObject &&
            browserTabGroupObject[i].title === chromeStorageTabGroupObject.NAME) {
            matchingTabGroupInBrowser = true;
            chrome.tabs.group({
                tabIds: tabId,
                groupId: browserTabGroupObject[i].id,
            }).catch(function (e) { return console.log('error with chrome tabs group'); });
        }
    }
    return matchingTabGroupInBrowser;
}
// listener that can tell if a tab changes or a  new html page loads or if a new tab is opened
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) { return __awaiter(_this, void 0, void 0, function () {
    var browserTabGroupObject, chromeStorageTabGroupObject_1, url, ungroup, matchingTabGroupInBrowser, _loop_1, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(changeInfo.status === 'complete' && tab.status === 'complete' && tab.url !== undefined)) return [3 /*break*/, 3];
                return [4 /*yield*/, chrome.tabGroups.query({})];
            case 1:
                browserTabGroupObject = _a.sent();
                return [4 /*yield*/, chrome.storage.sync.get(['TABGROUPS'])];
            case 2:
                chromeStorageTabGroupObject_1 = _a.sent();
                url = tab.url;
                if (Object.keys(chromeStorageTabGroupObject_1).length !== 0) {
                    ungroup = true;
                    matchingTabGroupInBrowser = false;
                    _loop_1 = function (i) {
                        var group = "GROUP".concat(String(i + 1));
                        var currentChromeStorageTabGroup = chromeStorageTabGroupObject_1.TABGROUPS[i];
                        if (Object.prototype.hasOwnProperty.call(currentChromeStorageTabGroup, group)) {
                            var searchTerms = currentChromeStorageTabGroup[group].URL;
                            if (isSearchTermInUrl(url, searchTerms)) {
                                ungroup = false;
                                matchingTabGroupInBrowser = groupTabIfTabGroupExistsInBrowser(browserTabGroupObject, currentChromeStorageTabGroup[group], tabId);
                                // if tab doesn't have a group id already and no other tabs following that same
                                // group rule, make a new tab group and update localvariable groupIDArray with a
                                // property TABGROUP that holds that id
                                if (!matchingTabGroupInBrowser) {
                                    chrome.tabs.group({ tabIds: tabId }).then(function (id) {
                                        chrome.tabGroups.update(id, {
                                            title: chromeStorageTabGroupObject_1.TABGROUPS[i][group].NAME,
                                            color: chromeStorageTabGroupObject_1.TABGROUPS[i][group].COLOR,
                                        });
                                    });
                                }
                            }
                        }
                    };
                    for (i = 0; i < chromeStorageTabGroupObject_1.TABGROUPS.length; i += 1) {
                        _loop_1(i);
                    }
                    //if this code exectutes no matches where found on this tab id so ungroup this tab id from tabgroups if it is in one.
                    if (ungroup) {
                        chrome.tabs.ungroup(tabId);
                    }
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); });
//functoin that uses chrome commands api to collapse all tab groups when ctrl + shift + c is pressed 
// may modify this later to take the broswerTabGroupObjectDirectly
function closeTabGroupsWhenCtrlShiftY() {
    // alert('KEyboard short cut ctr-shift-y used');
    chrome.tabGroups.query({}).then(function (browserTabGroupObject) {
        if (typeof browserTabGroupObject !== "undefined" && browserTabGroupObject.length > 0) {
            for (var i = 0; i < browserTabGroupObject.length; i++) {
                chrome.tabGroups.update(browserTabGroupObject[i].id, { collapsed: true });
            }
        }
    });
}
//functoin that uses chrome commands api to open all tab groups when ctrl + shift + i is pressed 
// may modify this later to take the broswerTabGroupObjectDirectly
function openTabGroupsWhenCtrlShiftH() {
    // alert('KEyboard short cut ctr-shift-y used');
    chrome.tabGroups.query({}).then(function (browserTabGroupObject) {
        if (typeof browserTabGroupObject !== "undefined" && browserTabGroupObject.length > 0) {
            for (var i = 0; i < browserTabGroupObject.length; i++) {
                chrome.tabGroups.update(browserTabGroupObject[i].id, { collapsed: false });
            }
        }
    });
}
////functoin that uses chrome commands api to toggle all tab groups when ctrl + shift + t is pressed 
function toggleTabGroupsWhenCtrlShiftU() {
    // alert('KEyboard short cut ctr-shift-t used');
    chrome.tabGroups.query({}).then(function (browserTabGroupObject) {
        if (typeof browserTabGroupObject !== "undefined" && browserTabGroupObject.length > 0) {
            // Get the collapsed value of the first tab group
            var collapsedValue = browserTabGroupObject[0].collapsed;
            // Toggle the collapsed value for all tab groups
            for (var i = 0; i < browserTabGroupObject.length; i++) {
                chrome.tabGroups.update(browserTabGroupObject[i].id, { collapsed: !collapsedValue });
            }
        }
    });
}
// listen for commands and call correct functoin to close or toggle groups accordingly 
chrome.commands.onCommand.addListener(function (command) {
    if (command == "toggle-groups") {
        toggleTabGroupsWhenCtrlShiftU();
    }
    else if (command == "close-groups") {
        closeTabGroupsWhenCtrlShiftY();
    }
    else if (command == "open-groups") {
        openTabGroupsWhenCtrlShiftH();
    }
});
