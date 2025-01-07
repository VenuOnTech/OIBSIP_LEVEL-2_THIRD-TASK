document.addEventListener("DOMContentLoaded", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const addTaskButton = document.getElementById("add-task-btn");
    const taskNameInput = document.getElementById("task-name");
    const dueDateInput = document.getElementById("due-date");
    const categoryInput = document.getElementById("category");
    const priorityInput = document.getElementById("priority");
    const pendingTasksContainer = document.getElementById("pending-tasks-container");
    const completedTasksContainer = document.getElementById("completed-tasks-container");
    const togglePendingButton = document.getElementById("toggle-pending-btn");
    const toggleCompletedButton = document.getElementById("toggle-completed-btn");
    const filterControls = document.getElementById("filter-controls");
    const startDateInput = document.getElementById("start-date");
    const endDateInput = document.getElementById("end-date");
    const priorityFilterInput = document.getElementById("priority-filter");
    const applyFilterButton = document.getElementById("apply-filter-btn");
    const clearFilterButton = document.getElementById("clear-filter-btn");
    const themeToggle = document.getElementById("theme-toggle");
  
    const saveTasks = () => localStorage.setItem("tasks", JSON.stringify(tasks));
  
    const renderTasks = (filter = null) => {
      const pendingTasksList = document.getElementById("pending-tasks");
      const completedTasksList = document.getElementById("completed-tasks");
  
      pendingTasksList.innerHTML = "";
      completedTasksList.innerHTML = "";
  
      tasks.forEach((task, index) => {
        if (filter && !applyFilter(task, filter)) return;
  
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
          <span>${task.name} (${task.priority}) - ${task.dueDate || "No due date"}</span>
          <div>
            <button onclick="toggleComplete(${index})">Complete</button>
            <button onclick="deleteTask(${index})">Delete</button>
          </div>
        `;
        (task.completed ? completedTasksList : pendingTasksList).appendChild(li);
      });
    };
  
    const applyFilter = (task, filter) => {
      const { startDate, endDate, priority } = filter;
      const taskDate = task.dueDate ? new Date(task.dueDate) : null;
  
      if (startDate && taskDate && taskDate < new Date(startDate)) return false;
      if (endDate && taskDate && taskDate > new Date(endDate)) return false;
      if (priority !== "All" && task.priority !== priority) return false;
  
      return true;
    };
  
    addTaskButton.addEventListener("click", () => {
      const task = {
        name: taskNameInput.value.trim(),
        dueDate: dueDateInput.value,
        category: categoryInput.value,
        priority: priorityInput.value,
        completed: false,
      };
      if (!task.name) return alert("Task name cannot be empty!");
      tasks.push(task);
      saveTasks();
      renderTasks();
      taskNameInput.value = "";
      dueDateInput.value = "";
      categoryInput.value = "Work";
      priorityInput.value = "Medium";
    });
  
    togglePendingButton.addEventListener("click", () => {
      const isVisible = pendingTasksContainer.style.display === "block";
      pendingTasksContainer.style.display = isVisible ? "none" : "block";
      togglePendingButton.textContent = isVisible ? "Show Pending Tasks" : "Hide Pending Tasks";
      filterControls.style.display = isVisible ? "none" : "flex";
    });
  
    toggleCompletedButton.addEventListener("click", () => {
      const isVisible = completedTasksContainer.style.display === "block";
      completedTasksContainer.style.display = isVisible ? "none" : "block";
      toggleCompletedButton.textContent = isVisible ? "Show Completed Tasks" : "Hide Completed Tasks";
      filterControls.style.display = isVisible ? "none" : "flex";
    });
  
    applyFilterButton.addEventListener("click", () => {
      const filter = {
        startDate: startDateInput.value,
        endDate: endDateInput.value,
        priority: priorityFilterInput.value,
      };
      renderTasks(filter);
    });
  
    clearFilterButton.addEventListener("click", () => {
      startDateInput.value = "";
      endDateInput.value = "";
      priorityFilterInput.value = "All";
      renderTasks();
    });

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
      });
    
      window.toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
      };
  
    window.toggleComplete = (index) => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };
  
    window.deleteTask = (index) => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };
  
    renderTasks();
  });
  