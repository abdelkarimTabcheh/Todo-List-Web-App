# Todo App

A clean, responsive, and user-friendly Todo List web application that supports multiple projects, task management with priorities, due dates, and task descriptions. Built with modern JavaScript modules and minimal dependencies, this app persists data using `localStorage` and offers an intuitive interface on both desktop and mobile devices.

---

## Features

- **Multiple Projects:** Create, edit, and delete projects to organize your tasks.
- **Task Management:** Add, edit, delete, and toggle completion status of tasks within projects.
- **Task Details:** Each task includes a title, description, due date, and priority level (Low, Medium, High).
- **Priority Sorting:** Tasks with higher priority are displayed at the top.
- **Due Date Restrictions:** Users cannot select past dates when setting a task's due date.
- **Responsive Design:** Fully mobile-friendly and adapts to various screen sizes.
- **Persistent Storage:** Data is saved and loaded from `localStorage`, so your tasks and projects remain after browser refresh.
- **Clean UI:** Modern, minimalistic styling with accessible controls and modal forms.

---

## Demo

*(Optional: add a live demo link here)*

---

## Technologies Used

- **HTML5 & CSS3:** Semantic markup and responsive styling with CSS variables.
- **JavaScript (ES6 Modules):** Modular architecture with separation of concerns.
- **LocalStorage API:** For client-side persistent data storage.

---

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari).
- *(Optional)* A local HTTP server to serve the files (recommended for module imports).

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app

2. Serve the project folder using a local server (for example, using VS Code Live Server or http-server npm package):

   ```bash
    npx http-server

3. Open your browser and navigate to http://localhost:8080 (or the port your server uses).


### Usage
 - Use the Projects sidebar to add, select, edit, or delete projects.
 - Within a project, add new todos by clicking the + Add Todo button.
 - Fill in the task details in the modal form; past due dates are disabled.
 - Edit or delete todos directly from the todo list.
 - Toggle completion status using the checkmark button.
 - Tasks automatically sort by priority (High > Medium > Low).