import { User } from "@prisma/client";
import { Task } from "./task";

export interface TaskList {
  displayName: string;
  isOwner: boolean;
  isShared: boolean;
  title: string;
  wellknownListName: string;
  id: string;
  tasks: Task[];
  creator: User;
}
