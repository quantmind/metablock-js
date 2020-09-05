import { Page } from "puppeteer";

export default async (page: Page): Promise<any> => {
  try {
    const statusCode = await page.$eval("meta[name='page-status-code']", (el) =>
      //@ts-ignore
      el ? +el.content : null
    );
    return statusCode ? { statusCode } : null;
  } catch (exc) {
    return;
  }
};
