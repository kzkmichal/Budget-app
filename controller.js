import *
as UI
from "./UIController.js"

import *
as
budgetCtrl
from "./budgetController.js"


const setupEventListeners = () => {
    document.querySelector(UI.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', (e) => {
        if (e.keyCode === 13 || e.which === 13) {
            ctrlAddItem();
        }
    });

    document.querySelector(UI.container).addEventListener('click', ctrlDeleteItem);

    document.querySelector(UI.inputType).addEventListener('change', UI.changedType);
};


const updateBudget = () => {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    const budget = budgetCtrl.getBudget();
    // 3. Display the budget on the UI
    UI.displayBudget(budget);
};


const updatePercentages = function() {
    // 1. Calculate percentages
    budgetCtrl.calculatePercentages();
    // 2. Read percentages from the budget controller
    const percentages = budgetCtrl.getPercentages();
    // 3. Update the UI with the new percentages
    UI.displayPercentages(percentages);
};


const ctrlAddItem = () => {
    // 1. Get the field input data
    // const input = UI.getInput();
    const {
        type,
        description,
        value
    } = UI.getInput();
    if (description !== "" && !isNaN(value) && value > 0) {
        // 2. Add the item to the budget controller
        const newItem = budgetCtrl.addItem(type, description, value);
        console.log(newItem);

        // 3. Add the item to the UI
        UI.addListItem(newItem, type)
            // 4. Clear the fields
        UI.clearFields();

        // 5. Calculate and update budget
        updateBudget();

        // 6. Calculate and update percentages
        updatePercentages();
        // }
    }
};


const ctrlDeleteItem = (event) => {
    const itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    console.log(itemID);
    if (itemID) {
        //         //inc-1
        const splitID = itemID.split('-');
        const type = splitID[0];
        const id = parseInt(splitID[1]);

        // 1. delete the item from the data structure
        budgetCtrl.deleteItem(type, id);

        // 2. Delete the item from the UI
        UI.deleteListItem(itemID);

        // 3. Update and show the new budget
        updateBudget();

        // 4. Calculate and update percentages
        updatePercentages();
    }
};



const init = () => {
    UI.displayMonth()
    UI.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
    });
    setupEventListeners()
}

init();