import { Given, Then, When } from "@wdio/cucumber-framework";
import pages from "../pages/pageFactory.js";

Given("I open {string} url", async function (url: string) {
  await browser.maximizeWindow();
  await browser.url(url);
});

Given("I open Sales Portal", async function () {
  await browser.maximizeWindow();
  await browser.url("https://anatoly-karpovich.github.io/aqa-course-project");
});

When(/^I enter "([^"]*)" in "([^"]*)" on "([^"]*)" page$/, async function (text: string, element: string, page: string) {
  await pages[page].setValue(pages[page][element], text);
});

When(/^I click on "([^"]*)" on "([^"]*)" page$/, async function (element: string, page: string) {
  // const foundPage = pages[page];
  // const elementFromPage = foundPage[element];
  // await foundPage.click(elementFromPage);
  await pages[page].click(pages[page][element]);
});

Then(/^I should( not)? see "([^"]*)" on "([^"]*)" page$/, async function (not: string, element: string, page: string) {
  not ? await pages[page].waitForElement(pages[page][element], { reverse: true }) : await pages[page].waitForElement(pages[page][element]);
});

Then(/^I should see "(.*)" (with|contains) text "(.*)" on "([^"]*)" page$/, async function (element: string, method: string, text: string, page: string) {
  const actualText = await pages[page].getText(pages[page][element]);
  method === "with" ? expect(actualText).toEqual(text) : expect(actualText).toContain(text);
});

Then(/^I should be on "([^"]*)" page$/, async function (page: string) {
  await pages[page].waitForSpinnerToHide();
  await pages[page].waitForOpened();
});

Then(/^I wait for "(.*)" seconds$/, async function (delay: number) {
  await browser.pause(delay * 1000);
});
