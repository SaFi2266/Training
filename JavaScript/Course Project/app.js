/* jshint esversion: 6 */

// ---- BUDGET CONTROLLER MODEL
var budgetController = (function() {

    // Expenses Constructor
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Income Constructor
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Data Structure
    var data = {
        allItems: {
            expense: [], // [{id:0, description:'description1', value: 100}, {id:1, description:'description2', value:200}]
            income: []
        },
        totals: {
            expense: 0,
            income: 0
        },
        budget: 0,
        precentage: -1
    };

    var calculateSum = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(currentValue) {
            sum += currentValue.value;
        });
        data.totals[type] = sum;
    };

    return {
        addItem: function(type, des, val) {

            var newItem, ID, arr, len, lastItem;

            arr = data.allItems[type];
            len = arr.length;
            lastItem = len - 1; // last item index (position)

            // Create & check ID 
            ID = len > 0 ? arr[lastItem].id + 1 : 0; // arr[lastItem].id: ID + 1

            // Create new item based on expense or income
            if (type === 'expense') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'income') {
                newItem = new Income(ID, des, val);
            }

            // Store the new item
            data.allItems[type].push(newItem);

            // Return the new item
            return newItem;
        },

        deleteItem: function(type, ID) {
            var ids, index;

            ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(ID);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);

            }
        },

        calculateBudget: function() {
            calculateSum('expense');
            calculateSum('income');
            data.budget = data.totals.income - data.totals.expense;
            if (data.totals.income > 0) {
                data.precentage = Math.round((data.totals.expense / data.totals.income) * 100);
            } else {
                data.precentage = -1;
            }
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalIncome: data.totals.income,
                totlExpense: data.totals.expense,
                precentage: data.precentage
            };
        }
    };
})();


// ---- UI CONTROLLER MODEL
var UIController = (function() {

    // Define DOM classes object to centralize manage classes
    var DOMClasses = {
        addType: '.add__type',
        addDescription: '.add__description',
        addValue: '.add__value',
        addBtn: '.add__btn',
        incomeList: '.income__list',
        expenseList: '.expenses__list',
        bgtLabel: '.budget__value',
        incLabel: '.budget__income--value',
        expLabel: '.budget__expenses--value',
        precenLabel: '.budget__expenses--percentage',
        container: '.container'
    };

    // Publication the Object by returned it
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMClasses.addType).value,
                description: document.querySelector(DOMClasses.addDescription).value,
                value: parseFloat(document.querySelector(DOMClasses.addValue).value)
            };
        },

        addListItems: function(obj, type) {

            var HTML, uHTML, el;

            if (type === 'income') {
                el = DOMClasses.incomeList;
                HTML = `<div class="item clearfix" id="income-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn">
                                      <ion-icon name="close-circle-outline"></ion-icon>
                                    </button>
                                </div>
                            </div>
                        </div>`;
            } else if (type === 'expense') {
                el = DOMClasses.expenseList;
                HTML = `<div class="item clearfix" id="expense-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn">
                                      <ion-icon name="close-circle-outline"></ion-icon>
                                    </button>
                                </div>
                            </div>
                        </div>`;
            }
            uHTML = HTML.replace(/%id%/g, obj.id);
            uHTML = uHTML.replace('%description%', obj.description);
            uHTML = uHTML.replace('%value%', obj.value);

            document.querySelector(el).insertAdjacentHTML('beforeend', uHTML);
        },

        deleteListItems: function(fullId) {
            var el = document.getElementById(fullId);
            el.parentNode.removeChild(el);
        },

        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMClasses.addDescription + ', ' + DOMClasses.addValue);
            fieldsArr = Array.prototype.slice.call(fields);
            //console.log(fieldsArr);
            fieldsArr.forEach(function(current, index, arr) {
                current.value = '';
            });
            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {
            document.querySelector(DOMClasses.bgtLabel).textContent = obj.budget;
            document.querySelector(DOMClasses.incLabel).textContent = obj.totalIncome;
            document.querySelector(DOMClasses.expLabel).textContent = obj.totlExpense;
            if (obj.precentage > 0) {
                document.querySelector(DOMClasses.precenLabel).textContent = obj.precentage + '%';
            } else {
                document.querySelector(DOMClasses.precenLabel).textContent = '---';
            }
        },

        getDOMStr: function() {
            return DOMClasses;
        }
    };

})();

// --- CONTROLLER MODEL
// Controller Model that connect two other controller by passing 
// their names in Immediately Invoked Function Expression (IIFE) as arguments
var controller = (function(budgetCtrl, UICtrl) {

    var actionListener = function() {

        // Call DOM classes object
        var DOM = UICtrl.getDOMStr();

        // Actions Listener
        document.querySelector(DOM.addBtn).addEventListener('click', ctrlActions);
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlActions();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteAction);
    };

    var updateBudget = function() {

        budgetCtrl.calculateBudget();

        var budget = budgetCtrl.getBudget();
        //console.log(budget);

        UICtrl.displayBudget(budget);
    };

    var ctrlActions = function() {

        // Declaration of variables
        var input;
        var newItem;

        // 1. Get data from input field
        input = UICtrl.getInput();
        // console.log(input);

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

            // 2. Add data item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add data item to UI controller
            UICtrl.addListItems(newItem, input.type);

            // 4. Clearing the fields
            UICtrl.clearFields();

            // 5. Calculate the budget & display the budget on the UI
            updateBudget();

        } else {
            alert('Please Enter a valid Description or \nvalue greater than 0.');
        }
    };

    var updatPrecentages = function() {

        // 1. Calculate precentages


        // 2. Retreive precentages from budget control


        // 3. Update the UI with new precentages

    };

    var ctrlDeleteAction = function(event) {
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if (itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. delete item from data structure
            budgetCtrl.deleteItem(type, ID);

            // 2. delete item form UI
            UICtrl.deleteListItems(itemID);

            // 3. update the budget
            updateBudget();
        }
    };

    return {
        init: function() {
            console.log('Application Started ...');
            UICtrl.displayBudget({
                budget: 0,
                totalIncome: 0,
                totlExpense: 0,
                precentage: -1
            });
            actionListener();
        }
    };

})(budgetController, UIController);

controller.init();