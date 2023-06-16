import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  dataSource: MatTableDataSource<any>;

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.empForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      status: ['', Validators.required],
    });

    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if(this.data) {
        const formData = this.empForm.value;

        this._empService.updateEmployee(this.data.id,formData).subscribe(
          (response: any) => {
            console.log('Employee detail updated!', response);

            this._empService.getEmployeeList().subscribe(
              (users: any[]) => {
                this.dataSource.data = users;
                this._dialogRef.close(true);
              },
              (error: any) => {
                console.error('Failed to fetch users:', error);
              }
            );
          },
          (error: any) => {
            console.error('Failed to add user:', error);
          }
        );
      }else{
        const formData = this.empForm.value;

      this._empService.addEmployee(formData).subscribe(
        (response: any) => {
          console.log('User added successfully:', response);
          this._empService.getEmployeeList().subscribe(
            (users: any[]) => {
              this.dataSource.data = users;
              this._dialogRef.close(true);
            },
            (error: any) => {
              console.error('Failed to fetch users:', error);
            }
          );
        },
        (error: any) => {
          console.error('Failed to add user:', error);
        }
      );
      }
      
  }
}
}