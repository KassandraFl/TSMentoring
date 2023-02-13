"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorks = exports.getAuthors = exports.requestDataTest = exports.requestData = void 0;
// generic request function
function requestData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(url)
            .then((response) => response.json())
            .then((data) => data);
    });
}
exports.requestData = requestData;
// generic request function with async
function requestDataTest(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    });
}
exports.requestDataTest = requestDataTest;
function getAuthors(author) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield requestData("https://openlibrary.org/search/authors.json?q=" + encodeURI(author));
            if (response.numFound === 0) {
                console.error("No Author with the name", author);
                return undefined;
            }
            const auth = {
                name: response.docs[0].name,
                key: response.docs[0].key,
                works: response.docs[0].work_count
            };
            return auth;
        }
        catch (err) {
            //404 not found
            console.error("Error fetching authors", err);
        }
    });
}
exports.getAuthors = getAuthors;
function getWorks(authorKey) {
    return __awaiter(this, void 0, void 0, function* () {
        let titles = Array();
        try {
            const response = yield requestData("https://openlibrary.org/authors/" + authorKey + "/works.json");
            response.entries.forEach((book) => {
                titles.push(book.title);
            });
            return titles;
        }
        catch (err) {
            console.error("Error fetching Books", err);
        }
    });
}
exports.getWorks = getWorks;
//# sourceMappingURL=dataFunctions.js.map