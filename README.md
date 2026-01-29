
# SST Lost & Found Web Application

A clean and user-friendly Lost & Found management system built using core web technologies. This project allows users to report lost or found items, search through existing reports, and filter them easily.

---

## Technologies Used

### 1. HTML5 (Structure)

HTML is used to build the structure of the application. It defines:
- The header and footer of the website
- The form used to report lost and found items
- Input fields such as item name, description, location, and contact
- Buttons for submission, filtering, and toggling between lost and found
- Containers where dynamic item cards are displayed

HTML provides the skeleton on which all styling and interactivity are applied.

---

### 2. CSS3 (Styling & Layout)

CSS is used to make the application visually appealing and user-friendly. It is responsible for:
- Page layout using flexbox and grid
- Card-based design for displaying reported items
- Color themes for Lost (red) and Found (green)
- Active button highlighting
- Responsive spacing and alignment
- Styling for forms, inputs, and buttons
- Clear button placement inside the search bar
- Footer and header design

CSS ensures the project looks professional and organized.

---

### 3. JavaScript (Logic & Interactivity)

JavaScript is the core of the application and controls all dynamic behavior. It is used for:

#### a) DOM Manipulation
The project uses the Document Object Model (DOM) to:
- Access input fields and buttons
- Read user-entered data
- Dynamically create and display item cards
- Update the interface without reloading the page
- Add and remove CSS classes for active states

#### b) Event Handling
JavaScript listens to user actions such as:
- Submitting the form
- Typing in the search box
- Clicking filter buttons (All, Lost, Found)
- Clicking the clear search icon
- Clicking the delete button

Each action triggers a function that updates the UI and data accordingly.

#### c) LocalStorage API
The application uses the browser's LocalStorage to:
- Save reported items permanently
- Load them again when the page is refreshed
- Maintain data without using a database

This makes the project fully client-side and persistent.

#### d) Form Validation
JavaScript checks:
- Whether all fields are filled
- Enables the submit button only when input is valid
- Prevents empty submissions

#### e) Array Methods & Data Flow
JavaScript uses array operations to:
- Store all items in an array
- Filter items based on search text
- Filter items based on Lost or Found type
- Delete specific items
- Re-render the updated list on every change

---

## Overall Learning Outcomes

This project demonstrates understanding of:
- HTML structure and semantic layout
- CSS styling, responsiveness, and UI design
- JavaScript fundamentals
- DOM manipulation
- Event-driven programming
- Client-side storage using LocalStorage
- Basic application flow and state management

---

## Developer

© Developed by Kannuru Erimiya  
End Term Web Development Project
