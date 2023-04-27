import React from 'react';
import {
  ThemeProvider,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  createTheme,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from 'hook';
import { useNavigate } from 'react-router-dom';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import { fetchBookDetails } from 'store/detailsSlice';
import { removeFromFavourites } from 'store/favouritesSlice';
const FavouritesBooks = () => {
  const theme = createTheme({
    typography: {
      fontFamily: 'Montserrat',
      fontSize: 16,
    },
  });

  const favorites = useAppSelector(state => state.favourites.favouritesBooks);
  const status = useAppSelector(state => state.filter.status);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpen = async (id: string) => {
    await dispatch(fetchBookDetails(id));
    navigate('/detailspage');
  };

  const handleRemoveFavorites = (id: string) => {
    dispatch(removeFromFavourites(id));
  };

  // const uniqueBooks = new Set(favorites);

  // const uniksBooks = [...uniqueBooks];
  console.log({ favorites });
  return (
    <div>
      {favorites ? (
        <div className="wrapper">
          <div className="counter">Found {favorites.length} results</div>
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
              {favorites.map(item => (
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
                      <div onClick={() => handleRemoveFavorites(item.id)}>
                        <FavoriteTwoToneIcon />
                      </div>
                      <div onClick={() => handleOpen(item.id)}>
                        {item.volumeInfo?.imageLinks ? (
                          <CardMedia
                            component="img"
                            src={item.volumeInfo?.imageLinks.thumbnail}
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
                            src={
                              process.env.PUBLIC_URL + '/public/imgs/sorry.png'
                            }
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
                            {item.volumeInfo?.title}
                          </Typography>
                          <Typography color="text.secondary">
                            {item.volumeInfo?.authors}
                          </Typography>
                        </CardContent>
                      </div>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </ThemeProvider>
        </>
      )}
    </div>
  );
};

export default FavouritesBooks;
