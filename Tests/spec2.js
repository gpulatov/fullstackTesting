var homePage = require ("../Pages/home.page.js");
var base = require('../Utilities/Base.js'); 
var testData = require("../TestData/data.json");

describe('POM and TestData ', () => {
    
    it('should login and get title text VA from next message', () => {
        base.navigateToHome()
        homePage.email.sendKeys(testData.username);
        homePage.password.sendKeys(testData.password);
        homePage.signInButton.click();
        browser.sleep(2000);
        expect(homePage.titleVA.getText()).toEqual("VA");
    });

});