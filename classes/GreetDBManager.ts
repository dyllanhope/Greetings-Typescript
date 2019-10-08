export default class GreetDBManager {
    private pool : any;

    constructor(pool: any){
        this.pool = pool;
    }
    async addLanguage(language: string, mapping: string){
        await this.pool.query('INSERT INTO greetings (languages, mappings)  VALUES ($1, $2)', [language, mapping]);
    }
    async greet(name: string, language: string) : Promise<string>{
        let message = '';
        await this.pool.query('INSERT INTO greeted (name, language) VALUES ($1, $2)', [name, language]);
        const results = await this.pool.query('SELECT mappings FROM greetings WHERE languages = $1', [language]);
        message = `${results.rows[0].mappings}, ${name}` ;
        return message;
    }
}