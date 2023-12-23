"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorServices = void 0;
class AuthorServices {
    findById(id) {
        if (!id) {
            throw new Error('ID Inválido!');
        }
        return {
            id: 'kaskd1923-jasdjas-193192',
            firstName: 'Leonardo',
            lastName: 'Nicola',
        };
    }
}
exports.AuthorServices = AuthorServices;
