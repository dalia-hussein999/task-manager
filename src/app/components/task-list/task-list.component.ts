import { Component, OnInit } from '@angular/core';
import { FetchTasksService } from '../../services/fetch-tasks.service';
import { Task } from '../../interfaces/task';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
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
        this.tasks = data;
        console.log("tasks:", this.tasks);
      });
  }

  toggleCompletion(task: Task): void {
    task.completed = !task.completed;
  }
}
