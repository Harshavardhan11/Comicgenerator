async function query(data) {
    const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
            headers: { 
                "Accept": "image/png",
                "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
                "Content-Type": "application/json" 
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

async function generateComic() {
    const textInputs = document.querySelectorAll('.comic-input');
    const comicDisplay = document.getElementById('comic-display');
    const errorMessage = document.getElementById('error-message');

    // Clear previous comic panels and error messages
    comicDisplay.innerHTML = '';
    errorMessage.textContent = '';
    comicDisplay.classList.add('hidden');
    errorMessage.classList.add('hidden');

    try {
        for (let i = 0; i < textInputs.length; i++) {
            if(textInputs[i].value.length>0){
            const response = await query({ "inputs": textInputs[i].value });

            // // Create a new comic panel and append it to the display area
            const comicPanel = document.createElement('div');
            comicPanel.className = 'comic-panel';
            const img = document.createElement('img');
            console.log("step1");
            img.src = URL.createObjectURL(response);
            comicPanel.appendChild(img);

            const speechBubble = document.createElement('div');
                    speechBubble.className = 'speech-bubble';
                    speechBubble.textContent = textInputs[i].value;
                    comicPanel.appendChild(speechBubble);

            comicDisplay.appendChild(comicPanel);
            
            }
        }

        // Display the generated comic panels
        comicDisplay.classList.remove('hidden');
    } catch (error) {
        // Handle errors (e.g., failed API calls)
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
}