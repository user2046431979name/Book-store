import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/redux";
import { getBookItem, useBooks } from "../../slice/book";
import Modal from "../../components/Modal/Modal";
import { useSettings } from "../../slice/settings";

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const { item: book } = useBooks();
  const { id } = useParams() as { id: string };
  const { list: settings, item: item } = useSettings();

  useEffect(() => {
    dispatch(getBookItem(id));
  }, []);
  const cancel = () => setShowModal(false);
  return (
    <section className="detail">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <img className="item__img" src={book?.image} alt="" />
          </div>
          <div className="col-6">
            <div className="item__content">
              <h2 className="item__content-title">{book?.title}</h2>
              <span className="item__content-line"></span>
              <p className="item__content-author">{book?.author}</p>
              <p className="item__content-text">{book?.description}</p>
              <b className="item__content-price">{book?.price} KGS</b>
              <button
                className="item__content-btn"
                onClick={() => setShowModal(!showModal)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>

        <Modal show={showModal} title={book?.title} onClose={cancel}>
          <div className="modal-body d-flex justify-content-between">
            <h4>
              Что бы купить книгу {book?.title} напишите на этот номер{" "}
              {item?.whatsapp}
            </h4>
          </div>
          <div className="modal-footer">
            <button className="btn btn-danger" onClick={cancel}>
              Закрыть
            </button>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default Details;
