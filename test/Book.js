import { expect } from 'chai';
import MysqlReq from '../src/data/connection';
import Book from '../src/models/Book';

describe('Book', function() {

  describe(`Book.all()`, function() {
    it('it should return a list', async function() {
      expect(await Book.all()).to.be.an('array');
    });
  });

  describe(`Book instance`, function() {
    let book = new Book({title:'Meditations', author:'Marcus Aurelius'});
    describe(`Book.prototype.constructor`, function() {
      it('it should return an instance of Book', function() {
        expect(book).to.be.an.instanceof(Book);
      });
    });

    describe(`Book.save()`, function() {
      it('it should return the last insertId', async function() {
        expect(await book.save()).to.be.a('number');
      });
    });

  });

});

after(async () => {
  MysqlReq.disconnect();
});
