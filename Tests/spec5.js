var homePage = require("../Pages/home.page.js");
var base = require('../Utilities/Base.js');
//var testData = require("../TestData/data.json");


//Database Connection
var pgp = require('pg-promise')( /*options*/ );
var connectionString = require("../TestData/dbConnection.js");
var queries = require ("../TestData/queries.js")
var topNav = require ("../Pages/topNavigation.page.js");
var self = require ("../Pages/self.page.js");
describe('Login with Database connection', () => {

 

    var db = pgp(connectionString);
    var arr = [];
    var userName = '';
    var pass     = '';
    it('Test Case 5 - Backend Testing Single Page ', () => {
            //Pre-test trials on pgAdmin
            //Show all the users
            //Fetch the data from database
            db.any(queries.qr2)
                .then(function (result) {
                    userName = result[0].email;
                    console.log(userName);
                    pass = result[0].firstname.toLowerCase()+result[0].lastname.toLowerCase();
                    console.log(pass);
                }).catch(function (error) {
                    console.log(error);
                }).then(function () {
                    //All our UI automation code will be here
                    base.navigateToHome();
                    homePage.email.sendKeys(userName);
                    homePage.password.sendKeys(pass);
                    homePage.signInButton.click();
                    browser.sleep(2000);
                    //expect(homePage.titleVA.getText()).toEqual("VA");
                    //browser.sleep(3000)
                    browser.actions().mouseMove(topNav.my).perform();
                    browser.sleep(4000);
                    topNav.self.click();
                    expect(self.dataOnTable.get(0).getText()).toEqual(arr[0].firstname + " " + arr[0].lastname);
                    expect(self.dataOnTable.get(1).getText()).toEqual(arr[0].role);
                })
        });
});