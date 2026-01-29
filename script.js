// Load items from localStorage
let items = JSON.parse(localStorage.getItem("items")) || [];
let currentFilter = "All";

// Toggle Lost / Found for the form
function setType(selectedType) {
    type.value = selectedType;
    lostBtn.classList.toggle("active", selectedType === "Lost");
    foundBtn.classList.toggle("active", selectedType === "Found");
}

// Enable submit only when all fields are filled
const inputs = document.querySelectorAll("#itemName, #description, #itemLocation, #contact");
inputs.forEach(i => i.addEventListener("input", checkFormFilled));

function checkFormFilled() {
    submitBtn.disabled = !(itemName.value && description.value && itemLocation.value && contact.value);
    submitBtn.classList.toggle("active", !submitBtn.disabled);
}

// Handle form submit
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

    // Reset UI to All after submit
    setType("Lost");
    setFilter("All", document.getElementById("allFilter"));
    clearSearch();
});

// Set bottom filter (All / Lost / Found)
function setFilter(filterType, btn) {
    currentFilter = filterType;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applySearchAndFilter();
}

// Search handler
function handleSearch() {
    applySearchAndFilter();
}

// Apply filter + search together
function applySearchAndFilter() {
    let text = searchBox.value.toLowerCase();

    let baseList = currentFilter === "All"
        ? items
        : items.filter(item => item.type === currentFilter);

    let filtered = baseList.filter(item =>
        item.name.toLowerCase().includes(text) ||
        item.description.toLowerCase().includes(text) ||
        item.location.toLowerCase().includes(text)
    );

    displayItems(filtered);
}

// Display cards
function displayItems(list) {
    if (list.length === 0) {
        result.innerHTML = "<p style='text-align:center;color:gray;'>No items found.</p>";
        return;
    }

    result.innerHTML = list.map(item => `
        <div class="card ${item.type.toLowerCase()}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><b>Location:</b> ${item.location}</p>
            <p><b>Contact:</b> ${item.contact}</p>
            <p><small>${item.date}</small></p>
            <button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button>
        </div>
    `).join("");
}

// Show / hide clear icon
function toggleClearBtn() {
    clearBtn.style.display = searchBox.value ? "block" : "none";
}

// Clear search
function clearSearch() {
    searchBox.value = "";
    clearBtn.style.display = "none";
    applySearchAndFilter();
}

// Delete item
function deleteItem(id) {
    if (confirm("Are you sure you want to delete this item?")) {
        items = items.filter(item => item.id !== id);
        localStorage.setItem("items", JSON.stringify(items));
        applySearchAndFilter();
    }
}

// Initial render
displayItems(items);
