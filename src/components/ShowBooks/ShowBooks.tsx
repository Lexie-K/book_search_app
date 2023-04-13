import { useAppSelector, useAppDispatch } from 'hook';
import {
  Card,
  Grid,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchBookDetails } from 'store/detailsSlice';
import { fetchFilteredBooks } from 'store/filterBooksSlice';
import { setResetBooks } from 'store/filterBooksSlice';
import './StyledMainLayout.css';
import { setLoadmore } from 'store/filterBooksSlice';
import HideButton from 'components/HideButton/HideButton';

function ShowBooks() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Montserrat',
      fontSize: 16,
    },
  });

  const sorry = require('../../images/sorry.png');
  const filterResult = useAppSelector(
    state => state.filter.showFilteredCategory
  );
  const books = useAppSelector(state => state.filter.totalItems);
  const status = useAppSelector(state => state.filter.status);
  const showBtn = useAppSelector(state => state.filter.showBtn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpen = async (id: string) => {
    await dispatch(fetchBookDetails(id));
    navigate('/detailspage');
  };
  const handleRedirect = () => {
    dispatch(setResetBooks());
  };

  const handleLoad = async() => {
    dispatch(setLoadmore());
    dispatch(fetchFilteredBooks());
  };

 

  return (
    <div>
      {books ? (
        <div className="wrapper">
          <div className="counter">Found {books} results</div>
        </div>
      ) : undefined}
      {status === 'loading' ? (
        <div className="wrapper">
          <div className="loading">LOADING...</div>
        </div>
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <Grid container rowSpacing={4} columnSpacing={2}>
              {filterResult.map((item) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  lg={2}
                  key={item.id}
                  className="styledBookList"
                >
                  <Card
                    sx={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '0%',
                      background: 'rgba(229, 229, 229, 1)',
                    }}
                  >
                    <CardActionArea>
                      <div onClick={() => handleOpen(item.id)}>
                        {item.volumeInfo.imageLinks ? (
                          <CardMedia
                            component="img"
                            src={item.volumeInfo.imageLinks.thumbnail}
                            alt={item.volumeInfo.title}
                            sx={{
                              maxWidth: '320px',
                              maxHeight: '340px',
                              objectFit: 'contain',
                            }}
                          />
                        ) : (
                          <CardMedia
                            component="img"
                            src={sorry}
                            alt="sorry, no book cover"
                            sx={{
                              maxWidth: '320px',
                              maxHeight: '340px',
                              objectFit: 'contain',
                            }}
                          />
                        )}

                        <CardContent className="styledContent">
                          <Typography color="text.secondary">
                            {item.volumeInfo.categories}
                          </Typography>
                          <Typography gutterBottom component="div">
                            {item.volumeInfo.title}
                          </Typography>
                          <Typography color="text.secondary">
                            {item.volumeInfo.authors}
                          </Typography>
                        </CardContent>
                      </div>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </ThemeProvider>
          {showBtn && (
            <HideButton
              handleLoad={handleLoad}
              handleRedirect={handleRedirect}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ShowBooks;
