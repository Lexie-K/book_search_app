import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSort } from '../../store/filterBooksSlice';
import { fetchFilteredBooks } from '../../store/filterBooksSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SortbyRelevance = () => {
  const sorting = useSelector(state => state.filter.sortBy);
  const dispatch = useDispatch();
  const sortValue = useSelector(state => state.filter.sortValue);

  const changeSorthandler = e => {
    dispatch(setSort(e.target.value));
    dispatch(fetchFilteredBooks());
  };

  return (
    <>
      <div className="styledCategoryForm">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-category">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="sorting"
            label="SortBy"
            value={sortValue}
            onChange={changeSorthandler}
          >
            {sorting.map((sort, index) => (
              <MenuItem value={sort} key={index}>
                {sort}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default SortbyRelevance;
