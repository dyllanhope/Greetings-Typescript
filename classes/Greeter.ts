// import GreetIn from "../interfaces/greetIn";
import UserGreetCounter from "../interfaces/userGreetCounter";
import Greetable from "../interfaces/Greetable";

export enum Language {
    ENGLISH,
    AFRIKAANS,
    ISIXHOSA
}

export default class Greeter {
    private pool: any;
    private greetable: Greetable;
    private userGreetCounter: UserGreetCounter;

    constructor(greetable: Greetable, userGreetCounter: UserGreetCounter, pool: any) {
        this.greetable = greetable;
        this.userGreetCounter = userGreetCounter;
        this.pool = pool;
    }

    async greet(name: string, chosenLanguage: Language) {
        const message = this.greetable.greet(name, chosenLanguage);
        this.userGreetCounter.countGreet(name);
        await this.pool.query('INSERT INTO greeted (name, language) VALUES ($1, $2)', [name, Language[chosenLanguage]]);
        return message;
    }

    async greetCounter(): Promise<number> {
        const results = await this.pool.query('SELECT COUNT(DISTINCT name) FROM greeted');
        return results.rows[0].count;
    }

    async userGreetCount(firstName: string): Promise<number> {
        const results = await this.pool.query('SELECT COUNT (*) FROM greeted WHERE name = $1', [firstName]);
        return results.rows[0].count;
    }
}