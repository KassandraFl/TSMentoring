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
const dataFunctions_1 = require("./dataFunctions");
const inputFunctions_1 = require("./inputFunctions");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        let author = yield (0, inputFunctions_1.getInput)('Author: ');
        let aKey;
        // funktion mit dem fetch und return und dann höhrere ebene nur get Authors
        while (aKey === undefined) {
            aKey = yield (0, dataFunctions_1.getAuthors)(author);
        }
        let titles;
        if (aKey !== undefined) {
            titles = yield (0, dataFunctions_1.getWorks)(aKey.key);
            console.log(`first 50 (of ${aKey.works}) search results for: ${aKey.name}`);
            console.table(titles);
        }
    });
}
main();
//# sourceMappingURL=index.js.map