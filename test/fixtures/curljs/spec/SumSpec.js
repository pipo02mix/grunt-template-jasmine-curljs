define(['test/fixtures/curljs/src/math'], function(math) {

    describe('Example AMD test', function(){
        describe('Sum', function(){
            it('Should add two numbers together', function(){
                expect(math.sum(2,10)).toEqual(12);
            });
            it('Should add two numbers together again', function(){
                expect(math.sum(2,10)).toEqual(12);
            });
        });
    });

});
