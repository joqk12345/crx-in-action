// db.ts
import Dexie, { Table } from 'dexie'

export interface Task {
  id?: number
  title: string
  url: string
  status: string
  download_link?: string
  date?: string
}

export class MySubClassedDexie extends Dexie {
  // 'tasks' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  tasks!: Table<Task>

  constructor() {
    super('myDatabase')
    this.version(1).stores({
      tasks: '++id, title', // Primary key and indexed props
    })
  }
}

export const db = new MySubClassedDexie()
