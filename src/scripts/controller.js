import *
as UI
from "./UIController.js"

import *
as
budgetCtrl
from "./budgetController.js"

const arr = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(arr))


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
document.querySelector(UI.clearBtn).addEventListener('click', () => {
    localStorage.clear('items');
    arr.splice(0, arr.length)
    UI.clearBudget()
    budgetCtrl.deleteBudget()
    update()

});



const updateBudget = () => {
    // 1. Calculate the budget
    budgetCtrl.calculateBudget();
    // 2. Return the budget
    const budget = budgetCtrl.getBudget();
    const sublist = budgetCtrl.getSublist();
    // 3. Display the budget on the UI
    UI.displayBudget(budget);
    UI.displaySubEl(sublist);
};


const updatePercentages = function() {
    // 1. Calculate percentages
    budgetCtrl.calculatePercentages();
    // 2. Read percentages from the budget controller
    const percentages = budgetCtrl.getPercentages();
    // 3. Update the UI with the new percentages
    UI.displayPercentages(percentages);
};

const updatetype = () => {
    const type = UI.getInput().type
    UI.showSubList(type);
}


const uploadLocalStorage = () => {
    const localData = JSON.parse(localStorage.getItem('items'))
    localData.forEach(el => {
        const newItem = budgetCtrl.addItem(el.date, el.type, el.description, el.value, el.category);
        UI.addListItem(newItem, el.type);
        update()
    });
}

const ctrlAddItem = () => {
    // 1. Get the field input data
    const {
        date,
        type,
        description,
        value,
    } = UI.getInput();

    const category = UI.showSubList();

    if (description !== "" && !isNaN(value) && value > 0) {
        // 2. Add the item to the budget controller
        const newItem = budgetCtrl.addItem(date, type, description, value, category);

        // 3. Add the item to the UI
        const newLocalItem = {
            ...UI.getInput(),
            ...newItem,
        }
        console.log(newLocalItem);

        // arr.push(newLocalItem)
        // localStorage.setItem('items', JSON.stringify(arr))


        // UI.addListItem(newItem, type, )
        //     // 4. Clear the fields
        //     // UI.showSubList(type);
        // UI.clearFields();
        updatetype();
        // // 5. Calculate and update budget
        // update()
        // 6. Calculate and update percentages




        // }
    }
};

//


const ctrlDeleteItem = (event) => {
    const itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemID) {
        //         //inc-1
        const splitID = itemID.split('-');
        const type = splitID[0];
        const id = parseInt(splitID[1]);
        // 1. delete the item from the data structure
        budgetCtrl.deleteItem(type, id);
        // 2. Delete the item from the UI
        UI.deleteListItem(itemID);
        // budgetCtrl.deleteSubEl(type, id);

        // 3. Update and show the new budget
        update()
            // 4. Calculate and update percentages
        const indexLocal = arr.findIndex(element => element.type === type && element.id === id)
        arr.splice(indexLocal, 1)
        localStorage.setItem('items', JSON.stringify(arr))


    }

};
// const {
//     incomeList,
//     ExpensesList
// } = UI.getSubList()


const update = () => {

    updateBudget();

    updatePercentages();




}


export const init = () => {
    // UI.displayMonth()
    updatetype()
        // UI.displayBudget({
        //     budget: 0,
        //     totalInc: 0,
        //     totalExp: 0,
        //     percentage: -1
        // });
    setupEventListeners();
    // uploadLocalStorage()
    console.log(UI.getInput());

}

init();