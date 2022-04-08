import { RequestHandler } from "express";


export const getPage:RequestHandler = (req, res) => {
    return res.status(200).json({
        ok : true
    })

}