import { v4 as uuidv4 } from 'uuid';

export const TASK_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed'
};

export const VALID_STATUSES = Object.values(TASK_STATUS);

export class Task {
  constructor({ title, description = '', status = TASK_STATUS.PENDING }) {
    this.id = uuidv4();
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  update(updates) {
    const allowedFields = ['title', 'description', 'status'];
    
    for (const [key, value] of Object.entries(updates)) {
      if (allowedFields.includes(key) && value !== undefined) {
        this[key] = value;
      }
    }
    
    this.updatedAt = new Date().toISOString();
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}