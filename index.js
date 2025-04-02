document.addEventListener("DOMContentLoaded", () => {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    const imgContainer = document.getElementById("dog-image-container");
    const breedList = document.getElementById("dog-breeds");
    const breedDropdown = document.getElementById("breed-dropdown");
    
    // Fetch and display dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            data.message.forEach(imgSrc => {
                const img = document.createElement("img");
                img.src = imgSrc;
                img.style.width = "200px";
                img.style.margin = "10px";
                imgContainer.appendChild(img);
            });
        });
    
    // Fetch and display dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breeds = Object.keys(data.message);
            updateBreedList(breeds);
        });
    
    // Function to update breed list
    function updateBreedList(breeds) {
        breedList.innerHTML = ""; // Clear list before updating
        breeds.forEach(breed => {
            const li = document.createElement("li");
            li.textContent = breed;
            li.style.cursor = "pointer";
            li.addEventListener("click", () => {
                li.style.color = "blue";
            });
            breedList.appendChild(li);
        });
    }
    
    // Filter breeds based on dropdown selection
    breedDropdown.addEventListener("change", (event) => {
        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                const breeds = Object.keys(data.message);
                const filteredBreeds = breeds.filter(breed => breed.startsWith(event.target.value));
                updateBreedList(filteredBreeds);
            });
    });
});
