import React from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchFilteredBooks,
  setResetInput,
} from '../../store/filterBooksSlice';
import { useTransition } from 'react';
import { setInput } from '../../store/filterBooksSlice';
import { useSelector } from 'react-redux';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import './styledSearchContainer.css';
const Searchbook = () => {
  const [isPending, startTransition] = useTransition();
  const dispatch = useDispatch();
  const inputValue = useSelector(state => state.filter.inputValue);

  const changeHandler = e => {
    e.preventDefault();
    dispatch(setInput(e.target.value));
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();

      startTransition(() => {
        dispatch(fetchFilteredBooks());
      });
      dispatch(setResetInput());
    }
  };

  const clickHandler = e => {
    e.preventDefault();
    startTransition(() => {
      dispatch(fetchFilteredBooks());
    });
    dispatch(setResetInput());
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
