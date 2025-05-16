document.addEventListener('DOMContentLoaded', function() {
    // Get references to the elements
    // IMPORTANT: Update the selector for the 'originalTextbox' if you change its class/ID in HTML
    const checkbox = document.querySelector('input[type="checkbox"]#enableWritingCheckbox');
    const originalTextbox = document.querySelector('input[type="text"].ai-style-change-2'); // Use a stable selector like an ID or a more persistent class
    const controlledTextbox = document.querySelector('input[type="text"][data-purpose="controlled-visibility"]');
    const uwuTextbox = document.querySelector('input[type="text"][data-purpose="giant-uwu-box"]');

    if (checkbox && originalTextbox && controlledTextbox && uwuTextbox) {

        // --- Logic for Checkbox (Disabling Textboxes and Changing UwU Placeholder) ---

        const checkboxChangeHandler = function() {
            const isDisabled = !this.checked; // Textboxes should be disabled if checkbox is NOT checked

            // Toggle disabled state for both textboxes
            originalTextbox.disabled = isDisabled;
            controlledTextbox.disabled = isDisabled;

            // Toggle UwU textbox placeholder
            if (!this.checked) {
                uwuTextbox.placeholder = 'OwO';
            } else {
                uwuTextbox.placeholder = 'UwU';
            }
        };

        // Add the change event listener to the checkbox
        checkbox.addEventListener('change', checkboxChangeHandler);

        // Set the initial state based on the current checkbox state when the page loads
        checkboxChangeHandler.call(checkbox); // .call(checkbox) ensures 'this' inside the handler refers to the checkbox


        // --- Logic for Original Textbox (Showing/Hiding Controlled Textbox) ---

        const showSecondTextboxHandler = function() {
            if (this.value === 'Furries are the best') {
                // Make the controlled textbox visible
                // We are toggling display via JS. Make sure its initial state is display: none in your CSS.
                controlledTextbox.style.display = 'block';
            } else {
                // Hide the textbox again if the value changes away from the trigger phrase
                if (controlledTextbox.style.display !== 'none') {
                    controlledTextbox.style.display = 'none';
                }
            }
        };

        // Add the input event listener to the original textbox
        originalTextbox.addEventListener('input', showSecondTextboxHandler);


        // --- Logic for Controlled Textbox (Changing Colors and Showing/Hiding UwU Textbox) ---

        const controlledTextboxInputHandler = function() {
            if (this.value === 'Furry-fy') {
                // Change color of both textboxes
                originalTextbox.style.color = 'blue';
                controlledTextbox.style.color = 'blue';

                // Make the UwU textbox visible
                uwuTextbox.style.display = 'block';

            } else {
                // Optional: Revert color and hide UwU textbox if the value changes away
                // Check if the color was set by this handler before reverting
                if (originalTextbox.style.color === 'blue') {
                    originalTextbox.style.color = ''; // Revert to default or inherited color
                }
                 if (controlledTextbox.style.color === 'blue') {
                     controlledTextbox.style.color = ''; // Revert to default or inherited color
                 }

                 // Hide the UwU textbox if it's currently visible
                if (uwuTextbox.style.display !== 'none') {
                    uwuTextbox.style.display = 'none';
                }
            }
        };

        // Add the input event listener to the controlled textbox
        controlledTextbox.addEventListener('input', controlledTextboxInputHandler);


    } else {
        // Log an error if not all required elements were found on the page
        console.error("Could not find one or more required elements for JavaScript logic.");
    }
});

/*
Note:
- This code waits for the entire HTML document to be loaded and parsed before running (DOMContentLoaded).
- The selector '.ai-style-change-2' for the original textbox might be unstable.
  It's strongly recommended to give your original textbox a stable ID (e.g., id="firstTextbox")
  in your index.html and update the querySelector accordingly: document.querySelector('#firstTextbox').
- Using data-purpose attributes like data-purpose="controlled-visibility" and data-purpose="giant-uwu-box"
  is a good, stable way to identify elements for JavaScript and CSS.
- We are toggling element visibility by setting the 'display' style property directly.
  An alternative approach is to toggle a CSS class on the element (e.g., '.hidden { display: none; }')
  and use JavaScript to add/remove that class. This keeps styling concerns more in CSS.
*/