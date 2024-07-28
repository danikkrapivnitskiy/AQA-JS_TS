/**
 * Разработать метод для выбора элемента в дропдауте "клавиатурой":
  selectDropdownValueWithKeys(dropdownSelector: string, optionsSelector: string, value: string)
  со следующими шагами:
    - кликнуть на дропдаун
    - дождаться появления элементов дропдауна на экране
    - Найти сколько раз надо нажать "вниз"
    - столько раз нажать стрелку ВНИЗ на клавиатуре, чтобы добраться до нужного элемента
    - нажать кнопку "Enter" на клавиатуре

Проверьте работу метода тут:
https://the-internet.herokuapp.com/
станица Dropdown


    Рекоммендации:
      - import { Key } from 'webdriverio'
      - Сверху импорт "ключей", в них есть и ArrowDown и Enter
      - browser.keys() для отправки "кликов" по клавиатуре

 */
import { Key } from 'webdriverio'

describe('Heroku app', () => {
    const url = "https://the-internet.herokuapp.com/";
    const dropdownMenuSelector = '[href="/dropdown"]'
    const dropdownSelector = '#dropdown'
    const optionsSelector = 'option[value]'

    before(async () => {
        await browser.maximizeWindow();
    });

    beforeEach(async () => {
        await browser.url(url);
        const dropdown = await $(dropdownMenuSelector)
        await dropdown.waitForExist({
            timeoutMsg: 'Dropdown is not exists in DOM! Make good selectors, noob!',
            timeout: 5000,
            interval: 1000,
            reverse: false
          });
    });

    it('Choose dropdown element by keyboard', async () => {
        await (await $(dropdownMenuSelector)).click()
        await selectDropdownValueWithKeys(dropdownSelector, optionsSelector, "Option 2")
    })

    async function selectDropdownValueWithKeys(dropdownSelector: string, optionsSelector: string, value: string) {
        const dropdown = await $(dropdownSelector)
        await dropdown.waitForClickable({
            timeoutMsg: 'Dropdown is not exists in DOM! Make good selectors, noob!',
          });
        await dropdown.click()
        const options = await $$(optionsSelector)
        await options[1].waitForExist({
            timeoutMsg: 'No options exist in DOM! Make good selectors, noob!',
          });

        const option: WebdriverIO.Element = await options.find(async o => await o.getText() === value)
        const index = options.indexOf(option)
        for (let i = 0; i <= index; i++) {
            await browser.keys(Key.ArrowDown)
            i++
        }
        await browser.keys(Key.Enter)
        const isSelected = await option.getProperty('selected');
        expect(isSelected).toBe(true)
    }
})