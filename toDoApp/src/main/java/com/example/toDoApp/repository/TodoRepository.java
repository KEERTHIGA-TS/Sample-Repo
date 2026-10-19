package com.example.toDoApp.repository;

import com.example.toDoApp.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
