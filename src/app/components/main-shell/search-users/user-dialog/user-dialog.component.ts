import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../../../models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})

export class UserDialogComponent implements OnInit {
  title: string;
  btnTitle: string;
  userData: FormGroup;
  user: User;
  action: string;

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userData = this.formBuilder.group({
      id: this.data.user.id,
      name: this.data.user.name,
      surname: this.data.user.surname,
      username: this.data.user.username,
      phone: this.data.user.phone,
      email: this.data.user.email
    });

    if (this.data.action === 'updateUser') {
        this.title = 'Edit user';
        this.btnTitle = 'Save';
    } else if (this.data.action === 'deleteUser') {
        this.title = 'Delete user';
        this.btnTitle = 'Delete';
    }

    this.user = this.data.user;
    this.action = this.data.action;
  }

  onSubmit() {
    this.dialogRef.close(this.userData.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
