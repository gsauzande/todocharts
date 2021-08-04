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
  dueDateTime: string;
  id: string;
  body: BodyType;
}
