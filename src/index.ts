import { getAuthors, getWorks} from "./dataFunctions";
import { getInput } from "./inputFunctions";

async function main() {    
    let author;
    let aKey;

    // funktion mit dem fetch und return und dann höhrere ebene nur get Authors
    while(aKey === undefined)
    {
        author = await getInput('Author: ');
        aKey = await getAuthors(author);
    }
    
    let titles;
    if (aKey !== undefined)
    {
        titles = await getWorks(aKey.key);
        console.log(`first 50 (of ${aKey.works}) search results for: ${aKey.name}`);
        console.table(titles);
    }
}

main();
   
