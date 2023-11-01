 // Make sure to export the function in your original file
 import { toggleButtonText, deleteButton } from "../src/globalValAndFunction"

 
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
