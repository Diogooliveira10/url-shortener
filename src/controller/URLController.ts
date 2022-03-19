import { Request, Response } from "express";
import shortId from 'shortid';
import { config } from '../config/Constants';
import { URLModel } from '../database/model/URL';

export class URLController {
    public async shorten(req: Request, res: Response): Promise<void> {
        // Verificar se a URL já existe
        const { originURL } = req.body
        const url = await URLModel.findOne({ originURL })
        if (url) {
			res.json(url)
			return
		}
        // Criar o hash pra URL
        const hash = shortId.generate()
        const shortURL = `${config.API_URL}/${hash}`
        // Salvar a URL no banco
        const newURL = await URLModel.create({ hash, shortURL, originURL })
        // Retornar a URL que foi salva
        res.json(newURL)
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        // Pegando hash da URL
        const { hash } = req.params
        const url = await URLModel.findOne({ hash })
        // Encontrar a URL original pelo hash
        if (url) {
			res.redirect(url.originURL)
			return
		}
        // Redirecionar para URL original a partir do que encontrar no DB
        res.status(400).json({ error: 'URL not found' })
    }
}