import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
  import {ThemePalette} from '@angular/material/core';
@Component({
  selector: 'sys_role_user_administer_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class sys_role_user_administer_indexComponent implements OnInit{

  public list_role: any = [];
  constructor() {}

  allComplete: boolean = false;

  updateAllComplete() {
    //this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  }

  someComplete(): any {
    // if (this.task.subtasks == null) {
    //   return false;
    // }
    // return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    // this.allComplete = completed;
    // if (this.task.subtasks == null) {
    //   return;
    // }
    // this.task.subtasks.forEach(t => (t.completed = completed));
  }
  ngOnInit(): void {
  }
}
