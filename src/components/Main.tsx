import { Link } from 'react-router-dom';
import FilterbyCategory from './FilterByCategory/FilterbyCategory';
import LoginBtn from './Login/LoginBtn';
import LogOut from './Logout/LogOut';
import SearchBook from './SearchBook/SearchBook';
import ShowBooks from './ShowBooks/ShowBooks';
import SortbyRelevance from './SortByRelevance/SortbyRelevance';
import {useAuth} from 'hooks/useAuth';


const Main = () => {
  const { isAuth } = useAuth();


  return (
    <>
      <div className="styledMainContainer">
        <div className="styledSearchPosition">
          <SearchBook />
        </div>
        {isAuth ? (<LogOut/> ): (<LoginBtn />)}
       
      </div>

      <div className="styledContainer">
        <FilterbyCategory />
        <Link to='/favourites'>Favorites💜</Link>
        <SortbyRelevance />
      </div>
      <ShowBooks />
    </>
  );
};

export default Main;
