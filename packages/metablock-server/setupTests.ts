import fetchMock from "jest-fetch-mock";
//@ts-ignore
global.fetch = fetchMock;
fetchMock.enableMocks();
