import GreetIn from "../interfaces/greetIn";
import UserGreetCounter from "../interfaces/userGreetCounter";

export enum Language {
    eng,
    afr,
    xho
}

export default class Greeter {
    private greetlanguages : Map<Language, GreetIn>
    private userGreetCounter : UserGreetCounter;

    constructor(greetLanguages: Map<Language, GreetIn>, userGreetCounter: UserGreetCounter){
        this.greetlanguages = greetLanguages;
        this.userGreetCounter = userGreetCounter;
    }

    greet(name: string, chosenLanguage:Language){
        let greetIn = this.greetlanguages.get(chosenLanguage);
        this.userGreetCounter.countGreet(name);
        if(greetIn){
            return greetIn.greet(name);
        }
        return "";
    }

    public get greetCounter() : number {
        return this.userGreetCounter.greetCounter;
    }

    userGreetCount(firstName: string): number {
        return this.userGreetCounter.userGreetCount(firstName);
    }
}