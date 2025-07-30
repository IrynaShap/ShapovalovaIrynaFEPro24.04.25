$(function() {
  const $taskForm = $('#taskForm');
  const $taskTitle = $('#taskTitle');
  const $taskDescription = $('#taskDescription');
  const $saveBtn = $('#saveBtn');
  const $taskList = $('#taskList');
  const taskModal = new bootstrap.Modal($('#taskModal'));
  const $modalTitle = $('#taskModalLabel');
  const $modalDesc = $('#taskModalDescription');

  function checkInputs() {
    $saveBtn.prop('disabled', !($.trim($taskTitle.val()) && $.trim($taskDescription.val())));
  }
  $taskTitle.on('input', checkInputs);
  $taskDescription.on('input', checkInputs);

  $taskForm.on('submit', function(e) {
    e.preventDefault();
    const title = $.trim($taskTitle.val());
    const description = $.trim($taskDescription.val());
    if (!title || !description) return;
    dataBase.setData({ title, description });
    $taskTitle.val('');
    $taskDescription.val('');
    $saveBtn.prop('disabled', true);
    renderTaskList();
  });

  function renderTaskList() {
    const items = dataBase.getData();
    $taskList.empty();
    items.forEach(item => {
      const $li = $('<li>').addClass('list-group-item d-flex justify-content-between align-items-center').text(item.title);
      const $viewBtn = $('<button>').addClass('btn btn-primary btn-sm me-2').text('View').on('click', function() {
        $modalTitle.text(item.title);
        $modalDesc.text(item.description);
        taskModal.show();
      });
      const $delBtn = $('<button>').addClass('btn btn-danger btn-sm').text('Delete').on('click', function() {
        dataBase.deleteData({ id: item.id });
        renderTaskList();
      });
      $li.append($('<div>').append($viewBtn, $delBtn));
      $taskList.append($li);
    });
  }

  renderTaskList();
});