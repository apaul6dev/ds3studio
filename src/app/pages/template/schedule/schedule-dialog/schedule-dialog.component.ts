import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormGroup, UntypedFormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html'
})
export class ScheduleDialogComponent implements OnInit {
  public form:UntypedFormGroup;
  constructor(public dialogRef: MatDialogRef<ScheduleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public formBuilder: UntypedFormBuilder) {
    this.form = this.formBuilder.group({ 
      'title': ['', Validators.required],            
      'start': ['', Validators.required], 
      'end': '',
      'isEdit' : false
    });
  }

  ngOnInit() {
    if (this.data){
      this.form.patchValue({
        'title': this.data.title,
        'start': this.data.start,
        'end': this.data.end,
        'isEdit' : true
      })
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}