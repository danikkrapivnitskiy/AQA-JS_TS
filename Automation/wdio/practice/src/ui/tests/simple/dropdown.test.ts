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
        await $(dropdownSelector).click()
        const options = await $$(optionsSelector)
        const option: WebdriverIO.Element = await options.find(async o => await o.getText() === value)
        const index = options.indexOf(option)
        if (index === -1) throw new Error(`Unable to find dropdown element with text ${option}`);
        const keys = Array(index).fill(Key.ArrowDown);
        await browser.keys([...keys, Key.Enter]);
    }
})