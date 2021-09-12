import React, { useEffect, useState } from "react";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import { Button, FormControl, InputLabel, TextField } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import { useSelector, useDispatch } from "react-redux";

function NewBook({ toggleDrawerSecond }) {

    const books = useSelector((state) => state.books.books);
    const [author, setAuthor] = useState([])
    const [type, setType] = useState([])

    const [notAuthor, setnotAuthor] = useState(true)
    const [notType, setnotType] = useState(true)

    useEffect(() => {
        for(let i=0; i<books.length; i++){
            if (author.indexOf(books[i].author)===-1){
                setAuthor([ ...author,books[i].author ])
            }
            if (type.indexOf(books[i].type)===-1){
                setType([ ...type,books[i].type ])
            }
        }
    })

    const [state, setState] = useState({
        author: '',
        type: '',
        title: '',
        link: '',
        image: ''
    })
    const handleChange = (event) => {
        const name = event.target.name;
        if(name === "author"){
            if(parseInt(event.target.value) === -1){
                setnotAuthor(false)
            }
        }

        if(name === "type"){
            if(parseInt(event.target.value) === -1){
                setnotType(false)
            }
        }

        setState({
          ...state,
          [name]: event.target.value,
        });
      };

  return (
    <div className="w-96 flex flex-col bg-seventh h-full p-7 text-primary">
      <div className="text-2xl font-Roboto">
        <MenuBookIcon className="mr-4" />
        New document
      </div>
      <form className="bg-white rounded text-center mt-7" noValidate autoComplete="off">

        <TextField id="outlined-basic" label="Title" variant="outlined" size="small" className="m-5 mb-2" name="title"onChange={handleChange}  />
        <TextField id="outlined-basic" label="Link" variant="outlined" size="small" className="m-5 mt-1 mb-2" name="link"onChange={handleChange} />
        <TextField id="outlined-basic" label="Image" variant="outlined" size="small" className="m-5 mt-1 mb-2" name="image"onChange={handleChange} />
        <TextField id="outlined-basic" label="Author" variant="outlined" size="small"  name="author" onChange={handleChange} className={["m-5 mt-1 mb-2",  (notAuthor) ? "hidden" : "" ].join(" ")} />
        <TextField id="outlined-basic" label="Type" variant="outlined" size="small"  name="type" onChange={handleChange} className={["m-5 mt-1 mb-2",  (notType) ? "hidden" : "" ].join(" ")} />

        <FormControl variant="outlined" size="small" className={["m-5 mt-1 mb-2 w-7/12", (notAuthor) ? "" : "hidden"].join(" ")}>
        <InputLabel htmlFor="outlined-age-native-simple">Autheur</InputLabel>
        <Select
          native
          value={state.author}
          onChange={handleChange}
          label="Age"
          inputProps={{
            name: 'author',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={-1}>nothing result</option>
          {
              author.map(item => (
                <option value={item}>{item}</option>
              ))
          }

        </Select>
      </FormControl>


      <FormControl variant="outlined" size="small" className={["m-5 mt-1 mb-2 w-7/12", (notType) ? "" : "hidden"].join(" ")}>
        <InputLabel htmlFor="outlined-age-native-simple">Type format</InputLabel>
        <Select
          native
          value={state.type}
          onChange={handleChange}
          label="Type"
          inputProps={{
            name: 'type',
            id: 'outlined-age-native-simple',
          }}
        >
          <option aria-label="None" value="" />
          <option value={-1}>nothing result</option>
          {
              type.map(item => (
                <option value={item}>{item}</option>
              ))
          }
        </Select>
      </FormControl>
<br />
      <Button variant="contained" color="secondary" className="mt-5 mb-5" onClick={toggleDrawerSecond("right", false, state)}>
  Submit
</Button>
      </form>
    </div>
  );
}

export default NewBook;
