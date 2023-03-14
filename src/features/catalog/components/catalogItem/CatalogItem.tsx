import { NavLink } from "react-router-dom";
import s from "./catalog-item.module.css";
import { Button, Card } from "antd";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../hooks/useAppDispatchSelector";
import { IBook } from "../../../../model/IBook";
import { FC, useCallback, useMemo } from "react";
import { addToCart } from "../../../cart/cartSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { cartSelector, cartSelectorMemo } from "../../../cart/cartSelector";

type CatalogItemProps = {
  book: IBook;
};

const CatalogItem: FC<CatalogItemProps> = ({ book }) => {
  //const bookMemo = useMemo(() => book, [book.id]);
  const { id, title, thumbnailUrl } = book;
  const dispatch = useAppDispatch();
  //const { cart } = useAppSelector(cartSelectorMemo);
  console.log("Catalog item render");

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(book));
  }, []);

  return (
    <article className={s.catalogItem}>
      <NavLink to={`${id}`}>
        <Card
          loading={false}
          hoverable
          cover={<img src={thumbnailUrl} alt={title} />}
        >
          <Card.Meta title={title} description="description" />
        </Card>
      </NavLink>
      <Button type="primary" onClick={handleAddToCart}>
        Add to cart
      </Button>
    </article>
  );
};

const customComparator = (prevProps: any, nextProps: any) => {
  return true;
};
export default CatalogItem;
