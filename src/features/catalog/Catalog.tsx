import CatalogItem from "./components/catalogItem/CatalogItem";
import s from "./catalog.module.css";
import { useSelector } from "react-redux";

import Paginator from "../../components/Paginator";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import Spinner from "../../components/Spinner";
import { Pagination } from "antd";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/useAppDispatchSelector";
import {
  loadingOff,
  loadingOn,
  setCatalog,
  fetchCatalog,
} from "./catalogSlice";
import { addToCart } from "../cart/cartSlice";
import React from "react";

export default function Catalog() {
  const { isLoading, catalog } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  //const catalogMemo = useMemo(() => catalog, [catalog.length]);
  // console.log("Catalog render");

  useEffect(() => {
    dispatch(fetchCatalog());
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = 10;
  const itemsPerPage = 3;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getCurrentPage = (currentPage: number) => setCurrentPage(currentPage);

  const endSector = currentPage * itemsPerPage;
  const startSector = endSector - itemsPerPage;
  const booksPerPage = catalog.slice(startSector, endSector);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <section className={s.catalog}>
          {booksPerPage.map((book) => (
            <CatalogItem key={book.id} book={book} />
          ))}

          <Paginator totalPages={totalPages} getCurrentPage={getCurrentPage} />
        </section>
      )}
    </>
  );
}
