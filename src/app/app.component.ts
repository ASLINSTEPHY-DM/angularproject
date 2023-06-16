import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

    
  
  title = 'crud-app';
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'gender',
    'status',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
  ) {}


 ngOnInit(): void {
  
  this.getEmployeeList();
}
  
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data: {}  
    });
  
    dialogRef.afterClosed().subscribe((val: any) => {
      if (val === true) {  
        this.getEmployeeList();
      }
    });
  }
  

  getEmployeeList(pageEvent?: PageEvent) {
    const pageIndex = pageEvent ? pageEvent.pageIndex : 0;
    const pageSize = pageEvent ? pageEvent.pageSize : 10;
  
    this._empService.getEmployeeList(pageIndex, pageSize).subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._empService.deleteEmployee(id).subscribe({
      next: () => {
        alert('Deleted');
        this.getEmployeeList();
      },
      error: (err: any) => {
        console.log(err);
        alert('An error occurred while deleting the employee.');
      },
    });
  }
  

  openEditForm(data: any) {
    this._dialog.open(EmpAddEditComponent, {
      data,
    });
  }

  viewEmployee(row: any) {
   
    console.log('View Employee:', row);
  }
}
