import { Suspense } from "react";
import SearchedProducts from "../components/products/searchedProducts";

function Search() {
  return (
    <Suspense>
      <SearchedProducts />
    </Suspense>
  );
}
export default Search;
