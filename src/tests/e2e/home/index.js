describe('homepage', function() {
    beforeEach(function() {
        browser.get('/');
    });
    it('should show welcome!', function() {
       var h1 = element.all(by.css('h1'));
       console.log( element( by.binding('iwdif')) );
       console.log( h1.get(0) );
      // expect(jumbotron.count()).toBe(1);
    });
    
});