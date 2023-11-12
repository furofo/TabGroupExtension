 // Make sure to export the function in your original file
 import { toggleButtonText, deleteButton, reorderTabGroups } from "../src/globalValAndFunction"
 
describe('toggleButtonText', () => {
  it('should toggle button text between two strings', () => {
    // Create a mock button element
    const btn = document.createElement('button');
    btn.innerHTML = 'Text1';
    
    const str1 = 'Text1';
    const str2 = 'Text2';
    
    // Test the toggle
    toggleButtonText(btn, str1, str2);
    expect(btn.innerHTML).toBe('Text2');
    
    toggleButtonText(btn, str1, str2);
    expect(btn.innerHTML).toBe('Text1');
  });
});

test('reorderTabGroups handles arrays of varying lengths correctly', () => {
  const inputShort = [{ "GROUP1": { "COLOR": "red", "NAME": "TEST", "URL":["TEST"] } }];
  const inputLong = new Array(15).fill({ "GROUP": { "COLOR": "blue" } });

  const resultShort = reorderTabGroups(inputShort);
  const resultLong = reorderTabGroups(inputLong);

  expect(resultShort.length).toBe(1);
  expect(resultLong.length).toBe(15);
});

