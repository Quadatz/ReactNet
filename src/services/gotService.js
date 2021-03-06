export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`${url}, ${res.status}`);
        }
        return await res.json();
    }
    getAllCharacters = async() => {
        const result = await this.getResource(`/characters?page=5&pageSize=10`);
        return result.map(this._transformChar);
    }
    getCharacter = async(id) =>{
        const character = await this.getResource(`/characters/${id}`);
        return this._transformChar(character);
    }
    getAllHouses = async() => {
        return this.getResource(`/houses/`)
    }
    getHouse = async (id) => {
        return this.getResource(`/houses/${id}/`);
    }
    getAllBooks = async() => {
        return this.getResource(`/books/`);
    }
    getBook = (id) => {
        return this.getResource(`/books/${id}/`);
    }
    _transformChar(char) {
        return {
            name: (char.name ? char.name : 'no data :('),
            gender: (char.gender ? char.gender : 'no data :('),
            born: (char.born ? char.born : 'no data :('),
            died: (char.died ? char.died : 'no data :('), 
            culture: (char.culture ? char.culture : 'no data :(')
        }
    }
    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }
    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}
