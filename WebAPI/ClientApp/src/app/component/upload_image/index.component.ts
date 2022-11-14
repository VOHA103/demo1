import { sys_bo_mon_service } from '../../service/sys_bo_mon.service';
import { MatDialog } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { user_model } from '@/app/model/user.model';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from '@/environments/environment';
@Component({
  selector: 'upload_image_index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class UploadImageComponent implements OnInit {
  progress: number;
  message: string;
  @Output() public onUploadFinished = new EventEmitter();
  private REST_API_URL = environment.api;
  constructor(
    private http: HttpClient,
    private sys_bo_mon_service: sys_bo_mon_service,
    public dialog: MatDialog
  ) {}
  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    this.http
      .post(this.REST_API_URL + '/sys_cau_hinh_admin/Upload', formData, {
        reportProgress: true,
        observe: 'events',
      })
      .subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progress = Math.round((100 * event.loaded) / event.total);
          else if (event.type === HttpEventType.Response) {
            this.message = 'Upload success.';
            this.onUploadFinished.emit(event.body);
            console.log(this.onUploadFinished.emit(event.body));

          }
        },
        error: (err: HttpErrorResponse) => console.log(err),
      });
  };
  ngOnInit(): void {}
}
