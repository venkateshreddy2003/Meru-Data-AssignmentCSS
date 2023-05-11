import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../services/assignment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _assignmentServics: AssignmentService) {
    this.getAssignmentList();
  }
  closedList!: any;
  openList!: any;
  loading = true;
  displayedColumns: string[] = [
    'name',
    'subject',
    'startDate',
    'endDate',
    'startTime',
    'endTime',
  ];
  ngOnInit(): void {
    this.getAssignmentList();
  }
  openForm() {}
  title = 'Assignment';

  getAssignmentList() {
    this._assignmentServics.getAssignmentList().subscribe({
      next: (res) => {
        const lst = res;
        const open = lst.filter((x: any) => {
          const d = new Date(x.endDate);
          const endTime = x.endTime.split(':');
          d.setHours(endTime[0]);
          d.setMinutes(endTime[1]);
          return d > new Date();
        });
        open.forEach((x: any) => {
          const endTime = x.endTime.split(':');
          const startTime = x.startTime.split(':');
          let hours = endTime[0]; // gives the value in 24 hours format
          let AmOrPm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12 || 12;
          let minutes = endTime[1];
          let finalTime = hours + ':' + minutes + ' ' + AmOrPm;
          x.endTime = finalTime;
          hours = startTime[0]; // gives the value in 24 hours format
          AmOrPm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12 || 12;
          minutes = startTime[1];
          finalTime = +hours + ':' + minutes + ' ' + AmOrPm;
          x.startTime = finalTime;
        });
        this.openList = open;
        const closed = lst.filter((x: any) => {
          const d = new Date(x.endDate);
          const endTime = x.endTime.split(':');
          d.setHours(endTime[0]);
          d.setMinutes(endTime[1]);
          return d <= new Date();
        });
        closed.forEach((x: any) => {
          const endTime = x.endTime.split(':');
          const startTime = x.startTime.split(':');
          let hours = endTime[0]; // gives the value in 24 hours format
          let AmOrPm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12 || 12;
          let minutes = endTime[1];
          let finalTime = +hours + ':' + minutes + ' ' + AmOrPm;
          x.endTime = finalTime;
          hours = startTime[0]; // gives the value in 24 hours format
          AmOrPm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12 || 12;
          minutes = startTime[1];
          finalTime = +hours + ':' + minutes + ' ' + AmOrPm;
          x.startTime = finalTime;
        });
        console.log(open);
        console.log('from app comnponent' + closed);
        this.closedList = closed;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
