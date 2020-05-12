import *
as UI
from "./UIController.js"

import *
as
budgetCtrl
from "./budgetController.js"

const localArr = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
localStorage.setItem('items', JSON.stringify(localArr))


const setupEventListeners = () => {
    document.querySelector(UI.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress', (e) => {
        if (e.keyCode === 13 || e.which === 13) {
            ctrlAddItem();
        }
    });

    document.querySelector(UI.container).addEventListener('click', ctrlDeleteItem);
    document.querySelector(UI.inputType).addEventListener('change', UI.changedType);
    document.querySelector(UI.inputSub).addEventListener('change', UI.showCategory)
};
document.querySelector(UI.clearBtn).addEventListener('click',
    () => {
        const result = confirm('Are you sure you want to delete all items?')
        if (result) {
            localStorage.clear('items');
            localArr.splice(0, localArr.length)
            UI.clearBudget()
            budgetCtrl.deleteBudget()
            update()
        }
    }
);

const updateBudget = () => {
    budgetCtrl.calculateBudget();
    const budget = budgetCtrl.getBudget();
    const sublist = budgetCtrl.getSublist();
    UI.displayBudget(budget);
    UI.displaySubEl(sublist);
};


const updatePercentages = function() {
    budgetCtrl.calculatePercentages();
    const percentages = budgetCtrl.getPercentages();
    UI.displayPercentages(percentages);
};


const uploadLocalStorage = () => {
    const localData = JSON.parse(localStorage.getItem('items'))
    localData.forEach(el => {
        const newItem = budgetCtrl.addItem(el.date, el.type, el.description, el.value, el.category);
        UI.addListItem(newItem, el.type);
    });
}

const ctrlAddItem = () => {
    const {
        date,
        type,
        description,
        value,
    } = UI.getInput();
    const category = UI.showCategory();
    if (description !== "" && !isNaN(value) && value > 0) {
        const newItem = budgetCtrl.addItem(date, type, description, value, category);
        const newLocalItem = {
            ...UI.getInput(),
            ...newItem,
        }

        localArr.push(newLocalItem);
        localStorage.setItem('items', JSON.stringify(localArr))
        console.log(localArr);
        UI.addListItem(newItem, type)
        UI.clearFields();
        update()

    }
};



const ctrlDeleteItem = (event) => {
    const itemID = event.target.parentNode.parentNode.id || event.target.parentNode.parentNode.parentNode.id;

    if (itemID) {
        const splitID = itemID.split('-');
        const type = splitID[0];
        const id = parseInt(splitID[1]);
        const indexLocal = localArr.findIndex(element => element.type === type && element.id === id)
        localArr.splice(indexLocal, 1)
        localStorage.setItem('items', JSON.stringify(localArr))
        budgetCtrl.deleteItem(type, id);
        UI.deleteListItem(itemID);
        update()
    }

};

const update = () => {
    updateBudget();
    updatePercentages();
}


export const init = () => {
    UI.displayMonth()
    UI.changedType()
    UI.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1
    });
    setupEventListeners();
    uploadLocalStorage()
    update()

}
init();