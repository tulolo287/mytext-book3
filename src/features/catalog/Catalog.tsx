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
import { loadingOff, loadingOn, setCatalog } from "./catalogSlice";
import { addToCart } from "../cart/cartSlice";
import React from "react";

export default function Catalog() {
  const { isLoading, catalog } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const catalogMemo = useMemo(() => catalog, [catalog.length]);
  console.log("Catalog render");

  const fetch2 = useCallback(async () => {
    dispatch(loadingOn());
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/photos?_limit=10"
    );
    const data = await res.json();
    dispatch(setCatalog(data));
    dispatch(loadingOff());
  }, []);

  useEffect(() => {
    fetch2();
  }, [fetch2]);

  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = 10;
  const itemsPerPage = 3;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getCurrentPage = (currentPage: number) => setCurrentPage(currentPage);

  const endSector = currentPage * itemsPerPage;
  const startSector = endSector - itemsPerPage;
  const booksPerPage = useMemo(
    () => catalogMemo.slice(startSector, endSector),
    [startSector, endSector]
  );

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
