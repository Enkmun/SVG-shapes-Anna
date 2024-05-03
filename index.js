const filesystem = require('fs');
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("./lib/shapes");

class Svg {
    constructor() {
        this.textElement = '';
        this.shapeElement = '';
    }
    render() {
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
    }
    setTextElement(text, color) {
        this.textElement = `<text x="50" y="25" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
    }
    setShapeElement(shape) {
        this.shapeElement = shape.render();
    }
}

const questions = [
    {
        type: "input",
        name: "text",
        message: "Enter up to 3 characters for your logo:",
    },
    {
        type: "input",
        name: "textColor",
        message: "Choose a color for your text (e.g., red, #ff0000):",
    },
    {
        type: "input",
        name: "shapeColor",
        message: "Choose a color for your shape (e.g., blue, #0000ff):",
    },
    {
        type: "list",
        name: "shape",
        message: "Choose the shape of your logo:",
        choices: ["Circle", "Square", "Triangle"],
    },
];

function writeToFile(fileName, data) {
    filesystem.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("Your logo has been created!");
    });
}

async function init() {
    console.log("Let's create a logo!");

    const answers = await inquirer.prompt(questions);

    const userText = answers.text.substring(0, 3);
    const textColor = answers.textColor;
    const shapeColor = answers.shapeColor;
    const selectedShape = answers.shape;

    let userShape;

    switch (selectedShape.toLowerCase()) {
        case "circle":
            userShape = new Circle();
            break;
        case "square":
            userShape = new Square();
            break;
        case "triangle":
            userShape = new Triangle();
            break;
        default:
            console.log("Invalid shape!");
            return;
    }

    userShape.setColor(shapeColor);

    const svg = new Svg();
    svg.setTextElement(userText, textColor);
    svg.setShapeElement(userShape);

    const svgString = svg.render();
    console.log("Your logo SVG:");
    console.log(svgString);

    const fileName = "logo.svg";
    writeToFile(fileName, svgString);
}

init();
