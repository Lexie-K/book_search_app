import { useAppDispatch, useAppSelector } from 'hook';
import { useNavigate } from 'react-router-dom';
import { setReset } from 'store/detailsSlice';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import {
  Typography,
  CardMedia,
  createTheme,
  ThemeProvider,
} from '@mui/material';

import './StyledBooksDetails.css';

const BookDetails = () => {
  const theme = createTheme({
    typography: {
      fontFamily: 'Montserrat',
      fontSize: 16,
    },
  });
  const sorry = require('../../images/sorry.png');
  const { currentbook } = useAppSelector(({ details }) => details);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setReset());
    navigate('/');
  };
  return (
    <>
      <div>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              minHeight: '100vh',
            }}
          >
            <div onClick={handleClose} className="closeBtnModal">
              <CloseIcon fontSize="small" />
            </div>

            <div className="styledBookcontainer">
              {currentbook?.volumeInfo.imageLinks ? (
                <CardMedia
                  sx={{ maxWidth: '320px' }}
                  component="img"
                  src={currentbook?.volumeInfo.imageLinks.thumbnail}
                  alt={currentbook?.volumeInfo.title}
                  className="styledCoverImg"
                />
              ) : (
                <CardMedia
                  sx={{ maxWidth: '320px' }}
                  component="img"
                  src={sorry}
                  alt="sorry, no book cover"
                  className="styledCoverImg"
                />
              )}
              <div className="styledDescriptionContainer">
                {currentbook?.volumeInfo.categories ? (
                  <Typography
                    id="current-categories"
                    className="styledCategory"
                  >
                    {currentbook?.volumeInfo.categories[0]}
                  </Typography>
                ) : null}
                {!currentbook?.volumeInfo.authors
                  ? null
                  : currentbook?.volumeInfo.authors.map(author => (
                      <Typography
                        id="current-author"
                        className="styledAuthors"
                        key="author.author"
                      >
                        {author}
                      </Typography>
                    ))}
                <Typography id="book-title" className="styledBookTitle">
                  {currentbook?.volumeInfo.title}
                </Typography>
                {currentbook?.volumeInfo.subtitle ? (
                  <Typography id="book-subtitle" className="styledBookTitle">
                    {currentbook?.volumeInfo.subtitle}
                  </Typography>
                ) : null}
                {currentbook?.volumeInfo.description ? (
                  <div
                    className="styledBookDescription"
                    dangerouslySetInnerHTML={{
                      __html: currentbook.volumeInfo.description,
                    }}
                  ></div>
                ) : null}
              </div>
            </div>
          </Box>
        </ThemeProvider>
      </div>
    </>
  );
};

export default BookDetails;
