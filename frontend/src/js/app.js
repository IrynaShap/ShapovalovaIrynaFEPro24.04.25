import { dataBase } from './data.js';

$(function () {
    const $taskForm = $('#taskForm');
    const $taskTitle = $('#taskTitle');
    const $taskDescription = $('#taskDescription');
    const $saveBtn = $('#saveBtn');
    const $cancelBtn = $('#cancelBtn');
    const $taskList = $('#taskList');
    const taskModal = new bootstrap.Modal($('#taskModal'));
    const $modalTitle = $('#taskModalLabel');
    const $modalDesc = $('#taskModalDescription');

    let editingTaskId = null;

    function checkInputs() {
        $saveBtn.prop('disabled', !($.trim($taskTitle.val()) && $.trim($taskDescription.val())));
    }
    $taskTitle.on('input', checkInputs);
    $taskDescription.on('input', checkInputs);

    function updateFormMode(isEditing = false) {
        const $formHeader = $('h2:contains("Створити завдання"), h2:contains("Редагувати завдання")');
        const $saveBtn = $('#saveBtn');
        const $cancelBtn = $('#cancelBtn');

        if (isEditing) {
            $formHeader.text('Редагувати завдання');
            $saveBtn.text('Оновити').removeClass('btn-success').addClass('btn-warning');
            $cancelBtn.removeClass('d-none');
        } else {
            $formHeader.text('Створити завдання');
            $saveBtn.text('Зберегти').removeClass('btn-warning').addClass('btn-success');
            $cancelBtn.addClass('d-none');
        }
    }

    function resetForm() {
        $taskTitle.val('');
        $taskDescription.val('');
        $saveBtn.prop('disabled', true);
        editingTaskId = null;
        updateFormMode(false);
    }

    $cancelBtn.on('click', function () {
        resetForm();
    });

    $taskForm.on('submit', async function (e) {
        e.preventDefault();
        const title = $.trim($taskTitle.val());
        const description = $.trim($taskDescription.val());
        if (!title || !description) return;

        let result;
        if (editingTaskId) {
            result = await dataBase.updateData(editingTaskId, { title, description });
        } else {
            result = await dataBase.setData({ title, description });
        }

        if (result) {
            resetForm();
            await renderTaskList();
        } else {
            alert(editingTaskId ? 'Failed to update task' : 'Failed to create task');
        }
    });

    async function renderTaskList() {
        const items = await dataBase.getData();
        $taskList.empty();
        items.forEach(item => {
            const itemId = item._id || item.id; // MongoDB uses _id, fallback to id
            const $li = $('<li>').addClass('list-group-item d-flex justify-content-between align-items-center').text(item.title);

            const $buttonGroup = $('<div>');

            const $viewBtn = $('<button>').addClass('btn btn-primary btn-sm me-2').text('View').on('click', function () {
                $modalTitle.text(item.title);
                $modalDesc.text(item.description);
                taskModal.show();
            });

            const $editBtn = $('<button>').addClass('btn btn-warning btn-sm me-2').text('Edit').on('click', function () {
                editingTaskId = itemId;
                $taskTitle.val(item.title);
                $taskDescription.val(item.description);
                updateFormMode(true);
                checkInputs();
                $taskTitle.focus();
            });

            const $delBtn = $('<button>').addClass('btn btn-danger btn-sm').text('Delete').on('click', async function () {
                if (confirm('Are you sure you want to delete this task?')) {
                    const result = await dataBase.deleteData({ id: itemId });
                    if (result) {
                        await renderTaskList();
                    } else {
                        alert('Failed to delete task');
                    }
                }
            });

            $buttonGroup.append($viewBtn, $editBtn, $delBtn);
            $li.append($buttonGroup);
            $taskList.append($li);
        });
    }

    renderTaskList();
});
