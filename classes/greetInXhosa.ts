import GreetIn from "../interfaces/greetIn";

export default class GreetInXhosa implements GreetIn {
    greet(name: string){
        return `Molo, ${name}`;
    }
}