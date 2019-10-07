import GreetTable from "../interfaces/GreetTable";
import { Language } from "./Greeter";
import GreetIn from "../interfaces/greetIn";

export default class GreetInManager implements GreetTable{

    constructor(private greetLanguages: Map<Language, GreetIn>){
        this.greetLanguages = greetLanguages;
    }

    greet(name: string, language: Language) : string {
        let greetIn = this.greetLanguages.get(language);
        if(greetIn){
            return greetIn.greet(name);
        }
        return "";
    }

}