type Author = {
    key: string,
    type: string,
    name: string,
    alternate_names?: Array<string>,
    birth_date?: string,
    top_work: string,
    work_count: number,
    top_subjects?: Array<string>
    _version_: number
}

export type AuthorResponse = {
    numFound: number,
    start: number,
    numFoundExact: boolean,
    docs: Array<Author>
}

type BookAuthors = {
    author: {key: string},
    type: {key: string},
}

type Books = {
    title: string,
    covers?: Array<number>,
    key: string,
    authors: Array<BookAuthors>
    type: {key: string},
    subject_places?: Array<string>,
    subjects?: Array<string>,
    latest_revision?: number,
    revision: number,
    created?: {
        type: string,
        value: string
    }
    last_modified: {
        type: string,
        value: string
    }
}

export type WorksResponse = {
    links: {
        self: string,
        author: string,
        next?: String,
    },
    size: number,
    entries: Array<Books>
}

export type AuthorInfo = {
    name: string,
    key: string,
    works: number
}