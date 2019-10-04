import UserGreetCounter from "../interfaces/userGreetCounter";

export default class MapUserGreetCounter implements  UserGreetCounter{
    private userMap = new Map <string, number>();

    countGreet(firstName: string){
        if(this.userMap.get(firstName) === undefined){
            this.userMap.set(firstName, 1);
        } else {
            let count = this.userMap.get(firstName) || 0;
            this.userMap.set(firstName, count + 1);
        }
    };
    public get greetCounter() : number {
        let count = 0;
        for (const user of this.userMap){
            count++;
        }
        return count;
    }
    userGreetCount(firstName: string){
        return this.userMap.get(firstName) || 0;
    }
}