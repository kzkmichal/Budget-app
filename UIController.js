// UI CONTROLLER

const DOMstrings = {
    inputType: '.add__type',
    inputDescription: '.add__description',
    inputValue: '.add__value',
    inputBtn: '.add__btn',
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list',
    budgetLabel: '.budget__value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.container',
    expensesPercLabel: '.item__percentage',
    dateLabel: '.budget__title--month'
};
export const {
    inputType,
    inputDescription,
    inputValue,
    inputBtn,
    incomeContainer,
    expensesContainer,
    budgetLabel,
    incomeLabel,
    expensesLabel,
    percentageLabel,
    container,
    expensesPercLabel,
    dateLabel,
} = DOMstrings


export const getInput = () => {
    return {
        type: document.querySelector(inputType).value,
        description: document.querySelector(inputDescription).value,
        value: parseFloat(document.querySelector(inputValue).value)
    };
};


export const addListItem = (obj, type) => {
    let html, newHtml, element;

    if (type === 'inc') {
        element = incomeContainer;
        html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    } else if (type === 'exp') {
        element = expensesContainer;

        html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
    }

    // Replace the placeholder text with some actual data
    newHtml = html.replace('%id%', obj.id);
    newHtml = newHtml.replace('%description%', obj.description);
    newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

    // Insert the HTML into the DOM
    document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
}
const formatNumber = function(num, type) {
    num = Math.abs(num);
    num = num.toFixed(2);

    const numSplit = num.split('.');

    let int = numSplit[0];
    if (int.length > 3) {
        int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3)
    }
    const dec = numSplit[1];
    return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

};

export const clearFields = () => {

    const fields = [...(document.querySelectorAll(inputDescription + ',' + inputValue))]
    fields.forEach(field => {
        field.value = ''
    })
    fields[0].focus()
}

export const displayBudget = function(obj) {
    let type;
    obj.budget > 0 ? type = 'inc' : type = 'exp';

    document.querySelector(budgetLabel).textContent = formatNumber(obj.budget, type);
    document.querySelector(incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
    document.querySelector(expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');

    if (obj.percentage > 0) {
        document.querySelector(percentageLabel).textContent = obj.percentage + '%';
    } else {
        document.querySelector(percentageLabel).textContent = '---';
    }

}

export const displayPercentages = (percentages) => {
    const fields = document.querySelectorAll(expensesPercLabel)

    fields.forEach((field, index) => {
        if (percentages[index] > 0) {
            field.textContent = percentages[index] + '%';
        } else {
            field.textContent = '---';
        }
    })

}



export const deleteListItem = (selectorID) => {
    const el = document.getElementById(selectorID);
    el.parentNode.removeChild(el);

};

export const displayMonth = () => {

    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const months = new Map();
    months.set(0, 'January');
    months.set(1, 'February');
    months.set(2, 'March');
    months.set(3, 'April');
    months.set(4, 'May');
    months.set(5, 'June');
    months.set(6, 'July');
    months.set(7, 'August');
    months.set(8, 'September');
    months.set(9, 'October');
    months.set(10, 'November');
    months.set(11, 'December');

    document.querySelector(dateLabel).textContent = months.get(month) + ' ' + year;
}

export const changedType = () => {

    const fields = [...document.querySelectorAll(
        DOMstrings.inputType + ',' +
        DOMstrings.inputDescription + ',' +
        DOMstrings.inputValue)];

    fields.map((el) => {
        el.classList.toggle('red-focus');
    })

    document.querySelector(inputBtn).classList.toggle('red');

}