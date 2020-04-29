 class Element {
     constructor(id, date, description, value, category) {
         this.id = id;
         this.date = date;
         this.description = description;
         this.value = value;
         this.percentage = -1;
         this.category = category
     };
 }
 class Expense extends Element {
     constructor(id, date, description, value, category) {
         super(id, date, description, value, category)
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
     constructor(id, date, description, value, category) {
         super(id, date, description, value, category)
     }
 }

 const calculateTotal = (type) => {
     let sum = 0;
     data.allItems[type].forEach((cur) => {
         sum += cur.value;
     });
     data.totals[type] = sum;
 };
 const calculateTotalSub = (category) => {
     let sum = 0;
     sublist[category].forEach((cur) => {
         sum += cur;
     });
     data.sublist[category] = sum;
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

     sublist: {
         salary: 0,
         auction: 0,
         orders: 0,
         othersInc: 0,
         bills: 0,
         trips: 0,
         shopping: 0,
         othersExp: 0,
     },
     budget: 0,
     percentage: -1,

 };

 const sublist = {
     salary: [],
     auction: [],
     orders: [],
     othersInc: [],
     bills: [],
     trips: [],
     shopping: [],
     othersExp: [],
 };


 export const addItem = (date, type, des, val, cat) => {
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
         newItem = new Expense(ID, date, des, val, cat);
     } else if (type === 'inc') {
         newItem = new Income(ID, date, des, val, cat);

     }
     // Push it into our data structure
     data.allItems[type].push(newItem);
     // Return the new element

     sublist[cat].push(newItem.value)
         // calculateTotalSub(cat)
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

 export const getSublist = () => {
     return {
         salary: data.sublist.salary,
         auction: data.sublist.auction,
         orders: data.sublist.orders,
         othersInc: data.sublist.othersInc,
         bills: data.sublist.bills,
         trips: data.sublist.trips,
         shopping: data.sublist.shopping,
         othersExp: data.sublist.othersExp,
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
     const getCatAndVal = data.allItems[type].map(i => {
         return [i.category, i.value]
     })


     const index = ids.indexOf(id);


     const cat = getCatAndVal[index][0];
     const val = getCatAndVal[index][1];

     console.log(cat, val);


     deleteSubEl(cat, val);



     if (index !== -1) {
         data.allItems[type].splice(index, 1)

     }

 }
 export const deleteBudget = () => {
     data.allItems.inc.splice(0, data.allItems.inc.length)
     data.allItems.exp.splice(0, data.allItems.exp.length)

     for (let [key, value] of Object.entries(sublist)) {
         value.splice(0, value.length);
         calculateTotalSub(key)
     }



 }

 const deleteSubEl = (cat, val) => {

     const ind = sublist[cat].indexOf(val);
     sublist[cat].splice(ind, 1)
     calculateTotalSub(cat)


 }