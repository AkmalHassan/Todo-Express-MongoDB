document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to your elements
    const deleteButtons = document.querySelectorAll('.delete-task');
    deleteButtons.forEach(button => {
      button.addEventListener('click', deleteTask);
    });
  
    const completeCheckboxes = document.querySelectorAll('.task-complete');
    completeCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', toggleTaskCompletion);
    });
  });
  
  function deleteTask(event) {
    
    const taskId = event.target.dataset.taskId;
    fetch(`/delete/${taskId}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          window.location.reload(); // Reload the page to update the list of tasks
        } else {
          console.error('Failed to delete task');
        }
      })
      .catch(error => console.error('Error:', error));
  } 
  
  function toggleTaskCompletion(event) {
    const taskId = event.target.dataset.taskId;
    const isComplete = event.target.checked;
    fetch(`/tasks/${taskId}/completion`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: isComplete })
    })
      .then(response => {
        if (response.ok) {
          console.log('Task completion updated');
        } else {
          console.error('Failed to update task completion');
        }
      })
      .catch(error => console.error('Error:', error));
  }
  