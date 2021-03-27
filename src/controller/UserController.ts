import {getRepository} from "typeorm";
import {NextFunction, request, Request, Response} from "express";
import {User} from "../entity/User";
import Controller from "../Interfaces/Controller";
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


export class UserController implements Controller {

    private userRepository = getRepository(User);

    // Return all users
    // Probably not needed
    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find();
    }

    // Return the logged in user
    async one(request: Request, response: Response, next: NextFunction) {
        
        return this.userRepository.findOneOrFail({uuid: request.user})
        .then(res => ({...res, password:undefined}))
        .catch(error => Promise.reject({error, status:400}));
        
    }


    // Register a new account
    async register(request: Request, response: Response, next: NextFunction) {
        const saltRounds = 10;
        // Hash the password to store in the db
        const hash = await bcrypt.hash(request.body.password, saltRounds);


        return this.userRepository.save({...request.body, password:hash})
        .then(user => {
            // If user successfully saved return a jwt to log them in
            const token = jwt.sign({id: user.uuid}, process.env.JWT_SECRET, {
                expiresIn: 3600
            });
            
            return {Token: `Token ${token}`, expiresIn: 3600};
        })
        .catch(error => Promise.reject({error, status:400}));
    }

    // Delete an user
    async remove(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.findOneOrFail({uuid: request.params.uuid})
        .then(async res => await this.userRepository.remove(res))
        .catch(error => Promise.reject({error, status:400}));
    }
    
    async login(request: Request, response: Response, next: NextFunction) {
        const username = request.body.username;
        return this.userRepository.findOneOrFail({username}, {select: ["uuid", "password"]})
        .then(async user => {
            
            // Compare password with hash in db
            const match = await bcrypt.compare(request.body.password, user.password);
            
            // If passwords match login by sending a jwt
            if (match) {
                const token =  jwt.sign({id:user.uuid}, process.env.JWT_SECRET, {expiresIn: 3600});
                return {Token: `Token ${token}`, expiresIn: 3600};
            } else {
                throw "Invalid credentials";
            }
        })
        .catch(error => Promise.reject({error, status:400}));
    }

}