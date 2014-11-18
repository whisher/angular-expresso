describe('homepage', function() {
    beforeEach(function() {
        browser.get('/');
    });
    it('should show welcome!', function() {
       var jumbotron = element.all(by.css('h1'));
       //console.log(jumbotron);
      // expect(jumbotron.count()).toBe(1);
    });
    
});