var homePage = require("../Pages/home.page.js");
var base = require('../Utilities/Base.js');
//var testData = require("../TestData/data.json");


//Database Connection
var pgp = require('pg-promise')( /*options*/ );
var connectionString = require("../TestData/dbConnection.js");
var queries = require ("../TestData/queries.js")

describe('Login with Database connection', () => {

 

    var db = pgp(connectionString);
    var arr = [];
    var userName = '';
    var pass     = '';
    it('Test Case 3 - Login to the Website with DB Connection', () => {
            //Pre-test trials on pgAdmin
            //Show all the users
            //Fetch the data from database
            db.any(queries.qr1)
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
                    expect(homePage.titleVA.getText()).toEqual("VA");
                })
        });
});