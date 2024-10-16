import { Component, OnInit } from '@angular/core';
import { FetchTasksService } from '../../services/fetch-tasks.service';
import { Task } from '../../interfaces/task';
import { catchError, of } from 'rxjs';
import { TaskItemComponent } from "../task-item/task-item.component";


@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskItemComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  errorMessage: string | null = null; 

  constructor(private fetchTasksService: FetchTasksService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.fetchTasksService.getTasks()
      .pipe(
        catchError((error) => {
          this.errorMessage = "Error loading tasks."; 
          console.error("Error loading tasks:", error);
          return of([]); 
        })
      )
      .subscribe((data) => {
        this.tasks = data.slice(0, 20);
        console.log("tasks:", this.tasks);
      });
  }

  onTaskToggled(updatedTask: Task) {
   const index = this.tasks.findIndex((task) => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }
}
