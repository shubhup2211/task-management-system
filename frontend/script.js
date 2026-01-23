document.addEventListener("DOMContentLoaded", function () {

    const API_URL = "http://localhost:3000/tasks";

    const titleInput = document.getElementById("title");
    const descInput = document.getElementById("desc");
    const statusSelect = document.getElementById("status");
    const formButton = document.querySelector(".btn-primary");
    const tableBody = document.querySelector("tbody");
    
    const searchInput = document.querySelector(".search-input");
    const filterSelect = document.querySelector(".filter-select");

    let editingTaskId = null;
    let allTasks = []; 

    fetchTasks();

    function fetchTasks() {
        fetch(API_URL)
            .then(res => res.json())
            .then(data => {
                allTasks = data;
                filterAndRenderTasks();
            })
            .catch(error => console.error(error));
    }

    function renderTasksToTable(tasks) {
        tableBody.innerHTML = "";

        if (tasks.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='6' style='text-align:center'>No tasks found.</td></tr>";
            return;
        }

        tasks.forEach(task => {
            let dateString = "N/A";
            if (task.created_at) {
                dateString = new Date(task.created_at).toLocaleDateString();
            }

            let badgeClass = "pending";
            if (task.status && task.status.toLowerCase() === "completed") {
                badgeClass = "completed";
            }

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>#${task.id}</td>
                <td>${task.title}</td>
                <td>${task.description || ""}</td>
                <td>
                    <span class="badge ${badgeClass}">${task.status}</span>
                </td>
                <td>${dateString}</td>
                <td class="actions">
                    <button class="btn-icon edit" data-id="${task.id}">✏️</button>
                    <button class="btn-icon delete" data-id="${task.id}">🗑️</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    function filterAndRenderTasks() {
        const searchText = searchInput.value.toLowerCase();
        const filterStatus = filterSelect.value;

        const filteredTasks = allTasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchText);
            const matchesFilter = filterStatus === "all" || task.status.toLowerCase() === filterStatus;
            
            return matchesSearch && matchesFilter;
        });

        renderTasksToTable(filteredTasks);
    }

    searchInput.addEventListener("input", filterAndRenderTasks);
    filterSelect.addEventListener("change", filterAndRenderTasks);

    formButton.addEventListener("click", function () {
        const titleValue = titleInput.value;
        const descValue = descInput.value;
        const statusValue = statusSelect.value;

        if (titleValue === "") {
            alert("Please enter a Title!");
            return;
        }

        const taskData = {
            title: titleValue,
            description: descValue,
            status: statusValue.charAt(0).toUpperCase() + statusValue.slice(1),
            created_at: new Date().toISOString()
        };

        if (editingTaskId === null) {
            fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData)
            })
            .then(() => {
                clearForm();
                fetchTasks();
            });
        } else {
            fetch(`${API_URL}/${editingTaskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData)
            })
            .then(() => {
                clearForm();
                fetchTasks();
            });
        }
    });

    tableBody.addEventListener("click", function (event) {
        const target = event.target;
        
        const editBtn = target.closest(".edit");
        const deleteBtn = target.closest(".delete");

        if (editBtn) {
            const id = editBtn.getAttribute("data-id");
            
            if (!id) return;

            fetch(`${API_URL}/${id}`)
                .then(res => {
                    if (!res.ok) throw new Error("Task not found");
                    return res.json();
                })
                .then(task => {
                    titleInput.value = task.title;
                    descInput.value = task.description || "";
                    
                    if (task.status) {
                        statusSelect.value = task.status.toLowerCase();
                    } else {
                        statusSelect.value = "pending";
                    }

                    editingTaskId = id;
                    formButton.textContent = "Update Task";
                    formButton.style.backgroundColor = "#4f46e5"; 
                })
                .catch(err => {
                    console.error(err);
                    alert("Error: Could not load task. It may have been deleted.");
                    fetchTasks(); 
                });
        }

        if (deleteBtn) {
            const id = deleteBtn.getAttribute("data-id");
            if (id && confirm("Delete this task?")) {
                fetch(`${API_URL}/${id}`, { method: "DELETE" })
                    .then(() => fetchTasks());
            }
        }
    });

    function clearForm() {
        titleInput.value = "";
        descInput.value = "";
        statusSelect.value = "pending";

        editingTaskId = null;
        formButton.textContent = "Add Task";
        formButton.style.backgroundColor = "#6366f1"; 
    }

});