class Car {
    constructor(make, model) {
        if (typeof make !== "string" || make.length === 0) {
            throw new Error("Make must be a non-empty string");
        }
        if (typeof model !== "string" || model.length === 0) {
            throw new Error("Model must be a non-empty string");
        }

        this.make = make;
        this.model = model;
        this.owners = [];
    }

    addOwner(name) {
        if (typeof name !== "string" || name.length === 0) {
            throw new Error("Owner name must be a non-empty string");
        }
        if (this.owners.indexOf(name) !== -1) {
            throw new Error("This owner already exists");
        }

        this.owners.push(name);
    }

    removeOwner(name) {
        if (typeof name !== "string") {
            throw new Error("Owner name must be a string");
        }
        if (this.owners.indexOf(name) === -1) {
            throw new Error("Owner not found");
        }

        this.owners.splice(this.owners.indexOf(name), 1);
    }

    get ownerCount() {
        return this.owners.length;
    }
}