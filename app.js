// BUDGET CONTROLLER
var budgetController = (function () {
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    return {
        addItems: function (type, desc, val) {
            var newItem, ID;

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new Item
            if (type === 'exp') {
                newItem = new Expense(ID, desc, val);
            }
            if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            }

            // Push it into Data Structure
            data.allItems[type].push(newItem);

            // Return new Items
            return newItem;
        }
    }
})();

// UI CONTROLLER
var UIController = (function () {
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list'
    }
    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },
        addListItem: function (obj, type) {
            // Create HTML string with placeholder text
            var html, newHtml, element;
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = `<div class="item clearfix" id="income-%id%"> <div class = "item__description">%description% </div> <div class = "right clearfix" >
                <div class = "item__value" > %value% </div> 
                <div class = "item__delete" >
                <button class = "item__delete--btn" > <i class = "ion-ios-close-outline" > </i></button>
                </div> </div> </div>`;
            } else {
                element = DOMStrings.expensesContainer;
                html = `<div class="item clearfix" id="expense-%id%">
                <div class="item__description">%description%</div>
                <div class="right clearfix">
                <div class="item__value">%value%</div>
                <div class="item__percentage">21%</div>
                <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
                </div>
                </div>`;
            }

            // Replace the placeholder text with actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            // Insert the HTML into the DOM
            console.log(element);
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function () {
            var fields, fieldsArray;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);

            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach(function (current, index, array) {
                current.value = "";
            });
            fieldsArray[0].focus();
        },
        getDOMString: function () {
            return DOMStrings;
        }
    }
})();


// GLOBAL APP CONTROLLER
var controller = (function (budgetCtrl, UICtrl) {
    var setupEventListners = function () {
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem)
        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        })
    }
    var DOM = UICtrl.getDOMString();

    var updateBudget = function () {
        // 1. Calculate the budget

        // 2. Return the budget

        // 3. Display the budget on the UI
    }

    var ctrlAddItem = function () {

        // 1. Get the field input data
        var input = UICtrl.getInput();
        console.log(input);

        // 2. Add the item to the budget controller
        var newItem = budgetController.addItems(input.type, input.description, input.value);
        console.log(newItem);
        // 3. Add the item to the UI
        UICtrl.addListItem(newItem, input.type);
        // 4. Clear the fields
        UICtrl.clearFields();
        // 5. Calculate the budget

        // 6. Display the budget on the UI

    }

    return {
        init: function () {
            console.log('Application has started');
            setupEventListners();
        }
    }
})(budgetController, UIController);

controller.init();