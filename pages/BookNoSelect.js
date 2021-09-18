import { Button, Card, CardActions, CardContent, CardMedia, Typography, Box, Paper, Menu, MenuItem, TextField } from "@material-ui/core";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ControlPointDuplicateIcon from '@material-ui/icons/ControlPointDuplicate';
import React, { useEffect, useState } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
const axios = require('axios');
import { store } from "react-notifications-component";

function BookNoSelect() {

    const [books, setBooks] = useState({
        src: "http://placehold.jp/400x400.png",
        title: "",
        link: "",
        sentences: [],
        type: "",
        author: ""

    })

    const [sentence, setSentences] = useState("")

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [load, setLoad] = React.useState(-1);

    
    const handleClick = () => {
        setBooks({ ...books, sentences: [... books.sentences, {en:sentence}]})
        setSentences("")
    };

    const saveAss = () => {
        setLoad(0)
        axios.get('http://127.0.0.1:5000/saveAs',{
            params: {
              data: JSON.stringify({"data":books})
            }
          }).then(function (response) {
            setLoad(-1)
            store.addNotification({
                title: "answer!",
                message: "Click and show books",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 90000,
                  onScreen: false,
                },
              });
            })
    }
    const setState = (e) => {
        if(e.target.getAttribute("name") === "sentence"){
            setSentences(e.target.value)
        }
        if(e.target.getAttribute("name") === "src"){
            setBooks({ ...books, src: e.target.value})
        }
        if(e.target.getAttribute("name") === "link"){
            setBooks({ ...books, link: e.target.value})
        }
        if(e.target.getAttribute("name") === "title"){
            setBooks({ ...books, title: e.target.value})
        }
        if(e.target.getAttribute("name") === "type"){
            setBooks({ ...books, type: e.target.value})
        }
        if(e.target.getAttribute("name") === "author"){
            setBooks({ ...books, author: e.target.value})
        }
    }
    return (
<>
    <div  className="w-full flex flex-row align-center">
    <div className="w-3/12 fixed left-12">
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        image={books.src}
        className="h-48"
      />
      <CardContent>
      <TextField className="mb-2" onChange={setState}variant="outlined" name="src" label="src" defaultValue={books.src} size="small" />
        <Typography gutterBottom variant="h5" component="div">
          <TextField onChange={setState}variant="outlined" name="title" label="title" defaultValue={books.title} size="small" />
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <TextField onChange={setState}variant="outlined" label="link" name="link"  defaultValue={books.link} size="small" />
          <br />
          <div className="text-blue-900 pt-3" >
          total number of paragraph : {books.sentences.length}
          </div>
        </Typography>
      </CardContent>
      <CardActions>
      <TextField onChange={setState}variant="outlined" label="type" name="type"  defaultValue={books.type} size="small" />
      <TextField onChange={setState}variant="outlined" label="author" name="author"  defaultValue={books.author} size="small" />
      </CardActions>
    </Card>
    </div>
    <div  className="w-5/12 ml-96" >
    <Box className="w-full ml-24">
      <Paper elevation={2} className="p-5">

      <Button
        className="bg-green-700 text-white mb-4"
        onClick={saveAss}
      >
        <AssignmentTurnedInIcon className="mr-4" /> Save as
      </Button>
      
      <Button
        onClick={handleClick}
        className="bg-blue-700 text-white mb-4 ml-3"
      >
        <ControlPointDuplicateIcon className="mr-4" /> Add sentence
      </Button> <CircularProgress color="secondary" className={["ml-5",(load === -1) ? "hidden" : ""].join(" ")} />
      <br />
      <TextField onChange={setState}className="w-full"           multiline
          rows={4} variant="outlined" label="sentence" name="sentence"  defaultValue={sentence}  />

        {books.sentences && books.sentences.map((books, key) => (
          <div className="mt-4 cursor-pointer hover:bg-gray-200" key={key}>
            {books.en}
          </div>
        ))}

      </Paper>
    </Box>
    </div>
    </div>
    </>
    )
}

export default BookNoSelect
