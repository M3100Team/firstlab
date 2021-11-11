import Head from 'next/head';
import { useContext, useState } from 'react';
import clsx from 'clsx';

import styles from '../styles/Home.module.scss';

import Layout from '../components/layout';
import InputForm from '../components/inputForm';
import Input from '../components/input';
import Dropdown from '../components/dropdown';

import { titleEnding, dueToTimeConverter } from '../lib/globals';
import GlobalContext from '../lib/context';

function MenuItem(props) {
  return <div className={clsx(styles["menu-item"], props.selected && styles["selected"])} onClick={() => props.onClick()}>
    {props.icon}
    <span>{props.title}</span>
  </div>;
}

function WorkItem(props) {
  return <div className={styles["work-item"]}>
    <h3>{props.title}</h3>
    <div className={styles["work-info-container"]}>
      <div className={styles["info-property-container"]}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M7.001 18C5.34448 18 4.0016 16.6569 4.0016 15V11H3.0018C2.11108 11 1.665 9.92286 2.29484 9.29289L9.29304 2.29289C9.68348 1.90237 10.3165 1.90237 10.707 2.29289L17.7052 9.29289C18.335 9.92286 17.8889 11 16.9982 11H15.9984V15C15.9984 16.6569 14.6555 18 12.999 18H7.001ZM10 4.41454L5.09242 9.32338L5.22529 9.41792C5.69757 9.78375 6.0016 10.3564 6.0016 11V15C6.0016 15.5524 6.44914 16 7.001 16L8 15.999V13C8 12.4477 8.44772 12 9 12H11C11.5523 12 12 12.4477 12 13V15.999L12.999 16C13.5509 16 13.9984 15.5524 13.9984 15V11C13.9984 10.2979 14.3602 9.68023 14.9076 9.32338L10 4.41454Z" fill="#111111" fillOpacity="0.5" />
        </svg>
        <span>{props.type}</span>
      </div>
      <div className={styles["info-property-container"]}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M5 2C5.55228 2 6 2.44772 6 3L5.99984 3.07035C7.17657 2.38961 8.54279 2 10 2C11.4576 2 12.8242 2.38983 14.0012 3.07093L14 3C14 2.44772 14.4477 2 15 2H17C17.5523 2 18 2.44772 18 3V5C18 5.55228 17.5523 6 17 6L16.9297 5.99984C17.6104 7.17657 18 8.54279 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 8.54279 2.38961 7.17657 3.07035 5.99984L3 6C2.44772 6 2 5.55228 2 5V3C2 2.44772 2.44772 2 3 2H5ZM10 4C6.68629 4 4 6.68629 4 10C4 13.3137 6.68629 16 10 16C13.3137 16 16 13.3137 16 10C16 6.68629 13.3137 4 10 4ZM10 6C10.5128 6 10.9355 6.38604 10.9933 6.88338L11 7V9.58579L12.7071 11.2929C13.0976 11.6834 13.0976 12.3166 12.7071 12.7071C12.3466 13.0676 11.7794 13.0953 11.3871 12.7903L11.2929 12.7071L9.29289 10.7071C9.13661 10.5508 9.0374 10.3481 9.00867 10.1314L9 10V7C9 6.44772 9.44772 6 10 6Z" fill="#111111" fillOpacity="0.5" />
        </svg>
        <span>{dueToTimeConverter(props.dueTo)}</span>
      </div>
    </div>
  </div>;
}

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const context = useContext(GlobalContext);

  return <Layout>
    <Head>
      <title>{"Главная страница" + titleEnding}</title>
    </Head>

    {!loggedIn ? <GlobalContext.Consumer>
      {({ setUserData }) => {
        return <><InputForm
          onSubmit={fields => {
            let result = { status: "ok", details: {}, };

            /* field validation */
            if (parseInt(fields.number) < 100000 || parseInt(fields.number) > 999999) {
              result.status = "error";
              result.details = { ...result.details, number: "Некорректный номер", };
            }
            if (fields.password.length < 6) {
              result.status = "error";
              result.details = { ...result.details, password: "Короче 6 символов", };
            }

            if (result.status === "ok") {
              if (fields.number === "334790") {
                setUserData({ login: "Михаил Гуревич", group: "M3100", });
              }
              setLoggedIn(true);
            }

            return result;
          }}
          className={styles["homepage-form"]}
        >
          <Input name="number" title="Номер ИСУ" type="number" className={styles["homepage-input"]} />
          <Input name="password" title="Пароль" type="password" className={styles["homepage-input"]} />
        </InputForm>
        <Dropdown title="Тест" options={["Тест 1", "Тест 2", "Тест 3", "Тест очень очень очень очень очень длинного текста",]} style={{ marginTop: "20px", }} /></>;
      }}
    </GlobalContext.Consumer> :
      <div className={styles["mainpage-content"]}>
        <div className={styles["menu"]}>
          <h2>Линейная алгерба I</h2>
          <button>Выбрать другой курс</button>
          <MenuItem
            onClick={() => setSelectedCategory(0)}
            selected={selectedCategory === 0}
            title="Задания"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M9.5 4.49758L12 5.53108L14.5 4.49758C16.1049 3.83414 17.8951 3.83414 19.5 4.49758L21.3714 5.27121C21.751 5.42816 22 5.80819 22 6.23079V18.4735C22 19.0443 21.5523 19.507 21 19.507C20.8728 19.507 20.7467 19.4819 20.6286 19.4331L19.5 18.9665C17.8951 18.3031 16.1049 18.3031 14.5 18.9665L12 20L9.5 18.9665C7.89515 18.3031 6.10485 18.3031 4.5 18.9665L3.37139 19.4331C2.85861 19.6451 2.27664 19.3873 2.07152 18.8573C2.02428 18.7352 2 18.605 2 18.4735V6.23079C2 5.80819 2.24895 5.42816 2.62861 5.27121L4.5 4.49758C6.10485 3.83414 7.89515 3.83414 9.5 4.49758ZM5.26408 6.34587L4 6.86844V17.0141C6.02542 16.254 8.25753 16.2887 10.2641 17.1182L11 17.422V7.282L8.73592 6.34587C7.62037 5.88471 6.37963 5.88471 5.26408 6.34587ZM15.2641 6.34587L13 7.281V17.422L13.7359 17.1182C15.7425 16.2887 17.9746 16.254 20 17.0141V6.86844L18.7359 6.34587C17.6204 5.88471 16.3796 5.88471 15.2641 6.34587Z" />
            </svg>}
          />
          <MenuItem
            onClick={() => setSelectedCategory(1)}
            selected={selectedCategory === 1}
            title="Успеваемость"
            icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.6129 6.2097L3.70711 6.29289L10 12.585L13.2929 9.29289C13.6534 8.93241 14.2206 8.90468 14.6129 9.2097L14.7071 9.29289L19 13.585L20.2929 12.2929C20.8955 11.6903 21.9072 12.0723 21.994 12.8864L22 13L21.9983 17.0594L21.9893 17.1469L21.9643 17.2658L21.9401 17.3417L21.9063 17.4232L21.854 17.5207L21.7871 17.617L21.7071 17.7071C21.6717 17.7425 21.6343 17.7747 21.5953 17.8037L21.4841 17.8753L21.3713 17.9288L21.266 17.9642L21.1485 17.989L21.0893 17.996L21 18H17C16.1478 18 15.7026 17.0145 16.2168 16.3775L16.2929 16.2929L17.585 15L14 11.415L10.7071 14.7071C10.3466 15.0676 9.77939 15.0953 9.3871 14.7903L9.29289 14.7071L2.29289 7.70711C1.90237 7.31658 1.90237 6.68342 2.29289 6.29289C2.65338 5.93241 3.22061 5.90468 3.6129 6.2097Z" />
            </svg>}
          />
        </div>
        <div className={styles["work-selector"]}>
          <WorkItem
            title="Линейные пространства"
            type="Домашняя работа"
            dueTo={1635368061000}
          />
          <WorkItem
            title="Работа с матрицами и определители"
            type="Домашняя работа"
            dueTo={1635369061000}
          />
          <WorkItem
            title="Обратная матрица. Матричные уравнения."
            type="Домашняя работа"
            dueTo={1635370061000}
          />
        </div>
      </div>
    }
  </Layout>;
}
