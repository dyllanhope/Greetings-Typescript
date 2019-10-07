// import GreetIn from "../interfaces/greetIn";
import UserGreetCounter from "../interfaces/userGreetCounter";
import GreetTable from "../interfaces/GreetTable";

export enum Language {
    eng,
    afr,
    xho
}

export default class Greeter {
    private greetTable : GreetTable;
    private userGreetCounter : UserGreetCounter;

    constructor(greetTable: GreetTable, userGreetCounter: UserGreetCounter){
        this.greetTable = greetTable;
        this.userGreetCounter = userGreetCounter;
    }

    greet(name: string, chosenLanguage:Language){
        let message = this.greetTable.greet(name, chosenLanguage);
        this.userGreetCounter.countGreet(name);
        return message; 
    }

    public get greetCounter() : number {
        return this.userGreetCounter.greetCounter;
    }

    userGreetCount(firstName: string): number {
        return this.userGreetCounter.userGreetCount(firstName);
    }
}