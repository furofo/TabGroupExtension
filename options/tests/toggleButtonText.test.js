"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Make sure to export the function in your original file
var globalValAndFunction_1 = require("../src/globalValAndFunction");
describe('toggleButtonText', function () {
    it('should toggle button text between two strings', function () {
        // Create a mock button element
        var btn = document.createElement('button');
        btn.innerHTML = 'Text1';
        var str1 = 'Text1';
        var str2 = 'Text2';
        // Test the toggle
        (0, globalValAndFunction_1.toggleButtonText)(btn, str1, str2);
        expect(btn.innerHTML).toBe('Text2');
        (0, globalValAndFunction_1.toggleButtonText)(btn, str1, str2);
        expect(btn.innerHTML).toBe('Text1');
    });
});
test('reorderTabGroups handles arrays of varying lengths correctly', function () {
    var inputShort = [{ "GROUP1": { "COLOR": "red", "NAME": "TEST", "URL": ["TEST"] } }];
    var inputLong = new Array(15).fill({ "GROUP": { "COLOR": "blue" } });
    var resultShort = (0, globalValAndFunction_1.reorderTabGroups)(inputShort);
    var resultLong = (0, globalValAndFunction_1.reorderTabGroups)(inputLong);
    expect(resultShort.length).toBe(1);
    expect(resultLong.length).toBe(15);
});
test('reorderTabGroups removes empty objects', function () {
    var input = [{ "GROUP1": { "COLOR": "red", "NAME": "TEST", "URL": ["TEST"] } }, {}, {}];
    var result = (0, globalValAndFunction_1.reorderTabGroups)(input);
    expect(result).toEqual([{ "GROUP1": { "COLOR": "red", "NAME": "TEST", "URL": ["TEST"] } }]);
});
test('reorderTabGroups rearranges TabGroups so that always starts with Group1 and gets rid of extra blank objects', function () {
    var groupsWithSpaceBetween = [
        {
            "GROUP1": {
                "COLOR": "red",
                "NAME": "color",
                "URL": [
                    "red"
                ]
            }
        },
        {},
        {},
        {},
        {},
        {
            "GROUP6": {
                "COLOR": "purple",
                "NAME": "coro",
                "URL": [
                    "dasdfa"
                ]
            }
        },
        {},
        {}
    ];
    var resultSpaceBetween = (0, globalValAndFunction_1.reorderTabGroups)(groupsWithSpaceBetween);
    expect(resultSpaceBetween.length).toBe(2);
});
var initialTabGroups = [
    {
        "GROUP1": {
            "COLOR": "red",
            "NAME": "asdfsdaf",
            "URL": [
                "fsdaf"
            ]
        }
    },
    {
        "GROUP2": {
            "COLOR": "red",
            "NAME": "sdf",
            "URL": [
                "fdsad"
            ]
        }
    },
    {
        "GROUP3": {
            "COLOR": "red",
            "NAME": "sdfsda",
            "URL": [
                "fdssdf"
            ]
        }
    }
];
