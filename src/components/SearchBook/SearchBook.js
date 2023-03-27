import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchFilteredBooks } from '../../store/filterBooksSlice';
import { useTransition } from 'react';
import { setInput } from '../../store/filterBooksSlice';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import './styledSearchContainer.css'
const Searchbook = () => {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const inputValue = useSelector(state => state.filter.inputValue);
  const categoryValue = useSelector(state => state.filter.categoryValue);
  const sortValue = useSelector(state => state.filter.sortValue);
  const startPagination = useSelector(state => state.filter.startPagination);
  const changeHandler = e => {
    dispatch(setInput(e.target.value));
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      startTransition(() => {
        dispatch(
          fetchFilteredBooks({
            search: inputValue,
            filter: categoryValue,
            sort: sortValue,
            startPagination,
          })
        );
      });
    }
  };

  const clickHandler = e => {
    e.preventDefault();
    startTransition(() => {
      dispatch(
        fetchFilteredBooks({
          search: inputValue,
          filter: categoryValue,
          sort: sortValue,
          startPagination,
        })
      );
    });
  };
  
  return (
    <div className="styledSearchContainer">
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          maxWidth: "320px",
         
         
        }}
      >
        <InputBase
          placeholder="Find Your Book"
          inputProps={{ 'aria-label': 'search google books' }}
          value={inputValue}
          type="text"
          onChange={changeHandler}
          onKeyDown={e => handleKeyDown(e)}
          autoFocus={true}
        />
        <IconButton
          type="button"
          sx={{ p: '10px', textAlign:'end' }}
          aria-label="search"
          onClick={clickHandler}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
};

export default Searchbook;
