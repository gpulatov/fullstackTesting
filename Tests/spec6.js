//Pages connection
var homePage = require("../Pages/home.page.js");
var base = require('../Utilities/Base.js');
//var testData = require("../TestData/data.json");
var topNav = require ("../Pages/topNavigation.page.js");
var self = require ("../Pages/self.page.js");

//Database Connection
var pgp = require('pg-promise')( /*options*/ );
var connectionString = require("../TestData/dbConnection.js");
var queries = require ("../TestData/queries.js");

//
var EC = protractor.ExpectedConditions;

describe('Login with Database connection', () => {

    var db = pgp(connectionString);
    var arr = [];
    var userName = '';
    var pass     = '';
    it('Test Case 6 - Backend Testing Multiple Users Login Information Check', () => {
            //Pre-test trials on pgAdmin
            //Show all the users
            //Fetch the data from database
            db.any(queries.qr3)
                .then(function (result) {
                    arr = result;
                    console.log(arr.length)
                    //userName = result[0].email;
                    //console.log(userName);
                    //pass = result[0].firstname.toLowerCase()+result[0].lastname.toLowerCase();
                    //console.log(pass);
                }).catch(function (error) {
                    console.log(error);
                }).then(function () {
                    //All our UI automation code will be here
                    arr.forEach(function (elemAsRow) {  // elemAsRow is 1 row od data we fetched from a bookit database.
                        userName = elemAsRow.email;
                        pass = elemAsRow.firstname.toLowerCase() + elemAsRow.lastname.toLowerCase();
                        //navigating to web home page
                        base.navigateToHome();
                        //sign in to the account
                        homePage.email.sendKeys(userName);
                        homePage.password.sendKeys(pass);
                        homePage.signInButton.click();
                        browser.wait(EC.presenceOf(homePage.titleVA), 6000);

                        //Navigating to Self Page
                        browser.actions().mouseMove(topNav.my).perform();
                        browser.wait(EC.visibilityOf(topNav.self), 6000);
                        topNav.self.click();
                        browser.wait(EC.presenceOf(self.updatePass), 6000);

                        //Comparing actual result(testing result) with expected(backEnd from database)
                        expect(self.dataOnTable.get(0).getText()).toEqual(elemAsRow.firstname + " " + elemAsRow.lastname);
                        expect(self.dataOnTable.get(1).getText()).toEqual(elemAsRow.role);
                        expect(self.dataOnTable.get(2).getText()).toEqual(elemAsRow.teamname);
                        expect(self.dataOnTable.get(3).getText()).toEqual('#' + elemAsRow.batchnumber);
                        expect(self.dataOnTable.get(4).getText()).toEqual(elemAsRow.location);

                        //sign out from the page
                        browser.actions().mouseMove(topNav.my).perform();
                        browser.wait(EC.visibilityOf(topNav.signOut), 6000);
                        topNav.signOut.click();

                    })
                    
    
                })
        });
});