import GreetIn from "../interfaces/greetIn";

export default class GreetInEnglish implements GreetIn{
    greet(name: string){
        return `Hello, ${name}`;
    }
}