enum ErrorMessages {
    SUCCESS = 'Successfully registered! Please, click Back to return on login page',
    USERNAME_REQUIRED = 'Username is required',
    PASSWORD_RQUIRED = 'Password is required',
    USERNAME_MIN_LENGTH = 'Username should contain at least 3 characters',
    USERNAME_SPACES = 'Prefix and postfix spaces are not allowed is username',
    INVALID_DATA = 'Please, provide valid data',
    PASSWORD_MIN_LENGTH = 'Password should contain at least 8 characters',
    PASSWORD_UPPER = 'Password should contain at least one character in upper case',
    PASSWORD_LOWER= "Password should contain at least one character in lower case"
}


const testData = [    
    { username: 'validUser8', password: 'ValidPass1', expectedMessage: ErrorMessages.SUCCESS },    

    { username: '', password: 'ValidPass1', expectedMessage: ErrorMessages.USERNAME_REQUIRED },
    { username: 'ab', password: 'ValidPass1', expectedMessage: ErrorMessages.USERNAME_MIN_LENGTH},    
    { username: '   ', password: 'ValidPass1', expectedMessage: ErrorMessages.USERNAME_SPACES },
    { username: ' user ', password: 'ValidPass1', expectedMessage: ErrorMessages.USERNAME_SPACES },

    { username: 'validUser12', password: '', expectedMessage: ErrorMessages.PASSWORD_RQUIRED },
    { username: 'validUser13', password: 'short1', expectedMessage: ErrorMessages.PASSWORD_MIN_LENGTH },
    // { username: 'validUser', password: 'a'.repeat(21), expectedMessage: ErrorMessages.INVALID_DATA },
    { username: 'validUser14', password: 'password', expectedMessage: ErrorMessages.PASSWORD_UPPER },
    { username: 'validUser15', password: 'PASSWORD', expectedMessage: ErrorMessages.PASSWORD_LOWER },
    { username: 'validUser16', password: 'passWord', expectedMessage: ErrorMessages.SUCCESS },
    { username: 'validUser17', password: '    ', expectedMessage: ErrorMessages.PASSWORD_RQUIRED },
];

describe('My Login application', () => {
    const url = "https://anatoly-karpovich.github.io/demo-login-form/";
    const loginInput = '#userNameOnRegister';
    const passwordInput = '#passwordOnRegister';
    const registerOnLoginButtonSelector = '#registerOnLogin';
    const errorMessageSelector = '#errorMessageOnRegister';
    const registerButtonSelector = '#register';

    before(async () => {
        await browser.maximizeWindow();
    });

    beforeEach(async () => {
        await browser.url(url);
    });

    testData.forEach(({username, password, expectedMessage}) => {
        it('should login with valid credentials', async () => {
            const registerOnLoginButton = await $(registerOnLoginButtonSelector);            
            await registerOnLoginButton.click(); 
    
            const login = await $(loginInput);            
            await login.setValue(username);
    
            const passwordElement = await $(passwordInput);            
            await passwordElement.setValue(password);
    
            (await $(registerButtonSelector)).click;
    
            const message = await $(errorMessageSelector);
    
            await expect(message).toHaveText(expectedMessage)
        })
    })
})

