import { Component , Input , Output , EventEmitter } from '@angular/core';
import { Task } from '../../interfaces/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() task!: Task; 
  @Output() taskToggled = new EventEmitter<Task>();

  toggleCompletion() {
    this.task.completed = !this.task.completed;
    this.taskToggled.emit(this.task); 
  }

}
