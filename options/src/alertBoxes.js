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
exports.ModalWindow = void 0;
var globalValAndFunction_1 = require("./globalValAndFunction");
exports.ModalWindow = {
    init: function () {
        document.body.addEventListener('click', this.handleClick.bind(this)); // Binding 'this' context
    },
    handleClick: function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var target, isCheckedArray_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        target = e.target;
                        if (!target) return [3 /*break*/, 3];
                        if (!(target.classList.contains("modal__close") ||
                            target.classList.contains("modal__overlay") ||
                            target.classList.contains("modal__goback__button"))) return [3 /*break*/, 1];
                        this.closeModal();
                        return [3 /*break*/, 3];
                    case 1:
                        if (!target.classList.contains("modal__confirm__button")) return [3 /*break*/, 3];
                        isCheckedArray_1 = document.querySelectorAll('.container input');
                        return [4 /*yield*/, (0, globalValAndFunction_1.deleteButtonLogic)(isCheckedArray_1)];
                    case 2:
                        _a.sent();
                        this.closeModal();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    //function of Modal window that returns html of the modal window 
    getHtmlTemplate: function (modalOptions) {
        if (modalOptions.buttons) {
            return "\n        <div class=\"modal__overlay\">\n         <div class=\"modal__window\">\n           <div class=\"modal__titlebar\">\n             <span class=\"modal__title\">".concat(modalOptions.title, "</span>\n             <button class = \"modal__close material-icons\">close</button>\n           </div>\n           <div class=\"modal__content\">\n            ").concat(modalOptions.content, "\n           </div>\n           <div class = \"modal__buttons\">\n           <button class = \"modal__goback__button\">Go Back</button>\n            <button class = \"modal__confirm__button\">Confirm</button>\n           </div>\n          \n         </div>\n       </div>");
        }
        else {
            return "\n        <div class=\"modal__overlay\">\n         <div class=\"modal__window\">\n           <div class=\"modal__titlebar\">\n             <span class=\"modal__title\">".concat(modalOptions.title, "</span>\n             <button class = \"modal__close material-icons\">close</button>\n           </div>\n           <div class=\"modal__content\">\n            ").concat(modalOptions.content, "\n           </div>\n         </div>\n       </div>");
        }
    },
    openModal: function (modalOptions) {
        if (modalOptions === void 0) { modalOptions = {}; }
        modalOptions = Object.assign({
            title: 'Modal Title',
            content: 'Modal Content',
            buttons: false,
        }, modalOptions);
        var modalTemplate = this.getHtmlTemplate(modalOptions);
        document.body.insertAdjacentHTML("afterbegin", modalTemplate);
    },
    closeModal: function () {
        var modalOverlay = document.querySelector(".modal__overlay");
        if (modalOverlay !== null) {
            document.body.removeChild(modalOverlay);
        }
    }
};
document.addEventListener("DOMContentLoaded", function () {
    exports.ModalWindow.init();
});
