import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bookSelection : 0,
    books: [{
        id: 0,
        title: "Olive, Again",
        author : "Elizabeth Strout",
        link : "https://google.com",
        src : "https://cdn.dribbble.com/users/2128100/screenshots/7912654/media/c6f288a1cdcc28d12d92753e3fda8c53.png?compress=1&resize=1600x1200",
        type: "book",
        sentences : [
            {
                id : 0,
                en : "with a distinctive birthright. But as adults, we spend so much of our time uncomfortable in our own skin, like we have ADD: authenticity deficit disorder. But not those babies -- not yet. Their message to me was: uncover your soul and look for that soul-spark in everyone else. It's still there. ",
                fr : "Comme beaucoup parmi nous, j'ai eu plusieurs carrières au cours de ma vie et bien qu'elles aient été variées, mon premier emploi a établi les fondements pour toutes ces carrières. J'étais sage-femme pour les accouchements à domicile de mes 20 à 30 ans. Mettre au monde des bébés m'a appris des choses utiles et parfois surprenantes, par exemple comment démarrer une voiture à 2h du matin alors qu'il fait -10°C. ",
                check : false
            },
            {
                id : 1,
                en : "with a distinctive birthright. But as adults, we spend so much of our time uncomfortable in our own skin, like we have ADD: authenticity deficit disorder. But not those babies -- not yet. Their message to me was: uncover your soul and look for that soul-spark in everyone else. It's still there. ",
                fr : "Comme beaucoup parmi nous, j'ai eu plusieurs carrières au cours de ma vie et bien qu'elles aient été variées, mon premier emploi a établi les fondements pour toutes ces carrières. J'étais sage-femme pour les accouchements à domicile de mes 20 à 30 ans. Mettre au monde des bébés m'a appris des choses utiles et parfois surprenantes, par exemple comment démarrer une voiture à 2h du matin alors qu'il fait -10°C. ",
                check : false
            },
        ]
    }]
}

const SliceBook = createSlice({
    name: "book",
    initialState,
    reducers: {
        incrementBook: (state, action) => {
            console.log(action)
            state.books = [ ...state.books, {
                id : state.books.length,
                title : action.payload.title,
                author : action.payload.author,
                link : action.payload.link,
                src : action.payload.image,
                type: action.payload.type,
                sentences : []
            }]
          },
          removeBook: (state, action) => {
            state.books.filter(function(item) {
                return item.id !== action.payload.id
            })
          },
          setBook : (state, action) => {
            state.books = [ ...state.books, {
                id : action.payload.id,
                title : action.payload.title,
                author : action.payload.author,
                link : action.payload.link,
                src : action.payload.image,
                type: action.payload.type,
            }]        
          },
          incrementSentence: (state, action) => {
            state.books[action.payload.id].sentences = [ ...state.books[action.payload.id].sentences, {
                id : state.books[action.payload.id].sentences.length,
                en : action.payload.en,
                fr : action.payload.fr,
                check : false
            }]
          },
          setSentence: (state, action) => {
            state.books[action.payload.id].sentences = [ ...state.books[action.payload.id].sentences, {
                id : action.payload.idSentence,
                en : action.payload.en,
                fr : action.payload.fr,
                check : false
            }]
          },
          setSentenceText: (state, action) => {
            state.books[action.payload.idBook].sentences[action.payload.idSentence].en = state.books[action.payload.idBook].sentences[action.payload.idSentence].en + "<suite>" + action.payload.en
            state.books[action.payload.idBook].sentences[action.payload.idSentence].fr = state.books[action.payload.idBook].sentences[action.payload.idSentence].fr + "<suite>" + action.payload.fr
          },
          removeSentence: (state, action) => {
              state.books[action.payload.idBook].sentences=state.books[action.payload.idBook].sentences.filter(function(item) {
                return item.id !== action.payload.idSentence
            })
          },
          setcheckSentence : (state, action) => {
            state.books[action.payload.idBook].sentences[action.payload.idSentence].check = action.payload.check
          },
          setBookSelection : (state, action) => {
            state.bookSelection = action.payload.bookSelection
          },
    }
});

export const {
    incrementBook,
    removeBook,
    setBook,
    incrementSentence,
    setSentence,
    removeSentence,
    setcheckSentence,
    setSentenceText
} = SliceBook.actions
export default SliceBook.reducer