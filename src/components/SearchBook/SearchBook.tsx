import React from 'react';
import { useAppDispatch, useAppSelector } from 'hook';
import { fetchFilteredBooks, setResetPagination, setInput } from 'store/filterBooksSlice';
import { useTransition } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import './styledSearchContainer.css';
const Searchbook = () => {
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();
  const inputValue = useAppSelector(state => state.filter.inputValue);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    dispatch(setInput(e.target.value));
    
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      startTransition(() => {
        dispatch(setResetPagination());
        dispatch(fetchFilteredBooks()); 
      });
      
    }
  };

  const clickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    startTransition(() => {
      dispatch(setResetPagination());
      dispatch(fetchFilteredBooks());
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
          maxWidth: '320px',
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
          sx={{ p: '10px', textAlign: 'end' }}
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