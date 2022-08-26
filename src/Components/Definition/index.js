import { React, useEffect, useState, Fragment } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import { Stack, Typography, Box, IconButton, Divider, CircularProgress, useTheme, Button } from '@material-ui/core' // MUI Component with default flex property of Css and other bydefault properties.
import { ArrowBack as BackIcon, BookmarkBorder as BookmarkIcon, Bookmark as BookmarkedIcon, PlayArrow as PlayIcon } from '@material-ui/icons'


const Definition = ({ bookmarks, 
    addBookmark, removeBookmark } ) => {
    const { word } = useParams();
    const history = useHistory()
    const theme = useTheme() // hook when invoked return backs the theme on which we are working currently
    const [ Definitions, setDefinitions ] = useState([])
    const [exist, setExist] = useState(true)
    const [audio, setAudio] = useState(null)

    const isBookmarked = Object.keys(bookmarks).includes(word)

    const updateState = data => {
        setDefinitions(data);
        const phonetics = data[0].phonetics || data[1].phonetics || data[2].phonetics;
        if (!phonetics.length) return;
        const url = phonetics[0].audio.replace('//ssl', 'https://ssl') || phonetics[1].audio.replace('//ssl', 'https://ssl') || phonetics[2].audio.replace('//ssl', 'https://ssl');
        setAudio(new Audio(url));
    }

    useEffect(() => {
        const fetchDefinition = async () => {
            try{
                const resp = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                updateState(resp.data)
            } catch(err){
                setExist(false)
            }
        }
        
        if (!isBookmarked) fetchDefinition();
        else updateState(bookmarks[word])
    },[]) // the function inside the hook will be called only once.

    if (!exist) return <Box sx={{ ...theme.mixins.alignInTheCenter }}>
        <Typography>Word Not Found</Typography>
        <Button variant='contained' sx={{ textTransform: 'capitalize', mt: 2 }} onClick={history.goBack} >Go Back</Button>
        </Box>
    if (!Definitions.length) return <Box sx={{ ...theme.mixins.alignInTheCenter }}><CircularProgress /></Box>

    return (
        <>
        <Stack direction="row" justifyContent="space-between" >
            <IconButton onClick={history.goBack}>
                <BackIcon sx={{ color: 'black' }} />
            </IconButton>
            <IconButton onClick={() => isBookmarked ? removeBookmark(word) : addBookmark(word, Definitions)}>
                { isBookmarked ? <BookmarkedIcon sx={{ color: 'black' }} /> : <BookmarkIcon sx={{ color: 'black' }} />}
            </IconButton>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{
            mt: 3,
            px: 4,
            py: 5,
            borderRadius: 2,
            background: 'linear-gradient(90.17deg, #191E5D 0.14%, #0F133A 98.58%)',
            boxShadow: '0px 10px 20px rgba(19, 23, 71, 0.25)',
            color: 'white',
        }}>
            <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>{ word }</Typography>
            { audio && <IconButton onClick={() => audio.play()} sx={{
                borderRadius: 2,
                p: 1,
                color: '#fff',
                background: theme => theme.palette.pink,
            }} >
            <PlayIcon /></IconButton>}
        </Stack>

        {Definitions.map((def, idx) => // .map() to filter the objects in the array with index=idx return from the api fetch and using idx as the key for the components to be displayed at the bottom for showing the meaning
            <Fragment key={idx} >
                <Divider sx={{ display: idx === 0 ? 'none' : 'block', my: 3 }} />
                {def.meanings.map( meaning => 
                    <Box key={Math.random()} sx={{
                        boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
                        backgroundColor: '#fff',
                        p: 2,
                        borderRadius: 2,
                        mt: 3
                    }}>
                        <Typography sx={{ textTransform: 'capitalize' }} color="GrayText" variant="subtitle1">{meaning.partOfSpeech}</Typography>
                        {meaning.definitions.map((definition, idx) => <Typography sx={{ my: 1 }} variant="body2" color="GrayText" key={definition.definition}>{meaning.definitions.length > 1 && `${idx + 1}. `} {definition.definition}</Typography>)}
                    </Box>
                )}
            </Fragment>
        )}
        </>
    )
}

export default Definition