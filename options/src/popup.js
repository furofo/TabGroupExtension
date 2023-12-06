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
exports.createRuleElement = void 0;
var globalValAndFunction_1 = require("./globalValAndFunction");
var alertBoxes_1 = require("./alertBoxes");
var createRuleElement = function () {
    var rulesContainerElement = document.querySelector(".rules-container");
    var centerRuleDiv = document.createElement("div");
    centerRuleDiv.classList.add("center");
    centerRuleDiv.classList.add("rule");
    var containerLabel = document.createElement("label");
    containerLabel.classList.add("container");
    var containerLabelChildInput = document.createElement("input");
    containerLabelChildInput.type = "checkbox";
    var containerLabelSpanChild = document.createElement("span");
    containerLabelSpanChild.classList.add("checkmark");
    containerLabel.appendChild(containerLabelChildInput);
    containerLabel.appendChild(containerLabelSpanChild);
    centerRuleDiv.appendChild(containerLabel);
    var nameContentDiv = document.createElement("div");
    nameContentDiv.classList.add("rule-content");
    nameContentDiv.classList.add("name-content");
    var nameContentChildInput = document.createElement("input");
    nameContentChildInput.classList.add("name");
    nameContentChildInput.setAttribute("id", "first-name");
    nameContentChildInput.setAttribute("value", "");
    nameContentChildInput.value = "";
    nameContentChildInput.disabled = true;
    nameContentDiv.appendChild(nameContentChildInput);
    centerRuleDiv.appendChild(nameContentDiv);
    var urlContentDiv = document.createElement("div");
    urlContentDiv.classList.add("rule-content");
    var urlContentChildInput = document.createElement("input");
    urlContentChildInput.classList.add("flex-center");
    urlContentChildInput.setAttribute("id", "first-url");
    urlContentChildInput.setAttribute("value", "");
    urlContentChildInput.value = "";
    urlContentChildInput.disabled = true;
    urlContentDiv.appendChild(urlContentChildInput);
    centerRuleDiv.appendChild(urlContentDiv);
    var colorContentDiv = document.createElement("div");
    colorContentDiv.classList.add("color-content");
    var colorContentChildBoxDiv = document.createElement("div");
    colorContentChildBoxDiv.classList.add("box");
    colorContentChildBoxDiv.setAttribute("id", "first-box");
    colorContentChildBoxDiv.setAttribute("value", "grey");
    var blueBox = document.createElement("div");
    blueBox.classList.add("blue-box");
    var yellowBox = document.createElement("div");
    yellowBox.classList.add("yellow-box");
    var purpleBox = document.createElement("div");
    purpleBox.classList.add("purple-box");
    var greenBox = document.createElement("div");
    greenBox.classList.add("green-box");
    var pinkBox = document.createElement("div");
    pinkBox.classList.add("pink-box");
    var redBox = document.createElement("div");
    redBox.classList.add("red-box");
    var orangeBox = document.createElement("div");
    orangeBox.classList.add("orange-box");
    var cyanBox = document.createElement("div");
    cyanBox.classList.add("cyan-box");
    // append them as child to color Content Child Box
    colorContentChildBoxDiv.appendChild(blueBox);
    colorContentChildBoxDiv.appendChild(yellowBox);
    colorContentChildBoxDiv.appendChild(purpleBox);
    colorContentChildBoxDiv.appendChild(greenBox);
    colorContentChildBoxDiv.appendChild(pinkBox);
    colorContentChildBoxDiv.appendChild(redBox);
    colorContentChildBoxDiv.appendChild(orangeBox);
    colorContentChildBoxDiv.appendChild(cyanBox);
    // append cololorContent ChildBox div as child to color content
    colorContentDiv.appendChild(colorContentChildBoxDiv);
    centerRuleDiv.appendChild(colorContentDiv);
    var dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 320 512");
    svg.setAttribute("fill", "white");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M143 256.3L7 120.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0L313 86.3c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.4 9.5-24.6 9.5-34 .1zm34 192l136-136c9.4-9.4 9.4-24.6 0-33.9l-22.6-22.6c-9.4-9.4-24.6-9.4-33.9 0L160 352.1l-96.4-96.4c-9.4-9.4-24.6-9.4-33.9 0L7 278.3c-9.4 9.4-9.4 24.6 0 33.9l136 136c9.4 9.5 24.6 9.5 34 .1z");
    svg.appendChild(path);
    dropdown.appendChild(svg);
    colorContentDiv.appendChild(dropdown);
    rulesContainerElement.appendChild(centerRuleDiv);
    return centerRuleDiv;
};
exports.createRuleElement = createRuleElement;
// when delete button clicked removes the group number
// from google sync and from the popup page of extension
document.addEventListener('DOMContentLoaded', function (event) {
    globalValAndFunction_1.deleteButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var isCheckedArray;
        return __generator(this, function (_a) {
            isCheckedArray = document.querySelectorAll('.container input');
            if ((0, globalValAndFunction_1.isChecked)(isCheckedArray)) {
                alertBoxes_1.ModalWindow.openModal({
                    title: "Do you want to delete?",
                    content: "This will permanently delete selected rules",
                    buttons: true
                });
            }
            else {
                alertBoxes_1.ModalWindow.openModal({
                    title: 'No Group Checked!',
                    content: 'Please check tab group to delete a rule!'
                });
            }
            return [2 /*return*/];
        });
    }); });
});
document.addEventListener('DOMContentLoaded', function (event) {
    globalValAndFunction_1.addButton.addEventListener('click', function (elem) { return __awaiter(void 0, void 0, void 0, function () {
        var ruleElement, otherSelectorInputContainers, i, container, input, addButton, selectorInput, checkedNameField, checkedUrlField, dropDown;
        return __generator(this, function (_a) {
            ruleElement = (0, exports.createRuleElement)();
            otherSelectorInputContainers = document.querySelectorAll('.container');
            for (i = 0; i < otherSelectorInputContainers.length; i++) {
                container = otherSelectorInputContainers[i];
                input = container.querySelector('input');
                input.checked = false;
                container.style.pointerEvents = 'none';
            }
            addButton = elem.target;
            selectorInput = ruleElement.querySelector(".container > input");
            checkedNameField = ruleElement.querySelector('.name-content > input');
            checkedUrlField = ruleElement.querySelector('.flex-center');
            dropDown = ruleElement.querySelector('.dropdown');
            selectorInput.checked = true;
            (0, globalValAndFunction_1.toggleInputDisabled)(checkedNameField);
            (0, globalValAndFunction_1.toggleInputDisabled)(checkedUrlField);
            (0, globalValAndFunction_1.toggleDropdownBox)(dropDown);
            (0, globalValAndFunction_1.addDropDownMenuOnClickListeners)();
            (0, globalValAndFunction_1.toggleElementDisplay)(addButton);
            (0, globalValAndFunction_1.toggleElementDisplay)(document.getElementById('go-back'));
            (0, globalValAndFunction_1.toggleElementDisplay)(document.getElementById('delete-group'));
            (0, globalValAndFunction_1.toggleButtonText)(document.getElementById('edit-add-group'), "Select", "Save");
            checkedNameField.focus();
            return [2 /*return*/];
        });
    }); });
});
document.addEventListener('DOMContentLoaded', function (event) {
    globalValAndFunction_1.gobackButton.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        var isCheckedArray, dropDownBox;
        return __generator(this, function (_a) {
            isCheckedArray = document.querySelectorAll('.container input');
            dropDownBox = document.querySelectorAll('.dropdown');
            // deleteButtonLogic(isCheckedArray, tabGroupsArray, dropDownBox, true)
            (0, globalValAndFunction_1.goBackButtonLogic)(isCheckedArray, dropDownBox);
            return [2 /*return*/];
        });
    }); });
});
document.addEventListener('DOMContentLoaded', function (event) {
    globalValAndFunction_1.editAddButton.addEventListener('click', function () {
        return __awaiter(this, void 0, void 0, function () {
            var isCheckedArray, inputBox, checkedNameField, checkedUrlField, dropDownBox, boxField, inputBoxes, checkedInputs, checkedNameInputs, checkedUrlInputs, boxInputs, dropDownElements;
            return __generator(this, function (_a) {
                (0, globalValAndFunction_1.addDropDownMenuOnClickListeners)();
                isCheckedArray = document.querySelectorAll('.container input');
                inputBox = document.querySelectorAll('.container');
                checkedNameField = document.querySelectorAll('.name');
                checkedUrlField = document.querySelectorAll('.flex-center');
                dropDownBox = document.querySelectorAll('.dropdown');
                boxField = document.querySelectorAll('.box');
                inputBoxes = Array.from(inputBox);
                checkedInputs = Array.from(isCheckedArray);
                checkedNameInputs = Array.from(checkedNameField);
                checkedUrlInputs = Array.from(checkedUrlField);
                boxInputs = Array.from(boxField);
                dropDownElements = Array.from(dropDownBox);
                // if save button clicked because should be only
                // Save Button text when delete button is not visible
                if (window.getComputedStyle(globalValAndFunction_1.deleteButton, null).display === 'none') {
                    (0, globalValAndFunction_1.saveButtonLogic)(this, inputBoxes, checkedInputs, checkedNameInputs, checkedUrlInputs, boxInputs, dropDownElements);
                }
                else {
                    if ((0, globalValAndFunction_1.isChecked)(isCheckedArray)) {
                        (0, globalValAndFunction_1.editButtonLogic)(this, isCheckedArray, checkedNameField, checkedUrlField, dropDownBox);
                    }
                    else {
                        alertBoxes_1.ModalWindow.openModal({
                            title: 'No Group Checked!',
                            content: 'Please check a tab group to edit/add a rule!'
                        });
                    }
                }
                return [2 /*return*/];
            });
        });
    });
});
document.addEventListener('DOMContentLoaded', function (event) {
    globalValAndFunction_1.zoomLg.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            document.getElementById('page-style').setAttribute('href', "/css/style.css");
            document.getElementById('alert-style').setAttribute('href', "/css/alert-boxes.css");
            return [2 /*return*/];
        });
    }); });
});
document.addEventListener('DOMContentLoaded', function (event) {
    globalValAndFunction_1.zoomReg.addEventListener('click', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            document.getElementById('page-style').setAttribute('href', "/css/styles2.css");
            document.getElementById('alert-style').setAttribute('href', "/css/alert-boxes2.css");
            return [2 /*return*/];
        });
    }); });
});
