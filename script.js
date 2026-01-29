let items = JSON.parse(localStorage.getItem("items")) || [];
let currentFilter = "All";

// Toggle Lost / Found mode (form)
function setType(typeSelected) {
    type.value = typeSelected;
    lostBtn.classList.toggle("active", typeSelected === "Lost");
    foundBtn.classList.toggle("active", typeSelected === "Found");
}

// Enable submit only when form is filled
const inputs = document.querySelectorAll("#itemName, #description, #itemLocation, #contact");
inputs.forEach(i => i.addEventListener("input", checkFormFilled));

function checkFormFilled() {
    submitBtn.disabled = !(itemName.value && description.value && itemLocation.value && contact.value);
    submitBtn.classList.toggle("active", !submitBtn.disabled);
}

// Submit form
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

    // Reset UI state
    setType("Lost");
    setFilter("All", document.getElementById("allFilter"));
    clearSearch();

    displayItems(items);
});

// Filter buttons
function setFilter(filterType, btn) {
    currentFilter = filterType;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    applySearchAndFilter();
}

// Search inside selected filter
function handleSearch() {
    applySearchAndFilter();
}

function applySearchAndFilter() {
    let text = searchBox.value.toLowerCase();
    let baseList = currentFilter === "All" ? items : items.filter(i => i.type === currentFilter);

    let filtered = baseList.filter(i =>
        i.name.toLowerCase().includes(text) ||
        i.description.toLowerCase().includes(text) ||
        i.location.toLowerCase().includes(text)
    );

    displayItems(filtered);
}

// Display items
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

// Clear search
function clearSearch() {
    searchBox.value = "";
    clearBtn.style.display = "none";
    applySearchAndFilter();
}

// Show / hide clear button
function toggleClearBtn() {
    clearBtn.style.display = searchBox.value ? "block" : "none";
}

// Delete item
function deleteItem(id) {
    if (confirm("Are you sure you want to delete this item?")) {
        items = items.filter(i => i.id !== id);
        localStorage.setItem("items", JSON.stringify(items));
        applySearchAndFilter();
    }
}

// Initial load
displayItems(items);
