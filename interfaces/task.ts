import { TaskList } from "./taskList";

interface BodyType {
  content: string;
  contentType: string;
}
export interface Task {
  importance: string;
  isReminderOn: boolean;
  status:
    | "notStarted"
    | "inProgress"
    | "completed"
    | "waitingOnOthers"
    | "deferred";
  title: string;
  createdDateTime: string;
  lastModifiedDateTime: string;
  completedDateTime: {
    dateTime: string;
    timeZone: string;
  };
  dueDateTime: {
    dateTime: string;
    timeZone: string;
  };
  id: string;
  body: BodyType;
  taskList: TaskList;
}
