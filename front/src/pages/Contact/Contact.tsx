import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../app/redux";
import { sendQuestion } from "../../slice/Lead";
import { getSettingsObject, useSettings } from "../../slice/settings";
import { Lead } from "../../type";

const Contact = () => {
  const dispatch = useAppDispatch();
  const { list: settings, item: item } = useSettings();
  useEffect(() => {
    dispatch(getSettingsObject());
  }, []);
  const [state, setState] = useState<Lead>({
    name: "",
    number: "",
    text: "",
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (Object.values(state).some((value) => value.trim() === "")) {
      return;
    }

    dispatch(sendQuestion(state));

    setState({
      name: "",
      number: "",
      text: "",
    });
  };
  return (
    <section className="contact">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="contact__content">
              <h3 className="contact__content-title">КОНТАКТЫ</h3>
              <p className="contact__content-text">Адрес:</p>
              <p className="contact__content-address">{item?.address}</p>
              <p className="contact__content-text">Телефон / факс:</p>
              <b className="contact__content-number">{item?.numberAdmin}</b>
              <p className="contact__content-text">Режим работы:</p>
              <p className="contact__content-address">{item?.duty}</p>
            </div>
          </div>
          <div className="col-6">
            <form onSubmit={onSubmit} action="" className="contact__form">
              <h3 className="contact__form-title">Появились вопросы?</h3>
              <input
                type="text"
                placeholder="Имя"
                className="contact__form-input"
                name="name"
                onChange={onChange}
                value={state.name}
              />
              <input
                type="text"
                placeholder="Телефон"
                className="contact__form-input"
                name="number"
                onChange={onChange}
                value={state.number}
              />
              <input
                type="text"
                placeholder="Ваш вопрос"
                className="contact__form-input"
                name="text"
                onChange={onChange}
                value={state.text}
              />
              <button
                onSubmit={onSubmit}
                type="submit"
                className="contact__form-btn"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
