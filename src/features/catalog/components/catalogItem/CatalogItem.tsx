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

type CatalogItemProps = {
  book: IBook;
};

const CatalogItem: FC<CatalogItemProps> = ({ book }) => {
  const bookMemo = useMemo(() => book, [book.id]);
  const { id, title, thumbnailUrl } = bookMemo;
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  console.log("Catalog item render");

  const handleAddToCart = useCallback(() => {
    dispatch(addToCart(bookMemo));
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
  return false;
};
export default React.memo(CatalogItem, customComparator);
