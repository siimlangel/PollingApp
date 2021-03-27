import { createConnection } from "typeorm";
import { Answer } from "./entity/Answer";
import { Poll } from "./entity/Poll";
import { User } from "./entity/User";


// Insert dummy data to db
createConnection().then(async connection => {
    let user = await connection.manager.save(connection.manager.create(User, {
        username: "Timber",
        password: "Saw",
    }));

    let answers = []
    for (let i: number = 0; i <= 3; i++) {
        let answer = await connection.manager.create(Answer, {
            text: `Answer ${i}`
        });
        await connection.manager.save(answer);
        answers.push(answer);
    }

    const poll1 = await connection.manager.save(connection.manager.create(Poll, {
        title: "Test poll",
        description: "Something",
        answers,
    }));

    user.polls = [poll1];

    user = await connection.manager.save(user);
    

    answers = []

    for (let i: number = 0; i <= 3; i++) {
        let answer = await connection.manager.create(Answer, {
            text: `Answer ${i}`
        });
        await connection.manager.save(answer);
        answers.push(answer);
    }

    let poll = await connection.manager.save(connection.manager.create(Poll, {
        title: "Test poll2",
        description: "Something",
        answers,
    }));

    user.polls.push(poll);

    user = await connection.manager.save(user);

    for (let i = 0; i < 10; i++) {

        answers = []

        for (let i: number = 0; i <= 3; i++) {
            let answer = await connection.manager.create(Answer, {
                text: `Answer ${i}`
            });
            await connection.manager.save(answer);
            answers.push(answer);
        }

        poll = await connection.manager.save(connection.manager.create(Poll, {
            title: `Test poll${i + 10}`,
            description: "Something",
            answers,
        }));

        user.polls.push(poll);
        
        user = await connection.manager.save(user);

    }
    
    



})

  