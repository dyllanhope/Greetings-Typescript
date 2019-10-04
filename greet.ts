import Person from "./interfaces/person";

export default function greet(person: Person) {
    if(person.email){
    return `Hello, ${person.firstName} ${person.lastName} we will be in touch at: ${person.email}`;
    } else {
        return `Hello, ${person.firstName} ${person.lastName} we can't contact you.`;
    }
}