require("../Utilities/base.js");

var homePage = function () {
    this.email =  element(by.name("email"));
    this.password = element(by.name("password"));
    this.signInButton = $(".button.is-dark");
    this.titleVA = $(".title");
}

module.exports = new homePage();


