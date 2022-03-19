import { Request, Response } from "express";
import shortId from 'shortid';
import { config } from "../config/Constants";

export class URLController {
    public async shorten(req: Request, res: Response): Promise<void> {
        // Verificar se a URL já existe
        // Criar o hash pra URL
        const { originURL } = req.body
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        // Salvar a URL no banco
        // Retornar a URL que foi salva
        res.json({ originURL, hash, shortURL })
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        // Pegando hash da URL
        const { hash } = req.params
        // Encontrar a URL original pelo hash
        const url = {
            originURL: 'https://cloud.mongodb.com/v2/61926d64400fef1f802776e3#clusters',
            hash: 'Q18BCxzSw',
            shortURL: 'http://localhost:5000/Q18BCxzSw',
        }
        // Redirecionar para URL original a partir do que encontrar no DB
        res.redirect(url.originURL)
    }
}