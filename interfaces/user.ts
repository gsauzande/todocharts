import { TaskList } from "./taskList";

export interface User {
  id: number;
  displayName: string;
  mail: string;
  taskLists: TaskList[];
}
