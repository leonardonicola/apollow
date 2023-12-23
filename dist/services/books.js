"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
class BooksService {
    findById(id) {
        if (!id) {
            throw new Error('ID Inválido!');
        }
        return {
            id: 'kaskd1923-jasdjas-193192',
            title: 'A Sútil Arte de Ligar o Foda-se',
            releaseDate: new Date(),
            authorId: 'kaskd1923-jasdjas-193192',
        };
    }
    findByAuthorId(id) {
        if (!id) {
            throw new Error('ID Inválido');
        }
        return [
            {
                id: 'kaskd1923-jasdjas-193192',
                title: 'A Sútil Arte de Ligar o Foda-se',
                releaseDate: new Date(),
            },
        ];
    }
}
exports.BooksService = BooksService;
