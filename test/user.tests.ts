import assert from 'assert';
import greet from '../greet';
import GreetInXhosa from '../classes/greetInXhosa';
import GreetInEnglish from '../classes/greetInEnglish';
import GreetInAfrikaans from '../classes/greetInAfrikaans';
import MapUserGreetCounter from '../classes/MapUserGreetCounter';
import Greeter from "../classes/Greeter";
import GreetIn from "../interfaces/greetIn";
import { Language } from "../classes/Greeter";
import GreetInManager from "../classes/GreetInManager";
import pg from "pg";
import GreetDBManager from '../classes/GreetDBManager';

const Pool = pg.Pool;

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/ts_greeting';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

describe('Unit tests for greetings', () => {
    beforeEach(async () => {
        // clean the tables before each test run
        await pool.query('delete from greeted;');
        await pool.query('delete from greetings;');
    });
    describe('User Tests', () => {
        it('Should return "Hello, Bob Crow we cant contact you."', () => {
            assert.equal("Hello, Bob Crow we can't contact you.", greet({
                firstName: 'Bob',
                lastName: 'Crow'
            }));
        })
        it('Should return "Hello, Bob Crow we will be in touch at: bobcrow@gmail.com"', () => {
            assert.equal("Hello, Bob Crow we will be in touch at: bobcrow@gmail.com", greet({
                firstName: 'Bob',
                lastName: 'Crow',
                email: 'bobcrow@gmail.com'
            }));
        })
    })
    describe('Testing greeting message', () => {
        it('Should return "Molo, Dyllan"', () => {
            const greetInXhosa = new GreetInXhosa;
            assert.equal(greetInXhosa.greet('Dyllan'), 'Molo, Dyllan');
        });
        it('Should return "Môre, Dyllan"', () => {
            const greetInAfrikaans = new GreetInAfrikaans;
            assert.equal(greetInAfrikaans.greet('Dyllan'), 'Môre, Dyllan');
        });
        it('Should return "Hello, Dyllan"', () => {
            const greetInEnglish = new GreetInEnglish;
            assert.equal(greetInEnglish.greet('Dyllan'), 'Hello, Dyllan');
        });
    })
    describe('Testing MapUserGreetCounter class', () => {
        it('Should return a count of 3', () => {
            const mapUserGreetCounter = new MapUserGreetCounter;
            mapUserGreetCounter.countGreet('Dyllan');
            mapUserGreetCounter.countGreet('John');
            mapUserGreetCounter.countGreet('Mike');
            mapUserGreetCounter.countGreet('Dyllan');

            assert.equal(mapUserGreetCounter.greetCounter, 3);
        });
        it('Should return a count of 2 for "Dyllan"', () => {
            const mapUserGreetCounter = new MapUserGreetCounter;
            mapUserGreetCounter.countGreet('Dyllan');
            mapUserGreetCounter.countGreet('John');
            mapUserGreetCounter.countGreet('Mike');
            mapUserGreetCounter.countGreet('Dyllan');

            assert.equal(mapUserGreetCounter.userGreetCount('Dyllan'), 2);
        });
    })
    describe('Testing Greeter class', () => {
        it('Should return "Hello, Dyllan" and save Dyllan into the the database', async () => {
            const greetMap = new Map<Language, GreetIn>();

            greetMap.set(Language.AFRIKAANS, new GreetInAfrikaans());
            greetMap.set(Language.ENGLISH, new GreetInEnglish());
            greetMap.set(Language.ISIXHOSA, new GreetInXhosa());

            const greetInManager = new GreetInManager(greetMap)
            const mapUserGreetCounter = new MapUserGreetCounter();

            const greeter = new Greeter(greetInManager, mapUserGreetCounter, pool);
            assert.equal("Hello, Dyllan", await greeter.greet("Dyllan", Language.ENGLISH));

            const results = await pool.query('SELECT name, language FROM greeted;');
            assert.deepEqual(results.rows[0], { name: 'Dyllan', language: 'ENGLISH' });
        })
        it('Should return "Goeie dag Dyllan" using database', async () => {
            const greetDB = new GreetDBManager(pool);
            await greetDB.addLanguage('English', 'Hello');
            await greetDB.addLanguage('Afrikaans', 'Goeie dag');
            await greetDB.addLanguage('isiXhosa', 'Molo');
            await greetDB.addLanguage('English', 'Goodbye');
            await greetDB.addLanguage('Afrikaans', 'Hello');

            assert.equal(await greetDB.greet('Dyllan', 'Afrikaans'), "Goeie dag, Dyllan");
        })
    })
});