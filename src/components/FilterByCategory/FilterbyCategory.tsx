import { useAppDispatch, useAppSelector } from 'hook';
import { setCategory } from 'store/filterBooksSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const FilterbyCategory = () => {
  const categories = useAppSelector(state => state.filter.varietyOfCategories);
  const dispatch = useAppDispatch();
  const categoryValue = useAppSelector(state => state.filter.categoryValue);

  const changeFilterhandler = (e: SelectChangeEvent<string>) => {
    dispatch(setCategory(e.target.value)); 
  };


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
