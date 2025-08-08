export function renderProjects(projects, activeProjectId) {
  const list = document.getElementById('project-list');
  list.innerHTML = projects
    .map(
      p => `
      <li data-id="${p.id}" class="${p.id === activeProjectId ? 'active' : ''}">
        <span class="project-name">${p.name}</span>
        <button class="edit-project" title="Edit Project">✏️</button>
        <button class="delete-project" title="Delete Project">🗑️</button>
      </li>`
    )
    .join('');
}

export function setupDarkMode() {
  const toggle = document.createElement('button');
  toggle.textContent = '🌙 Dark Mode';
  toggle.id = 'dark-mode-toggle';
  document.body.prepend(toggle);

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', document.body.classList.contains('dark'));
  });

  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark');
  }
}

export function renderTodos(project) {
  const title = document.getElementById('current-project-title');
  title.textContent = project.name;

  const list = document.getElementById('todo-list');

  // Sort todos by priority: high > medium > low
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  const sortedTodos = [...project.todos].sort((a, b) => {
    return (priorityOrder[a.priority] || 4) - (priorityOrder[b.priority] || 4);
  });

  list.innerHTML = sortedTodos
    .map(
      t => `
      <li data-id="${t.id}" class="${t.completed ? 'completed' : ''}">
        <div>
          <span class="todo-title">${t.title}</span>
          ${
            t.priority
              ? `<span class="badge ${t.priority}">${t.priority}</span>`
              : ''
          }
          ${t.dueDate ? `<small>${t.dueDate}</small>` : ''}
        </div>
        <div class="todo-description">${t.description || ''}</div>
        <div class="todo-actions">
          <button class="toggle">✔</button>
          <button class="edit">✏️</button>
          <button class="delete">🗑️</button>
        </div>
      </li>`
    )
    .join('');
}


export function bindUI(handlers) {
  const modal = document.getElementById('modal');
  const todoForm = document.getElementById('todo-form');
  const dueDateInput = todoForm.querySelector('input[name="dueDate"]');

  let editMode = false;
  let editingTodoId = null;

  function setMinDueDate() {
    const today = new Date().toISOString().split('T')[0];
    dueDateInput.setAttribute('min', today);
  }

  // open modal for new todo
  document.getElementById('addTodo').addEventListener('click', () => {
    setMinDueDate();
    editMode = false;
    editingTodoId = null;
    todoForm.reset();
    modal.classList.remove('hidden');
  });

  // cancel modal
  document.getElementById('cancel-modal').addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // submit todo form
  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());

    if (editMode && editingTodoId) {
      handlers.onEditTodo(handlers.getActiveProjectId(), editingTodoId, data);
    } else {
      handlers.onAddTodo(handlers.getActiveProjectId(), data);
    }

    e.target.reset();
    modal.classList.add('hidden');
  });

  // todo list actions
  document.getElementById('todo-list').addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const id = li.dataset.id;

    if (e.target.classList.contains('toggle')) {
      handlers.onToggleTodo(handlers.getActiveProjectId(), id);
    }

    if (e.target.classList.contains('edit')) {
      const title = li.querySelector('.todo-title').textContent;
      const dueDate = li.querySelector('small')?.textContent || '';
      const priority = li.querySelector('.badge')?.textContent || 'medium';
      const description = li.querySelector('.todo-description').textContent || '';

      todoForm.title.value = title;
      todoForm.dueDate.value = dueDate;
      todoForm.priority.value = priority;
      todoForm.description.value = description;

      setMinDueDate();

      editMode = true;
      editingTodoId = id;
      modal.classList.remove('hidden');
    }

    if (e.target.classList.contains('delete')) {
      if (confirm('Delete this todo?')) {
        handlers.onDeleteTodo(handlers.getActiveProjectId(), id);
      }
    }
  });

  // project list actions (including edit/delete project)
  document.getElementById('project-list').addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    const projectId = li.dataset.id;

    if (e.target.classList.contains('edit-project')) {
      const currentName = li.querySelector('.project-name').textContent;
      const newName = prompt('Edit project name:', currentName);
      if (newName && newName.trim() !== '' && newName !== currentName) {
        handlers.onEditProject(projectId, newName.trim());
      }
    } else if (e.target.classList.contains('delete-project')) {
      if (confirm('Are you sure you want to delete this project?')) {
        handlers.onDeleteProject(projectId);
      }
    } else if (
      e.target.classList.contains('project-name') ||
      e.target.tagName === 'LI'
    ) {
      handlers.onSwitchProject(projectId);
    }
  });

  // add project
  document.getElementById('add-project-btn').addEventListener('click', () => {
    const name = prompt('Project name');
    if (name) handlers.onAddProject(name);
  });
}

