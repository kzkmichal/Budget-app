class Element {
    constructor(id, date, description, value) {
        this.id = id;
        this.date = date;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
}
class Expense extends Element {
    constructor(id, date, description, value, ) {
        super(id, date, description, value)
        this.percentage = -1;
    };


    calcPercentage(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
    };


    getPercentage() {
        return this.percentage;
    };

}

class Income extends Element {
    constructor(id, date, description, value) {
        super(id, date, description, value)
    }
}

const calculateTotal = (type) => {
    let sum = 0;
    data.allItems[type].forEach((cur) => {
        sum += cur.value;
    });
    data.totals[type] = sum;
};

const data = {
    allItems: {
        exp: [],
        inc: []
    },
    totals: {
        exp: 0,
        inc: 0
    },
    budget: 0,
    percentage: -1
};


export const addItem = (date, type, des, val) => {
    let newItem;
    let ID;

    // Create new ID
    if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
    } else {
        ID = 0;
    }

    // Create new item based on 'inc' or 'exp' type
    if (type === 'exp') {
        newItem = new Expense(ID, date, des, val);
    } else if (type === 'inc') {
        newItem = new Income(ID, date, des, val);

    }
    // Push it into our data structure
    data.allItems[type].push(newItem);

    // Return the new element
    return newItem;
}

export const calculateBudget = () => {

    // calculate total income and expenses
    calculateTotal('exp');
    calculateTotal('inc');

    // Calculate the budget: income - expenses
    data.budget = data.totals.inc - data.totals.exp;

    // calculate the percentage of income that we spent
    if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
    } else {
        data.percentage = -1;
    }
}

export const getBudget = () => {
    return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
    }
}
export const calculatePercentages = () => {
    data.allItems.exp.forEach(e => {
        e.calcPercentage(data.totals.inc)
    })

}

export const getPercentages = () => {
    const allPerc = data.allItems.exp.map(e => {
        return e.getPercentage()
    })
    return allPerc;
};

export const deleteItem = (type, id) => {
    const ids = data.allItems[type].map(i => {
        return i.id
    })

    const index = ids.indexOf(id);
    if (index !== -1) {
        data.allItems[type].splice(index, 1)

    }


}
export const deleteBudget = () => {
    data.allItems.inc.splice(0, data.allItems.inc.length)
    data.allItems.exp.splice(0, data.allItems.exp.length)


}