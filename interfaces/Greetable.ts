import { Language } from "../classes/Greeter";

export default interface Greetable{
    greet(firstName: string, language: Language) : string
}