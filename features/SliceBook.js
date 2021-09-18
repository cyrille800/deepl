import { createSlice,current } from '@reduxjs/toolkit'
const axios = require('axios');
import data from "../pages/api/data.json"

const SliceBook = createSlice({
    name: "book",
    initialState: {books: data, bookSelection : -1,},
    reducers: {
        incrementBook: (state, action) => {
            let link = action.payload.link
            let src = action.payload.image
            let title = action.payload.title
            link = link.replaceAll("/","$").replaceAll("?","**").replaceAll("#","@*")
            src = src.replaceAll("/","$").replaceAll("?","**").replaceAll("#","@*")
            title = title.replaceAll("/","$").replaceAll("?","**").replaceAll("#","@*")
            let chaine = 'http://127.0.0.1:5000/getSubtitle/'+link+"/"+title+"/"+action.payload.author+"/"+src+"/"+action.payload.type
            console.log(chaine)
            axios.get(chaine)
            .then(function (response) {
            // handle success
            state.books = [ ...state.books, {
                id : response.data.data.id,
                title : response.data.data.title,
                author : response.data.data.author,
                link : response.data.data.link,
                src : response.data.data.image,
                type: response.data.data.type,
                sentences : response.data.data.sentences
            }]

            console.log("***************************")
            console.log(state)
            })
            .catch(function (error) {
            // handle error
            console.log({"error" : error});
            })

            console.log(action)

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
            axios.get('http://127.0.0.1:5000/geto',{
              params: {
                data: JSON.stringify({"data":action.payload.data.data.data})
              }
            })
          },
          setBookSelection : (state, action) => {
            state.bookSelection = action.payload
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
    setSentenceText,
    setBookSelection
} = SliceBook.actions
export default SliceBook.reducer