/**
 * Task 2.
Разработать тест со следующими шагами:
 - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
 - Войти в приложения используя учетные данные aqacourse@gmail.com / password при этом:
 - проверить исчезновение спиннера с помощью waitFor* методов
 - проверить действительно ли пользователь с логином AQA User вошел в систему
 - Прокликать каждый элемент бокового меню, убедится что после клика background-color элемента не красный

 Рекомендации по использованию:
 - метод $$ поиска по всем элементам
 - for .. of  для перебора коллекции элементов 
 - метод click() для клика по элементу в цикле
 - Проверить background-color можно двумя способами:
    1. По CSS стилю.  element.getCSSProperty('background-color)  https://webdriver.io/docs/api/element/getCSSProperty
    2. По отсутствию класса, отвечающего за добавление красного бэкграунда.  element.getAttribute('class') https://webdriver.io/docs/api/element/getAttribute

 */

describe('AQA course', () => {
    const url = "https://anatoly-karpovich.github.io/aqa-course-project/#";
    const username = 'aqacourse@gmail.com'
    const password = 'password'
    const emailLocator = '#emailinput'
    const passwordLocator = '#passwordinput'
    const loginLocator = 'button[type="submit"]'
    const userId = '#dropdownUser1'
    const spinnerLocator = '.spinner-border'
    const leftMenuBarLocator = '.nav-link'

    before(async () => {
        await browser.maximizeWindow();
    });

    beforeEach(async () => {
        await browser.url(url);
    });

    it('Element is not red after click background-color', async () => {
       const emailInput = await $(emailLocator)
       const passwordInput = await $(passwordLocator)
       await emailInput.setValue(username)
       await passwordInput.setValue(password)
       await $(loginLocator).click()

       await (await $(spinnerLocator)).waitForDisplayed({
            timeoutMsg: 'Spinner is still present!',
            timeout: 5000,
            interval: 1000,
            reverse: true
        });

       const user = await $(userId)
       await user.waitForDisplayed({
            timeoutMsg: 'User is logged!',
            timeout: 5000,
            interval: 1000,
            reverse: false
        });
        await expect(user).toHaveText('AQA User')

        const lefMenuBarElements = await $$(leftMenuBarLocator)
        for (let element of lefMenuBarElements) {
            await element.click()
            await browser.waitUntil(async () => {
                const color = await element.getCSSProperty('background-color')
                return color.value !== 'rgba(0,0,0,0)'
            }, {
                timeoutMsg: `Element "${element.getAttribute}" wasn't clicked`,
                timeout: 3000,
                interval: 1000,
            })
            const color = await element.getCSSProperty('background-color')
            expect(color.value).not.toEqual('rgba(220,53,69,1)')
        }
    })
})

