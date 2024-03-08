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
  tasks!: Table<Task>
}

export const db: MySubClassedDexie

declare module 'db'
