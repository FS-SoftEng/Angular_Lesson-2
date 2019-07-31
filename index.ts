// // Class Declaration 

// class Rectangle {
//     height: number;
//     width: number;
//     constructor(height: number, width: number) {
//         this.height = height;
//         this.width = width;
//     }

//     perimeter() {
//         return this.height * 2 + this.width * 2;
//     }
// }


// interface Person {
//     name: string;
// }

// interface Flyable {
//     flyHeight: number;
// }

// interface Powers extends Person, Flyable {
//     powers: string[];
// }

// class SuperHero implements Powers {
//     name: string;
//     flyHeight: number;
//     powers: string[];

//     constructor(firstName: string, flyingheight: number, powersList: string[]){
//         this.name = firstName;
//         this.flyHeight = flyingheight;
//         this.powers = powersList;
//     }
// }

// const frozone = new SuperHero('Frozone', 10000, ['Freeze water from any moisture', 'Ice Skate on his frozen water'])

// console.log(frozone)


// interface Shape {
//     sides: number;
// }

// interface Triangle extends Shape {
//     angles: number[];
// }

// class Equilateral implements Triangle {
//     sides: number;
//     angles: number[];

//     constructor(numberOfSides: number, anglesNumbers: number[]){
//         this.sides = numberOfSides;
//         this.angles = anglesNumbers;
//     }
// }

// const triangle = new Equilateral(3, [60, 60, 60])
// console.log(triangle)


// interface Shape {
//     sides: number;
// }

// interface Triangle extends Shape {
//     angles: number[];
// }

// let equilateral = <Triangle>{};
// equilateral.sides = 3;
// equilateral.angles = [60, 60, 60];

// console.log(equilateral);



// class Rectangle {
//     height: number;
//     width: number;
//     constructor(height: number, width: number) {
//         this.height = height;
//         this.width = width;
//     }

//     perimeter() {
//         return this.height * 2 + this.width * 2;
//     }
// }

// class Square extends Rectangle {
//     area() {
//         return this.height * this.width;
//     }
// }

// const newSquare = new Square(3, 5);
// const area = newSquare.area();
// const perimeter = newSquare.perimeter();

// console.log("Area: " + area + " Perimeter: " + perimeter);



// function identifyType<T>(argument: T): string {
//     let argType: string = '';

//     switch (typeof argument) {
//         case 'number':
//             argType = 'number';
//             break;
//         case 'string':
//             argType = 'string';
//             break;
//         default:
//             argType = 'neither a number nor a string';
//     }

//     return 'You passed in a ' + argType + ', whose value is ' + "Hello, World!";
// }

// console.log(identifyType(42));



// function methodDecorator(target: Object, propertyKey: string, descriptor: PropertyDescriptor): any {
//     // store the original class method in `oldValue`
//     let oldValue = descriptor.value;

//     // re-define the class method
//     descriptor.value = function() {
//         // when the class method is called, log the fact to the console
//         console.log(`Calling ${propertyKey} with `, target);

//         // call the original class method passing in the caller's two arguments
//         // -- this point is where the console logging in the class
//         // method will occur
//         let value = oldValue.apply(null, [arguments[1], arguments[0]]);

//         // log that the function was executed and return the result with some added text
//         console.log(`Function is executed`);
//         return value + '; Decorators are crazy!';
//     };

//     return descriptor;
// }

// class MyClass {
//     //add the below decorator expression
//     @methodDecorator
//     exampleFunction(arg1: string, arg2: string) {
//         // log the arguments and return their concatenation
//         console.log(`Arguments Received: ${arg1} and ${arg2}`);
//         return `${arg1} ${arg2}`;
//     }
// }
// const run = new MyClass();
// console.log(run.exampleFunction('Hello', 'World'));


// 1. Class decorator
function InspectClass(target: any) {
    console.log(`Class in use: ${target.name}`);
}

// 2a. Property decorator
function InspectProperty(target: any, propertyKey: string): void {
    let val = target[propertyKey];

    // 2b. this runs when a property is read
    let getter = function() {
        console.log(`Get: ${propertyKey} => ${val}`);
        return val;
    };

    // this runs when a property's value is set
    let setter = function(newValue: any) {
        console.log(`Set: ${propertyKey} => ${newValue}`);
        val = newValue;
    };

    // 2c. below, the `delete` removes the property from the class
    // then with your Object.defineProperty() function, you are
    // re-adding the property with a new getter and setter.
    if (delete target[propertyKey]) {
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    }
}

// 3a. `Automobile` class uses `InspectClass` class decorator
@InspectClass
class Automobile {
    // 3b. the `make` property uses the `InspectProperty` property decorator
    @InspectProperty
    public make: string;
    // the other two properties are not using a decorator
    public model: string;
    public year: number;

    constructor(make: string, model: string, year: number) {
        // 3c. when an instance of `Automobile` is created, its properties
        // will get set, so the decorator for the `make` property
        // will result in information getting logged to the console
        this.make = make;
        // the next two properties do not have decorators
        this.model = model;
        this.year = year;
    }

    // 3d. this method accesses the properties, of which `make` is decorated
    // so when `getInfo()` is called, it will result in information
    // getting logged to the console about `make`
    getInfo(): string {
        return `Make: ${this.make}  Model: ${this.model}  Year: ${this.year}`
    }
}

let mazda = new Automobile("Mazda", "RX-8", 2003);
console.log(mazda.getInfo());


