document.addEventListener("DOMContentLoaded", () => {

    const url = "http://localhost:3000/tasks";

    // DOM elements
    const title = document.getElementById("title");
    const desc = document.getElementById("desc");
    const status = document.getElementById("status");
    const btn = document.querySelector(".btn-primary");
    const tbody = document.querySelector("tbody");
    const search = document.querySelector(".search-input");
    const filter = document.querySelector(".filter-select");

    let editId = null;
    let tasks = []; 

    // all task
    getAllTasks();

    function getAllTasks() {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                tasks = data;
                filterTasks();
            })
            .catch(err => console.error(err));
    }

    const render = (taskList) => {
        tbody.innerHTML = "";

        if (taskList.length === 0) {
            tbody.innerHTML = "<tr><td colspan='6' style='text-align:center'>No tasks found.</td></tr>";
            return;
        }

        taskList.forEach(t => {
            // format date
            let date = t.created_at ? new Date(t.created_at).toLocaleDateString() : "N/A";
            
            //set badge color
            let badge = t.status && t.status.toLowerCase() === "completed" ? "completed" : "pending";

            const row = `
                <tr>
                    <td>#${t.id}</td>
                    <td>${t.title}</td>
                    <td>${t.description || ""}</td>
                    <td><span class="badge ${badge}">${t.status}</span></td>
                    <td>${date}</td>
                    <td class="actions">
                        <button class="btn-icon edit" data-id="${t.id}">✏️</button>
                        <button class="btn-icon delete" data-id="${t.id}">🗑️</button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    }

    const filterTasks = () => {
        const text = search.value.toLowerCase();
        const stat = filter.value;

        const filtered = tasks.filter(t => {
            const matchText = t.title.toLowerCase().includes(text);
            const matchStat = stat === "all" || t.status.toLowerCase() === stat;
            return matchText && matchStat;
        });

        render(filtered);
    }

    // event listeners
    search.addEventListener("input", filterTasks);
    filter.addEventListener("change", filterTasks);

    // Add / update task
    btn.addEventListener("click", () => {
        const tVal = title.value;
        const dVal = desc.value;
        const sVal = status.value;

        if (tVal === "") {
            alert("Title is required!");
            return;
        }

        const data = {
            title: tVal,
            description: dVal,
            status: sVal.charAt(0).toUpperCase() + sVal.slice(1),
            created_at: new Date().toISOString()
        };

        if (editId === null) {
            // create
            fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then(() => {
                clearData();
                getAllTasks();
            });
        } else {
            // update
            fetch(`${url}/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            }).then(() => {
                clearData();
                getAllTasks();
            });
        }
    });

    // Handle edit & delete
    tbody.addEventListener("click", (e) => {
        const target = e.target;
        const editBtn = target.closest(".edit");
        const delBtn = target.closest(".delete");

        if (editBtn) {
            const id = editBtn.getAttribute("data-id");
            fetch(`${url}/${id}`)
                .then(res => res.json())
                .then(data => {
                    title.value = data.title;
                    desc.value = data.description || "";
                    status.value = data.status ? data.status.toLowerCase() : "pending";

                    editId = id;
                    btn.textContent = "Update Task";
                    btn.style.backgroundColor = "#4f46e5"; 
                });
        }

        if (delBtn) {
            const id = delBtn.getAttribute("data-id");
            if (confirm("Are you sure you want to delete?")) {
                fetch(`${url}/${id}`, { method: "DELETE" })
                    .then(() => getAllTasks());
            }
        }
    });

    function clearData() {
        title.value = "";
        desc.value = "";
        status.value = "pending";
        editId = null;
        btn.textContent = "Add Task";
        btn.style.backgroundColor = "#6366f1"; 
    }
});