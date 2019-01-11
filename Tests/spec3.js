var homePage = require("../Pages/home.page.js");
var base = require('../Utilities/Base.js');
//var testData = require("../TestData/data.json");

//Database Connection

var pgp = require('pg-promise')( /*options*/ );


describe('Login with Database connection', () => {

    var connectionString = {
        host: 'room-reservation-qa2.cxvqfpt4mc2y.us-east-1.rds.amazonaws.com',
        port: 5432,
        database: 'room_reservation_qa2',
        user: 'qa_user',
        password: 'Cybertek11!'
    }

    var db = pgp(connectionString);
    //var arr = [];
    // it('Test Case 3 - Login to the Website with DB Connection', () => {
    //     //Pre-test trials on pgAdmin
    //     //Show all the users
    //     db.any(`SELECT firstname, lastname, role, email, name
    //     FROM users "u" INNER JOIN team "t"
    //     ON u.team_id = t.id`)
    //         .then(function (result) {
    //             arr = result;
    //         }).catch(function (error) {
    //             console.log(error);
    //         }).then(function () {
    //             //All our automation code will be here
    //             console.log(arr);
    //         })
    // });

    var arr = [];
    var userName = '';
    var pass     = '';
    it('Test Case 3 - Login to the Website with DB Connection', () => {
            //Pre-test trials on pgAdmin
            //Show all the users
            //Fetch the data from database
            db.any(`SELECT firstname, lastname, email FROM users WHERE email = 'efewtrell8c@craigslist.org'`)
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