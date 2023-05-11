import { Component } from '@angular/core';
import { AssignmentService } from '../services/assignment.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-assignment-form',
  templateUrl: './assignment-form.component.html',
  styleUrls: ['./assignment-form.component.css'],
})
export class AssignmentFormComponent {
  assignmentForm!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _assignmentServics: AssignmentService,
    private router: Router
  ) {
    this.assignmentForm = this._fb.group({
      name: '',
      subject: '',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
    });
  }
  formSubmit() {
    console.log(this.assignmentForm.value);
    if (this.assignmentForm.valid) {
      this._assignmentServics
        .addAssignment(this.assignmentForm.value)
        .subscribe({
          next: (val: any) => {
            // alert('assignment added successfully');
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      var x = document.getElementById('snackbar');
      if (x != null) {
        x.className = 'show';
        setTimeout(() => {
          if (x != null) x.className = x.className.replace('show', '');
          this.changeRoute();
        }, 3000);
      }
    }
  }
  changeRoute() {
    this.router.navigate(['/']);
  }
}
