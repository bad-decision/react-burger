import { Link } from 'react-router-dom';

function NoFoundPage() {
  return (
    <>
      <p>Мне очень жаль, но ничего не найдено и даже не стилизовано </p>
      <Link to="/">На главную</Link>
    </>
  );
}

export default NoFoundPage;
