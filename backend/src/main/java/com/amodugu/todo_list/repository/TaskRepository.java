package com.amodugu.todo_list.repository;

import com.amodugu.todo_list.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    // Spring Data JPA provides CRUD methods by default
}
