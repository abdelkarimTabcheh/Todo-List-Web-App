import Todo from './models/todo.js';
import { saveProjects, loadRawProjects } from './storage.js';
import { renderProjects, renderTodos, bindUI } from './ui.js';

const defaultProjects = () => [{ id: 'p_default', name: 'Default', todos: [] }];

function rehydrate(rawProjects) {
  return rawProjects.map(p => ({
    ...p,
    todos: (p.todos || []).map(t => Todo.from(t))
  }));
}

let projects = rehydrate(loadRawProjects() || defaultProjects());
let activeProjectId = projects[0]?.id || null;

function persist() {
  saveProjects(projects);
}

function addTodoToProject(projectId, todoData) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;
  project.todos.push(new Todo(todoData));
  persist();
  render();
}

function editTodoInProject(projectId, todoId, updatedData) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;
  const todo = project.todos.find(t => t.id === todoId);
  if (todo) {
    todo.title = updatedData.title;
    todo.description = updatedData.description;
    todo.dueDate = updatedData.dueDate;
    todo.priority = updatedData.priority;
  }
  persist();
  render();
}

function deleteTodoFromProject(projectId, todoId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;
  project.todos = project.todos.filter(t => t.id !== todoId);
  persist();
  render();
}

function toggleTodo(projectId, todoId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;
  const todo = project.todos.find(t => t.id === todoId);
  if (todo) {
    todo.toggleComplete();
  }
  persist();
  render();
}

function addProject(name) {
  const newProject = { id: `p_${Date.now()}`, name, todos: [] };
  projects.push(newProject);
  activeProjectId = newProject.id;
  persist();
  render();
}

function editProject(projectId, newName) {
  const project = projects.find(p => p.id === projectId);
  if (project) {
    project.name = newName;
    persist();
    render();
  }
}

function deleteProject(projectId) {
  const index = projects.findIndex(p => p.id === projectId);
  if (index !== -1) {
    projects.splice(index, 1);
    // If deleted project was active, switch to another project or null
    if (activeProjectId === projectId) {
      activeProjectId = projects.length ? projects[0].id : null;
    }
    persist();
    render();
  }
}

function setActiveProject(id) {
  activeProjectId = id;
  render();
}

function render() {
  renderProjects(projects, activeProjectId);
  const currentProject = projects.find(p => p.id === activeProjectId);
  if (currentProject) {
    renderTodos(currentProject);
  } else {
    // Optional: clear todos if no active project
    renderTodos({ name: '', todos: [] });
  }
}

bindUI({
  onAddTodo: (projId, todoData) => addTodoToProject(projId, todoData),
  onEditTodo: (projId, todoId, updatedData) => editTodoInProject(projId, todoId, updatedData),
  onDeleteTodo: (projId, todoId) => deleteTodoFromProject(projId, todoId),
  onToggleTodo: (projId, todoId) => toggleTodo(projId, todoId),
  onAddProject: (name) => addProject(name),
  onEditProject: (id, newName) => editProject(id, newName),
  onDeleteProject: (id) => deleteProject(id),
  onSwitchProject: (id) => setActiveProject(id),
  getActiveProjectId: () => activeProjectId
});

render();
