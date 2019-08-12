import { expect } from 'chai';
import { di, bootstrap } from '../bootstrap';

let Book = null;

describe('Book', function () {

  describe(`Book.all()`, async function() {

    it('should fetch dependencies to make it available to following tests', async function() {
      Book = await di.get('Book');
      expect(Book.create).to.be.a('function');
    });

    it('should BOOTSTRAP', async function() {
      expect(await bootstrap('Book')).to.be.equal(true);
    });

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
