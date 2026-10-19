
package com.example.toDoApp.service;

import com.example.toDoApp.Todo;
import com.example.toDoApp.repository.TodoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private final TodoRepository todoRepository;

    public TodoService(TodoRepository todoRepository) {
        this.todoRepository = todoRepository;
    }

    // Create a task
    public Todo createTodo(Todo todo) {
        return todoRepository.save(todo);
    }

    // Get all tasks
    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    // Get a task by ID
    public Todo getTodoById(Long id) {
        return todoRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Todo not found with id: " + id));
    }

    // Update a task
    public Todo updateTodo(Long id, Todo updatedTodo) {
        Todo existingTodo = getTodoById(id);

        existingTodo.setTitle(updatedTodo.getTitle());
        existingTodo.setCompleted(updatedTodo.isCompleted());

        return todoRepository.save(existingTodo);
    }

    // Delete a task
    public void deleteTodo(Long id) {
        if (!todoRepository.existsById(id)) {
            throw new RuntimeException("Todo not found with id: " + id);
        }

        todoRepository.deleteById(id);
    }
}
