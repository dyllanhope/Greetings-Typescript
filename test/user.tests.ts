import assert from 'assert';
import greet from '../greet';
import GreetInXhosa from '../classes/greetInXhosa';
import GreetInEnglish from '../classes/greetInEnglish';
import GreetInAfrikaans from '../classes/greetInAfrikaans';
import MapUserGreetCounter from '../classes/MapUserGreetCounter';
import Greeter from "../classes/Greeter";
import GreetIn from "../interfaces/greetIn";
import { Language } from "../classes/Greeter";


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
    it('Should return "Hello, Dyllan"', () => {
        const greetMap = new Map<Language, GreetIn>();

        greetMap.set(Language.afr, new GreetInAfrikaans());
        greetMap.set(Language.eng, new GreetInEnglish());

        const mapUserGreetCounter = new MapUserGreetCounter();
        const greeter = new Greeter(greetMap, mapUserGreetCounter);
        // console.log(greeter.greet('Dyllan', Language.eng));
        assert.equal("Hello, Dyllan", greeter.greet("Dyllan", Language.eng));
    })
})