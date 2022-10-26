import {Request,Response} from 'express';

class indexController2 {
    public index(req:Request,res:Response){
        res.send('Inicio')
    }
}

export const IndexController = new indexController2();