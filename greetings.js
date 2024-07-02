
function createGreeting(name){
    const greeting = "Hi! It's great to meet you, ";

    return greeting + name;
}

const firstName = "Amrit";

const message = createGreeting(firstName);
console.log(message);