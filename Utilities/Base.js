var base = function () {
    
    this.homeUrl = 'https://cybertek-reservation-qa.herokuapp.com/sign-in';
    this.navigateToHome = function (homeUrl) {
        browser.get(this.homeUrl)
    }
}

module.exports = new base();