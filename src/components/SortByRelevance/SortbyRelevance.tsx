import { useAppSelector, useAppDispatch } from 'hook';
import { setSort } from 'store/filterBooksSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material';

const SortbyRelevance = () => {
  const sorting = useAppSelector(state => state.filter.sortBy);
  const dispatch = useAppDispatch();
  const sortValue = useAppSelector(state => state.filter.sortValue);

  const changeSorthandler = (e: SelectChangeEvent<string>) => {
    dispatch(setSort(e.target.value));
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
