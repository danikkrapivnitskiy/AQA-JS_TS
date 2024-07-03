/*
Objective: Implement a simple inventory management system using objects and arrays.

Implement the following methods within the inventory object:

 - addItem(item) - Adds a new item to the inventory.
 - removeItem(id) - Removes an item from the inventory by its id.
 - getTotalValue() - Returns the total value of the inventory (sum of quantity * price for all items).
*/

const inventory = {
    items: [
        { id: 1, name: "Apple", quantity: 10, price: 1 },
        { id: 2, name: "Banana", quantity: 20, price: 0.5 },
        { id: 3, name: "Pineapple", quantity: 5, price: 1.5 },
    ],
    addItem: function ({ name, quantity, price }) {
        const newId = Math.max(...this.items.map((el) => el.id)) + 1;
        this.items.push(
            { id : newId, name, quantity, price }
        )
    },
    removeItem: function (id) {
        const indexItem = this.items.findIndex(obj => obj.id === id);
        this.items.splice(indexItem, 1);
    },
    getTotalValue: function () {
        return this.items.reduce((total, obj) => obj.price * obj.quantity, 0);
    },
};

// Adding a new item
inventory.addItem({ name: "Orange", quantity: 15, price: 0.75 });
console.log("Inventory after adding Orange:", inventory.items);

// Removing an item
inventory.removeItem(2);
console.log("Inventory after removing Banana:", inventory.items);

// Getting the total value
console.log("Total Inventory Value:", inventory.getTotalValue());
