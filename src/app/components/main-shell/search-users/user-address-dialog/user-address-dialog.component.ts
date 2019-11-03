import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-user-address-dialog',
  templateUrl: './user-address-dialog.component.html',
  styleUrls: ['./user-address-dialog.component.scss']
})
export class UserAddressDialogComponent implements OnInit {
  title: string;
  btnTitle: string;
  userAddressData: FormGroup;
  action: string;

  constructor(
    public dialogRef: MatDialogRef<UserAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userAddressData = this.formBuilder.group({
      addressType: new FormControl(
        this.data.userAddresses.addressType,
        Validators.required
      ),
      address: new FormControl(
        this.data.userAddresses.address,
        Validators.required
      ),
      city: new FormControl(this.data.userAddresses.city, Validators.required),
      country: new FormControl(
        this.data.userAddresses.country,
        Validators.required
      ),
      postCode: new FormControl(this.data.userAddresses.postCode, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10)
      ])
    });

    if (this.data.action === 'updateUserAddress') {
      this.title = 'Edit address';
      this.btnTitle = 'Save';
    } else if (this.data.action === 'deleteUserAddress') {
      this.title = 'Delete address';
      this.btnTitle = 'Delete';
    } else if (this.data.action === 'addUserAddress') {
      this.title = 'Add address';
      this.btnTitle = 'Add';
    }

    this.action = this.data.action;
  }

  onSubmit() {
    this.dialogRef.close(this.userAddressData.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
