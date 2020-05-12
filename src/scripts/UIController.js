// UI CONTROLLER

const DOMstrings = {
    inputType: '.manage__type',
    inputSubInc: `.manage__list-inc`,
    inputSubExp: `.manage__list-exp`,
    inputSub: `.manage__list`,
    inputSelect: `.manage__sublist`,
    inputDescription: '.manage__description',
    inputValue: '.manage__value',
    inputBtn: '.manage__add',
    clearBtn: '.manage__clear',
    iconBtn: '.manage__icon',
    detailedContainer: '.detailed__list',
    budgetLabel: '.budget__total--value',
    incomeLabel: '.budget__income--value',
    expensesLabel: '.budget__expenses--value',
    percentageLabel: '.budget__expenses--percentage',
    container: '.detailed__container',
    expensesPercLabel: '.item__percentage',
    dateLabel: {
        labelMonth: '.budget__month',
        labelYear: '.budget__year'
    },
    item: '.item',
    editBtn: '.item__button'

};
export const {
    inputType,
    inputSubInc,
    inputSubExp,
    inputSub,
    inputSelect,
    inputDescription,
    inputValue,
    inputBtn,
    clearBtn,
    iconBtn,
    detailedContainer,
    budgetLabel,
    incomeLabel,
    expensesLabel,
    percentageLabel,
    container,
    expensesPercLabel,
    dateLabel: {
        labelMonth,
        labelYear
    },
    item,
    editBtn
} = DOMstrings


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


const weekDays = new Map();
weekDays.set(0, 'Sun');
weekDays.set(1, 'Mon');
weekDays.set(2, 'Tue');
weekDays.set(3, 'Wed');
weekDays.set(4, 'Thu');
weekDays.set(5, 'Fri');
weekDays.set(6, 'Sat');


export const getInput = () => {
    return {
        date: currentDate(),
        type: document.querySelector(inputType).value,
        description: document.querySelector(inputDescription).value,
        value: parseFloat(document.querySelector(inputValue).value),
    };
};


export const addListItem = (obj, type) => {
    let html;
    if (type === 'inc') {
        html = `<li class ="item detailed__item" id ="${type}-${obj.id}">
            <div class="item__date">
                <div class ="item__number">${obj.date.day}</div>
                <div class ="item__day">${obj.date.weekDay}</div>
            </div>
            <div class ="item__description">${obj.description}</div>
            <div class="item__value--inc item__value">${formatNumber(obj.value, type)} £</div>
            <button type="button" class="item__button">
                <i class="far fa-trash-alt item__button-icon"></i>
            </button>
        </li>`
    } else if (type === 'exp') {
        html = `<li class ="item detailed__item" id ="${type}-${obj.id}"><div class="item__date">
        <div class ="item__number">${obj.date.day}</div><div class ="item__day">${obj.date.weekDay}</div> </div>
        <div class ="item__description">${obj.description}</div>
        <div class="item__value--exp item__value">${formatNumber(obj.value, type)} £</div>
        <div class ="item__percentage"></div> <button type="button" class="item__button ">
             <i class="far fa-trash-alt item__button-icon"> </i>
</button>
         </li>`
    }
    document.querySelector(detailedContainer).insertAdjacentHTML('beforeend', html);
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
    document.querySelector(inputType).focus()
}

export const displayBudget = function(obj) {
    let type;
    obj.budget > 0 ? type = 'inc' : type = 'exp';
    document.querySelector(budgetLabel).textContent = formatNumber(obj.budget, type) + '£';
    document.querySelector(incomeLabel).textContent = formatNumber(obj.totalInc, 'inc') + '£';
    document.querySelector(expensesLabel).textContent = formatNumber(obj.totalExp, 'exp') + '£';

    if (obj.percentage > 0) {
        document.querySelector(percentageLabel).textContent = obj.percentage + '%';
    } else {
        document.querySelector(percentageLabel).textContent = '';
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
export const displaySubEl = (sub) => {
    for (let [key, value] of Object.entries(sub)) {
        document.querySelector(`.${key}`).textContent = `${value} £`
    }
}

export const deleteListItem = (selectorID) => {
    const el = document.getElementById(selectorID);
    el.parentNode.removeChild(el);
};
export const currentDate = () => {
    const date = new Date()
    const dayWeek = date.getDay();
    const dayMonth = date.getDate();
    const newDate = {
        weekDay: weekDays.get(dayWeek),
        day: dayMonth

    }
    return newDate;
}

export const displayMonth = () => {
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    document.querySelector(labelMonth).textContent = months.get(month)
    document.querySelector(labelYear).textContent = year
}

export const changedType = () => {
    let type = getInput().type;
    changeColor(type)
    showSubList(type);
    showCategory()
}


const changeColor = (type) => {
    const icon = document.querySelector(iconBtn)
    if (type == 'inc') {
        icon.innerHTML = 'add'
    } else if (type == 'exp') {
        icon.innerHTML = 'remove'
    }
    icon.style.color = `var(--color-${type})`


}

export const clearBudget = () => {
    const items = [...document.querySelectorAll(item)]
    items.map(item => {
        document.querySelector(detailedContainer).removeChild(item)
    })

}
export const showSubList = () => {
    let type = getInput().type
    let sublist;
    if (type == "inc") {
        sublist = `<select aria-label="selet exact icnome" class ="manage__list manage__list-inc"
                 id = "icomes"
                 name = "incomesList">
                <option class ="manage__option" value="salary">salary</option>
                 <option value ="auction">auction</option>
                 <option value ="renting">renting</option>
                 <option selected value ="othersInc">other </option>
                 </select>`
    } else if (type == "exp") {
        sublist = `<select aria-label="selet exact expense" class ="manage__list manage__list-exp"
                 id = "expenses"
                 name = "expensesList">
                <option class ="manage__option" value="bills">bills</option>
                 <option value ="shopping">shopping</option>
                <option value="trips">trips</option>
                 <option selected value ="othersExp">other </option>
                 </select>`
    }

    document.querySelector(inputSelect).innerHTML = sublist;
}

export const showCategory = () => {
    return document.querySelector(inputSub).value;


}