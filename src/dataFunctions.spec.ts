import { describe, expect, it } from "@jest/globals";
import { getAuthors, getWorks } from "./dataFunctions";

describe("getGreeting", () => {
  global.fetch = jest.fn() as jest.Mock;

  // jest.mock('global.fetch', () => {
  //   return jest.fn();
  // });

  beforeEach(() => {
    jest.mocked(fetch).mockClear();
  });

  it('getAuthors should fetch a Author', async () => {
    // provide a mock implementation for the mocked fetch:
    jest.mocked(fetch).mockImplementation((): Promise<any> => {
      return Promise.resolve({
        json() {
          return Promise.resolve({
            "numFound": 1,
            "start": 0,
            "numFoundExact": true,
            "docs": [
                {
                    "key": "OL489830K",
                    "type": "author",
                    "name": "Kassandra Fleischer",
                    "birth_date": "31 July 1965",
                    "top_work": "Harry Potter and the Philosopher's Stone",
                    "work_count": 1,
                    "top_subjects": [
                        "Fantasy",
                        "Fiction"
                    ],
                    "_version_": 1234567890123456789
                }
            ]
        });
        }
      });
    });

    // getAuthors uses the mock implementation for fetch:
    const author = await getAuthors("kassandra fleischer");
    expect(jest.mocked(fetch).mock.calls.length).toBe(1);
    expect(author).toBeDefined();
    expect(author?.key).toBe('OL489830K');
  });

  it('getAuthors should be undefined if author not exists', async () => {
    // provide a mock implementation for the mocked fetch:
    jest.mocked(fetch).mockImplementation((): Promise<any> => {
      return Promise.resolve({
        json() {
          return Promise.resolve({
            "numFound": 0,
            "start": 0,
            "numFoundExact": true,
            "docs": []
        });
        }
      });
    });

    // getAuthors uses the mock implementation for fetch:
    const author = await getAuthors("vieby fleischer");
    expect(jest.mocked(fetch).mock.calls.length).toBe(1);
    expect(author).toBeUndefined();
  });

  it('getWorks should fetch the works of an author', async () => {
    // provide a mock implementation for the mocked fetch:
    jest.mocked(fetch).mockImplementation((): Promise<any> => {
      return Promise.resolve({
        json() {
          return Promise.resolve({
            "links": {
                "self": "/authors/OL489830K/works.json",
                "author": "/authors/OL489830K"
            },
            "size": 2,
            "entries": [
                {
                    "key": "/works/OL1234567K",
                    "title": "Test Book TS Course 23",
                    "authors": [
                        {
                            "type": {
                                "key": "/type/author_role"
                            },
                            "author": {
                                "key": "/authors/OL489830K"
                            }
                        }
                    ],
                    "type": {
                        "key": "/type/work"
                    },
                    "last_modified": {
                        "type": "/type/datetime",
                        "value": "2023-02-13T09:25:48.293386"
                    },
                    "revision": 3
                },
                {
                  "key": "/works/OL1234568K",
                  "title": "Learning TypeScript",
                  "authors": [
                      {
                          "type": {
                              "key": "/type/author_role"
                          },
                          "author": {
                              "key": "/authors/OL489830K"
                          }
                      }
                  ],
                  "type": {
                      "key": "/type/work"
                  },
                  "last_modified": {
                      "type": "/type/datetime",
                      "value": "2023-02-13T09:25:48.293386"
                  },
                  "revision": 1
              }
            ]
        });
        }
      });
    });

    // getWorks uses the mock implementation for fetch:
    const works = await getWorks("OL489830K");
    expect(jest.mocked(fetch).mock.calls.length).toBe(1);
    expect(works).toBeDefined();
    expect(works?.length).toBe(2);
  });
});
