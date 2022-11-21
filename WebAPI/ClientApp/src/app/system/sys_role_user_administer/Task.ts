import { ThemePalette } from "@angular/material/core";

export class Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}
