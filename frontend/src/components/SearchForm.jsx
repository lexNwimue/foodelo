import { useEffect, useState } from "react";
import SearchResult from "./SearchResult";

const SearchForm = () => {
  const [searchResult, setSearchResult] = useState([]); /// For Alert component
  useEffect(() => {
    const sideEffect = async () => {
      let recipes = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=a1da906695e54ef4a3be2c56cf982d63&number=15`
      );
      recipes = await recipes.json();
      console.log(recipes.results);
      setSearchResult(recipes.results);
    };
    sideEffect();
  }, []);

  return <>{searchResult && <SearchResult searchResult={searchResult} />}</>;
};

export default SearchForm;
