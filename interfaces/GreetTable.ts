import { Language } from "../classes/Greeter";

export default interface GreetTable{
    greet(firstName: string, language: Language) : string
}