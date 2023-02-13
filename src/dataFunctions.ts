import type { AuthorResponse, WorksResponse, AuthorInfo} from "./types"

// generic request function
export async function requestData<TResponse>(url: string): Promise<TResponse> {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => data as TResponse);
}

// generic request function with async
export async function requestDataTest<TResponse>(url: string): Promise<TResponse> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    return response.json();
}

export async function getAuthors(author:string):Promise<AuthorInfo | undefined> {
    try {
        const response = await requestData<AuthorResponse>("https://openlibrary.org/search/authors.json?q=" + encodeURI(author)); 
        if (response.numFound === 0){
            console.error("No Author with the name", author);
            return undefined;
        }
        const auth = {
            name: response.docs[0].name,
            key: response.docs[0].key,
            works: response.docs[0].work_count
        }
        return auth; 
    } catch (err) {
        //404 not found
        console.error("Error fetching authors", err);
    }
}

export async function getWorks(authorKey:string):Promise<Array<String> | undefined> {
    let titles= Array<String>();
    try {
        const response = await requestData<WorksResponse>("https://openlibrary.org/authors/" + authorKey + "/works.json"); 
        response.entries.forEach((book: { title: String; }) => {
            titles.push(book.title)
        });
        return titles;
       } catch (err) {
        console.error("Error fetching Books", err);
       }
}