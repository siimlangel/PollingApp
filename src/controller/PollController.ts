import { getRepository } from "typeorm";
import { Poll } from "../entity/Poll";
import {Request, Response, NextFunction} from "express";
import Controller from "../Interfaces/Controller";
import { Answer } from "../entity/Answer";
import { User } from "../entity/User";


export class PollController implements Controller {
    private PollRepository = getRepository(Poll);
    private AnswerRepository = getRepository(Answer);
    private UserRepository = getRepository(User);

    private relations = {relations: ["answers"]};

    // Get all polls belonging to a user
    async userPolls(request: Request, response: Response, next: NextFunction ) {
        try {
            const uuid = request.user;
            return this.UserRepository.createQueryBuilder("user")
            .leftJoinAndSelect("user.polls", "poll")
            .leftJoinAndSelect("poll.answers", "answer")
            .where("user.uuid= :uuid", {uuid})
            .getMany();
        } catch (error) {
            return Promise.reject({error, status:400});
        }
        
    }

    // Get poll by uuid
    async one(request: Request, response: Response, next: NextFunction ) {
        try {
            const uuid = request.params.uuid;
            return this.PollRepository.createQueryBuilder("poll")
            .leftJoinAndSelect("poll.answers", "answer")
            .where("poll.uuid= :uuid", {uuid})
            .getOne();

        } catch (error) {
            return Promise.reject({error, status:400});    
        }

    }

    // Save an users poll
    async save(request: Request, response: Response, next: NextFunction ) {

        const pollToSave = request.body.poll;
        const uuid = request.user;

        try {
            const answers = await this.AnswerRepository.save(pollToSave.answers);
            if (answers) pollToSave.answers = answers;
            const poll = await this.PollRepository.save(pollToSave);
            if (poll) {
                const user = await this.UserRepository.findOne({uuid}, {relations: ["polls"]});
                if (user) {
                    user.polls.push(poll);
                    return this.UserRepository.save(user)
                    .then(() => poll)
                    .catch(error => Promise.reject({error, status:400}));
                }
            }

            
        } catch (error) {
            return Promise.reject({error, status:400})
        }
    
    }

    // Returns polls according to a pagination request
    async paginate(request: Request, response: Response, next: NextFunction) {
        try {
            const limit = parseInt(request.params.limit); /* How many polls to get */
            const offset = parseInt(request.params.offset); /* which polls to skip (where to start from) */

            // Get total number of polls available to poll browser
            const totalCount = await this.PollRepository.createQueryBuilder("poll")
            .getCount();

            const polls = await this.PollRepository.createQueryBuilder("poll")
            .leftJoinAndSelect("poll.answers", "answer")
            .skip(offset)
            .take(limit)
            .getMany();

            return {polls, totalCount}
        } catch (error) {
            return Promise.reject({error, status:400});
        }
    }

    // Delete a poll
    async remove(request: Request, response: Response, next: NextFunction ) {
        return await this.PollRepository.findOneOrFail({uuid: request.params.uuid})
        .then(async res => await this.PollRepository.remove(res))
        .catch(error => Promise.reject({error, status:400}));
    }

    // Submitting of a poll
    // Saves updated answers
    async update(request: Request, response: Response, next: NextFunction) {
        const answers = request.body.poll.answers;
        
        return await this.PollRepository.findOneOrFail(request.params.uuid, {relations: ["answers"]})
        .then(async res => {
            await this.AnswerRepository.save(answers);
            return await this.PollRepository.save(request.body.poll);
        })
        .catch(error => Promise.reject({error, status:400}));
    }

}