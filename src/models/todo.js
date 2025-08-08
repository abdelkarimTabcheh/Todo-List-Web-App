export default class Todo {
  constructor({ id=null, title='', description='', dueDate=null, priority='medium', notes = [], completed=false } = {}) {
    this.id = id || String(Date.now());
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.completed = completed;
  }
  toggleComplete() { this.completed = !this.completed; }
  update(fields = {}) { Object.assign(this, fields); }
  static from(obj) { return new Todo(obj); }
}
