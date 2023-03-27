import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
import sorry from '../../images/sorry.png';
import { useDispatch } from 'react-redux';
import { fetchBookDetails } from '../../store/detailsSlice';
import { fetchFilteredBooks } from '../../store/filterBooksSlice';
import { setLoadmore } from '../../store/filterBooksSlice';
import { setResetBooks } from '../../store/filterBooksSlice';
import './StyledMainLayout.css';

function ShowBooks() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Montserrat',
      fontSize: 16,
    },
  });

  const filterResult = useSelector(state => state.filter.showFilteredCategory);

  const books = useSelector(state => state.filter.totalItems);
  const status = useSelector(state => state.filter.status);
  const startPagination = useSelector(state => state.filter.startPagination);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputValue = useSelector(state => state.filter.inputValue);
  const categoryValue = useSelector(state => state.filter.categoryValue);
  const sortValue = useSelector(state => state.filter.sortValue);

  const handleOpen = async id => {
    await dispatch(fetchBookDetails({ id }));
    navigate('/detailspage');
  };
  const handleRedirect = () => {
    dispatch(setResetBooks());
  };

  useEffect(() => {
    dispatch(
      fetchFilteredBooks({
        startPagination,
        filter: categoryValue,
        search: inputValue,
        sort: sortValue,
      })
    );
  }, [startPagination, categoryValue, sortValue]);

  const handleLoad = () => {
    dispatch(setLoadmore(startPagination));
  };

  return (
    <div>
      <div className="wrapper">
        <div className="counter">Found {books} results</div>
      </div>

      {status === 'loading' ? (
        <div className="wrapper">
          <div className="loading">LOADING...</div>
        </div>
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <Grid container rowSpacing={4} columnSpacing={2}>
              {filterResult.map(item => (
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
                            {item.volumeInfo?.categories}
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
          {Object.keys(filterResult).length === 30 ? (
            <div className="wrapper">
              <button className="btnLoad" onClick={handleLoad}>
                Load More
              </button>
            </div>
          ) : (
            <div className="wrapper">
              <button className="btnDetails" onClick={() => handleRedirect()}>
                Back to Search
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ShowBooks;