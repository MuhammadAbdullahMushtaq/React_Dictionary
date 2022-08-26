import {React, useState} from 'react'
import { Box, Typography, FilledInput, IconButton, useTheme } from '@material-ui/core' // (box)same as div but provides props to style it, (typography) used for writing text, (iconbutton) just a button but used for icons specifically
import { Search as SearchIcon, Bookmark as BookmarkIcon} from '@material-ui/icons'
import { useHistory, Link } from 'react-router-dom'


const Home = () => {
    const [Word, setWord] = useState("")
    const history = useHistory() // hook when invoked return back history instance
    const theme = useTheme() // hook when invoked return backs the theme on which we are working currently

    const handleSubmit = (event) =>{
        event.preventDefault();
        const lowerCase = Word.toLowerCase();
        const trimmedWord = lowerCase.trim(); // trim() method removes any extra spaces in the word
        if (!trimmedWord || trimmedWord.split(' ').length > 1 ) // split() method use for double word if double word then nothing happens b/c lenght will be > 1
        return;
        history.push(`/search/${trimmedWord}`); // takes the path and puushes the user to the specific path using history hook
    }
    return (
        <Box sx={{
            ...theme.mixins.alignInTheCenter
        }}>
            <img src="/assets/book.png" alt="book" />
            <Typography variant="h4" color="primary" sx={{ mt: 3, mb: 1 }} >Dictionary</Typography>
            <Typography color="GrayText" >Find Meanings And BookMark For Quick Reference</Typography>
            <Box sx={{ width: '360px'}}>
                <form onSubmit={handleSubmit} >
                <FilledInput 
                    value={Word}
                    onChange={event => setWord(event.target.value)}
                    disableUnderline placeholder="Search Word" 
                    sx={{ 
                        my: 4,
                        backgroundColor: "white",
                        borderRadius: 2,
                        boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
                        '& .MuiFilledInput-input': { p:2, } }}
                        startAdornment={<SearchIcon color="disabled" />}
                        fullWidth
                />
                </form>
            </Box>
            <IconButton component={Link} to="/bookmarks"  sx={{ 
                background: theme => theme.palette.pink,
                borderRadius: 2,
                p: 2,
                color: '#fff',
                boxShadow: '0px 10px 10px rgba(221, 114, 133, 0.2)' }}>
                <BookmarkIcon />
            </IconButton>
        </Box>
    )
}

export default Home
