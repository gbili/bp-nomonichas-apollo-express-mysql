import { expect } from 'chai';
import Book from '../../src/models/Book';

describe('Book', function () {
  describe(`Book.all()`, function() {
    it('should return a list', async function() {
      expect(await Book.all()).to.be.an('array');
    });
  });

  describe(`Book.create()`, async function() {
    it('should return an instance of Book', async function() {
      const book = await Book.create({title:'Meditations', author:'Marcus Aurelius'});
      expect(book).to.be.an.instanceof(Book);
    });
    it('should have an id', async function() {
      const book = await Book.create({title:'The Republic', author:'Plato'});
      expect(book.ID).to.be.a('number');
    });
  });

  describe(`Book.create(existing-book)`, async function() {
    it('should return an instance of Book', async function() {
      const book = await Book.create({title:'Meditations', author:'Marcus Aurelius'});
      expect(book).to.be.an.instanceof(Book);
    });
  });

});

