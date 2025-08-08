# Todo App

A clean, responsive, and user-friendly Todo List web application that supports multiple projects, task management with priorities, due dates, and task descriptions.

Built with modern **JavaScript ES6 Modules**, styled with **CSS3**, and bundled using **Webpack**, this app stores your data in the browser using `localStorage` for a seamless experience across sessions.

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

[View the Todo App on GitHub Pages](https://abdelkarimTabcheh.github.io/Todo-List-Web-App)

---

## Technologies Used

- **HTML5 & CSS3:** Semantic markup and responsive styling with CSS variables.
- **JavaScript (ES6 Modules):** Modular architecture with separation of concerns.
- **Webpack:** Asset bundling, dev server, and production builds.
- **Babel:** Transpiling modern JS for compatibility.
- **LocalStorage API:** For client-side persistent data storage.

---

## Getting Started

### 🛠️ Prerequisites

- A modern browser (Chrome, Firefox, Edge, Safari).
- Node.js (for local development with Webpack).

### 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/abdelkarimTabcheh/Todo-List-Web-App.git
   cd Todo-List-Web-App

2. Install dependencies:

   ```bash
    npm install


3. Start the development server:

   ```bash
   npm start
Then open your browser at: http://localhost:8080
   
4. To build for production:

   ```bash
   npm run build


### Usage
 - Use the Projects sidebar to add, select, edit, or delete projects.
 - Within a project, add new todos by clicking the + Add Todo button.
 - Fill in the task details in the modal form; past due dates are disabled.
 - Edit or delete todos directly from the todo list.
 - Toggle completion status using the checkmark button.
 - Tasks automatically sort by priority (High > Medium > Low).