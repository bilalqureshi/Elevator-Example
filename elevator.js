
const DIRECTION_DOWN = -1;
const DIRECTION_NONE = 0;
const DIRECTION_UP = 1;

function HardwareElevator() {}
HardwareElevator.prototype = {
    moveUp: function () {},
    moveDown: function () {},
    stopAndOpenDoors: function () {},
    getCurrentFloor: function () {},
    getCurrentDirection: function () {},
    requestedFloorAndDirection: []
};

function Elevator() {
    this.hw = new HardwareElevator();
    this.hw.addEventListener("doorsClosed", _bind(this.onDoorsClosed, this));
    this.hw.addEventListener("beforeFloor", _bind(this.onBeforeFloor, this));
}

Elevator.prototype = {
    onDoorsClosed: function (floor) {
        // your code here
        setTimeout('', 3000);
        let nextRequestedfloor = this.hw.requestedFloorAndDirection[0] === undefined ? false : true;
        let currentDirection = this.hw.getCurrentDirection();
        if (nextRequestedfloor) {
            let requestionFloor = this.hw.requestedFloorAndDirection.find(item => item.direction === currentDirection);
            if (requestionFloor) {
                requestionFloor.direction === 1 ? this.hw.moveUp() : this.hw.moveDown();
            } else {
                nextRequestedfloor.direction === 1 ? this.hw.moveUp() : this.hw.moveDown();
            }
        }
    },

    onBeforeFloor: function (floor, direction) {
        let requestionFloor = this.hw.requestedFloorAndDirection.find(item => item.floor === floor);
        if (requestionFloor) {
            if (this.hw.getCurrentDirection() === requestionFloor.direction) {
                this.hw.requestedFloor.splice(requestionFloor, 1);
                this.hw.stopAndOpenDoors();
            }
        }
    },

    floorButtonPressed: function (floor, direction) {
        // storing the request
        this.hw.requestedFloorAndDirection.push({floor: floor, direction: direction});
        // Only move the elevator fwhen its idle
        if (this.hw.getCurrentDirection() === 0) {
            floor > this.hw.getCurrentFloor() ? this.hw.moveUp(): this.hw.moveDown();
        }
    },

    cabinButtonPressed: function (floor) {
        // getting the direction, where passenger wants to go
        let direction = floor > this.hw.getCurrentDirection() ? 1 : -1;
        // storing the request
        this.hw.requestedFloorAndDirection.push({floor: floor, direction: direction});
        if (this.hw.getCurrentFloor() !== floor) {
            if (floor > this.hw.getCurrentFloor()) {
                this.hw.moveUp();
            } else {
                this.hw.moveDown();
            }
        } else {
            //same floor pressed
            this.hw.requestedFloor.splice(-1, 1); // or we can use pop() method
            this.hw.stopAndOpenDoors();
        }
    }
};
