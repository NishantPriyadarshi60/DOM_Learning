document.addEventListener("DOMContentLoaded", function() {
    const expenseAmountInput = document.getElementById("expenseAmount");
    const descriptionInput = document.getElementById("description");
    const chooseCategoryInput = document.getElementById("chooseCategory");
    const addExpenseButton = document.getElementById("addExpense");
    const expenseList = document.getElementById("expenseList");

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let currentEditingExpenseId = null;

    function generateUniqueId() {
        return new Date().getTime().toString();
    }

    function addExpense() {
        const amount = parseFloat(expenseAmountInput.value);
        const description = descriptionInput.value;
        const category = chooseCategoryInput.value;

        if (!amount || !description || !category) {
            alert("Please enter a valid amount, description and category.");
            return;
        }

        const expense = {
            id: currentEditingExpenseId || generateUniqueId(),
            amount,
            description,
            category,
        };

        if (currentEditingExpenseId) {
            const index = expenses.findIndex((exp) => exp.id === currentEditingExpenseId);
            expenses[index] = expense;
            currentEditingExpenseId = null;
        } else {
            expenses.push(expense);
        }

        localStorage.setItem("expenses", JSON.stringify(expenses));

        updateExpenseList();
        clearInputs();
    }

    function updateExpenseList() {
        expenseList.innerHTML = "";
        expenses.forEach((expense, index) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.innerHTML = `
                <strong>${expense.description}</strong> ($${expense.amount}) - ${expense.category}
                <button class="btn btn-danger btn-sm float-right delete-button">Delete</button>
                <button class="btn btn-primary btn-sm float-right edit-button" data-id="${expense.id}">Edit</button>
            `;
            expenseList.appendChild(listItem);

            const editButton = listItem.querySelector(".edit-button");
            const deleteButton = listItem.querySelector(".delete-button");

            editButton.addEventListener("click", () => {
                currentEditingExpenseId = editButton.getAttribute("data-id");
                fillFormFields(currentEditingExpenseId);
            });

            deleteButton.addEventListener("click", () => {
                const index = expenses.findIndex((exp) => exp.id === editButton.getAttribute("data-id"));
                expenses.splice(index, 1);
                localStorage.setItem("expenses", JSON.stringify(expenses));
                updateExpenseList();
            });
        });
    }

    function fillFormFields(expenseId) {
        const expenseToEdit = expenses.find((exp) => exp.id === expenseId);
        expenseAmountInput.value = expenseToEdit.amount;
        descriptionInput.value = expenseToEdit.description;
        chooseCategoryInput.value = expenseToEdit.category;
    }

    function clearInputs() {
        expenseAmountInput.value = "";
        descriptionInput.value = "";
        chooseCategoryInput.value = "";
    }

    addExpenseButton.addEventListener("click", addExpense);

    updateExpenseList();
});
