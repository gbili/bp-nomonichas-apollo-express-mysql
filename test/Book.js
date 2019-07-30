import { expect } from 'chai';
import Book from '../src/models/Book';

describe(`Book.all()`, function() {
  it('it should return a list', function() {
    expect(Book.all()).to.be.an('array');
  });
  it('it should be instantiatable', function() {
    expect(new Book({title:'Hello', author:'Author'})).to.be.an.instanceof(Book);
  });
});
