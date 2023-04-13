import FilterbyCategory from './FilterByCategory/FilterbyCategory';
import SearchBook from './SearchBook/SearchBook';
import ShowBooks from './ShowBooks/ShowBooks';
import SortbyRelevance from './SortByRelevance/SortbyRelevance';
const Main = () => {
  return (
    <>
      <SearchBook />
      <div className="styledContainer">
        <FilterbyCategory />
        <SortbyRelevance />
      </div>
      <ShowBooks />
    </>
  );
};

export default Main;
