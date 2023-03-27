import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchFilteredBooks } from '../../store/filterBooksSlice';
import { setCategory } from '../../store/filterBooksSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FilterbyCategory = () => {
  const categories = useSelector(state => state.filter.varietyOfCategories);
  const dispatch = useDispatch();
  const categoryValue = useSelector(state => state.filter.categoryValue);
  const inputValue = useSelector(state => state.filter.inputValue);
  const sortValue = useSelector(state => state.filter.sortValue);
  const startPagination = useSelector(state => state.filter.startPagination);

  const changeFilterhandler = e => {
    dispatch(setCategory(e.target.value));
  };

  useEffect(() => {
    dispatch(
      fetchFilteredBooks({
        filter: categoryValue,
        search: inputValue,
        sort: sortValue,
        startPagination,
      })
    );
  }, []);

  return (
    <>
      <div className="styledCategoryForm">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-category">Category</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="categories"
            label="Categories"
            value={categoryValue}
            onChange={changeFilterhandler}
          >
            {categories.map((category, index) => (
              <MenuItem value={category} key={index}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </>
  );
};

export default FilterbyCategory;