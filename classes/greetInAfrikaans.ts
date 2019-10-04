import GreetIn from "../interfaces/greetIn";

export default class GreetInAfrikaans implements GreetIn{
    greet(name: string){
        return `Môre, ${name}`;
    }
}