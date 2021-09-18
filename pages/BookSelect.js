import { Button, Card, CardActions, CardContent, CardMedia, Typography, Box, Paper, Menu, MenuItem } from "@material-ui/core";
import { ArrowDropDownCircleOutlined } from "@material-ui/icons";
import ControlPointDuplicateIcon from '@material-ui/icons/ControlPointDuplicate';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

function BookSelect() {
  const router = useRouter();
  const [bookselect, setBookselect] = useState(
    useSelector((state) => state.books.bookSelection)
  );
  const [books, setBooks] = useState(
    useSelector((state) => state.books.books.data[bookselect])
  );

  const [anchorEl, setAnchorEl] = React.useState(null); 
  const [lang, setlang] = React.useState("en");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (lan) => {
    setlang(lan)
    setAnchorEl(null);
  };

  const addBook = () => {
    let chaine = "/MainCompo?page="+String(5);
    router.push(chaine, undefined, { shallow: true });
  }
  return (
    <>
    <div  className="w-full flex flex-row align-center">
    <div className="w-3/12 fixed left-12">
    <Button
        onClick={addBook}
        className="bg-secondary text-white mb-4"
      >
        <ControlPointDuplicateIcon className="mr-4" /> Add book
      </Button>
    <Card>
      <CardMedia
        component="img"
        alt="green iguana"
        image={books.src}
        className="h-48"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {books.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <a target="_blank" className="text-blue-700" href={books.link}>
          Show the page
          </a>
          <br />
          <div className="text-blue-900 pt-3" >
          total number of paragraph : {books.sentences.length}
          </div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">{books.type}</Button>
        <Button size="small">{books.author}</Button>
      </CardActions>
    </Card>
    </div>
    <div  className="w-5/12 ml-96" >
    <Box className="w-full ml-24">
      <Paper elevation={2} className="p-5">

      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="bg-secondary text-white mb-4"
      >
        <ArrowDropDownCircleOutlined className="mr-4" /> Language
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleClose("en")}>English</MenuItem>
        <MenuItem  onClick={() => handleClose("fr")}>French</MenuItem>
      </Menu>

        {books.sentences && books.sentences.map((books, key) => (
          <div className="mb-5 cursor-pointer hover:bg-gray-200" key={key}>
            { (lang === "en" ? books.en.replaceAll("##","") : books.fr.replaceAll("##",""))}
          </div>
        ))}
      </Paper>
    </Box>
    </div>
    </div>
    </>)
}

export default BookSelect;
