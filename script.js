let items = JSON.parse(localStorage.getItem("items")) || [];

// Switch between Lost and Found mode
function setType(selectedType) {
    type.value = selectedType;
    lostBtn.classList.toggle("active", selectedType === "Lost");
    foundBtn.classList.toggle("active", selectedType === "Found");
}

// Enable submit button only when form is filled
const inputs = document.querySelectorAll("#itemName, #description, #itemLocation, #contact");
inputs.forEach(input => input.addEventListener("input", checkFormFilled));

function checkFormFilled() {
    submitBtn.disabled = !(itemName.value && description.value && itemLocation.value && contact.value);
    submitBtn.classList.toggle("active", !submitBtn.disabled);
}

// Handle form submission
itemForm.addEventListener("submit", function(e) {
    e.preventDefault();

    let newItem = {
        id: Date.now(),
        name: itemName.value,
        description: description.value,
        location: itemLocation.value,
        contact: contact.value,
        type: type.value,
        date: new Date().toLocaleString()
    };

    items.push(newItem);
    localStorage.setItem("items", JSON.stringify(items));

    this.reset();
    checkFormFilled();
    allFilter.classList.add("active");
    displayItems(items);
});

// Display items on the screen
function displayItems(list) {
    if (list.length > 0) {
        result.innerHTML = list.map(item => `
            <div class="card ${item.type.toLowerCase()}">
                <span class="tag ${item.type.toLowerCase()}">${item.type}</span>
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p><b>Location:</b> ${item.location}</p>
                <p><b>Contact:</b> ${item.contact}</p>
                <p><small>${item.date}</small></p>
                <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
            </div>
        `).join("");
    } else {
        result.innerHTML = "<p style='text-align:center;color:gray;'>No items found.</p>";
    }
}

// Search functionality
function searchItem() {
    let text = searchBox.value.toLowerCase();
    displayItems(items.filter(i =>
        i.name.toLowerCase().includes(text) ||
        i.description.toLowerCase().includes(text) ||
        i.location.toLowerCase().includes(text)
    ));
}

// Clear search input
function clearSearch() {
    searchBox.value = "";
    clearBtn.style.display = "none";
    displayItems(items);
}

// Filter Lost / Found / All
function filterItems(type, btn) {
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    displayItems(type === "All" ? items : items.filter(i => i.type === type));
}

// Delete an item
function deleteItem(id) {
    if (confirm("Are you sure you want to delete this item?")) {
        items = items.filter(i => i.id !== id);
        localStorage.setItem("items", JSON.stringify(items));
        displayItems(items);
    }
}

// Initial display
displayItems(items);

