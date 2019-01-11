describe('Name of the group', () => {
    
it('should login and get title text VA from next message', () => {
    browser.get("https://cybertek-reservation-qa.herokuapp.com/sign-in");
    element(by.name("email")).sendKeys("efewtrell8c@craigslist.org");
    element(by.name("password")).sendKeys("jamesmay");
    $(".button.is-dark").click();
    browser.sleep(2000);
    expect($(".title").getText()).toEqual("VA");
});


});