/**
 * Task 1.

Разработать тест со следующими шагами:

  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Loading
  - Дождаться появления каждой ссылки на странице (их 2)
  - кликнуть по ссылке Example 1: Element on page that is hidden
  - дождаться появления кнопки start
  - кликнуть по кнопке start
  - дождаться появления текста "Hello World!" в теге h4 с помощью метода waitForElementWithText(), который вам надо разработать!:)

 Создать функцию waitForElementWithText(selector, text, timeout) для ожидания определенного текста (text) 
 у элемента с определенным селектором (selector) на протяжении определенного времени (timeout):
  - Использовать browser.waitUntil с комбинацией проверок (элемент виден и тест верный)
  - Добавить понятный timeoutMsg, с пояснением какие проверки не пройдены и селектором элемента

 */

describe('Heroku application', () => {
    const url = "https://the-internet.herokuapp.com/";
    const dynamicLoadingSelector = '[href="/dynamic_loading"]'
    const exampleLinksSelector = 'div.example a[href]'
    const buttonStartSelector = '#start > button'
    const finishSelector = '#finish > h4'

    before(async () => {
        await browser.maximizeWindow();
    });

    beforeEach(async () => {
        await browser.url(url);
        const dynamicLoading = await $(dynamicLoadingSelector)
        await dynamicLoading.waitForExist({
            timeoutMsg: 'Dynamic loading is not exists in DOM! Make good selectors, noob!',
            timeout: 5000,
            interval: 1000,
            reverse: false
          });
    });

    it('Wait for elements', async () => {
        const dynamicLoading = await $(dynamicLoadingSelector)
        await dynamicLoading.click()

        const exampleLinks = await $$(exampleLinksSelector)
        for (let link of exampleLinks) {
            await link.waitForDisplayed({
                timeoutMsg: 'Example link is not loaded!',
                timeout: 5000,
                interval: 1000,
                reverse: false
            })
        }

        const example1: WebdriverIO.Element = await $$(exampleLinksSelector).find(async link => await link.getText() === 'Example 1: Element on page that is hidden')
        example1
        ? await example1.click()
        : new Error('Element not found')

        const buttonStart = await $(buttonStartSelector)
        await buttonStart.waitForExist({
            timeoutMsg: 'Start button is not exists in DOM! Make good selectors, noob!',
            timeout: 5000,
            interval: 1000,
            reverse: false
          });
        await buttonStart.click()
        
        await waitForElementWithText(finishSelector, 'Hello World!', 20000)
    })

    async function waitForElementWithText(selector: string, expectedText: string, timeout: number) {
        await browser.waitUntil(async () => {
            const element = await $(selector)
            const text = await element.getText()
            return text === expectedText
        }, {
            timeoutMsg: `Element with selector "${selector}" does not contain text "${expectedText}" within ${timeout}ms`,
            timeout,
            interval: 1000,
        });
    }
})

