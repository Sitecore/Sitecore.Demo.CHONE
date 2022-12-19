import { FC, useMemo } from 'react';

interface Props {
  header?: string | (() => JSX.Element);
  text?: string | (() => JSX.Element);
}

const DefaultHeader = () => <h1>Not Found &#129300;!</h1>;
const DefaultText = () => (
  <p>We could not find what you are looking for. Are you sure the URL is valid?</p>
);

const NotFound404: FC<Props> = ({ header, text }) => {
  const headerComponent = useMemo(() => {
    if (typeof header === 'string') {
      return <h1>{header}</h1>;
    }

    if (typeof header === 'function') {
      return header();
    }

    return DefaultHeader();
  }, [header]);

  const textComponent = useMemo(() => {
    if (typeof text === 'string') {
      return <p>{text}</p>;
    }

    if (typeof text === 'function') {
      return text();
    }

    return DefaultText();
  }, [text]);

  return (
    <div className="error-container container">
      <section className="error-header">{headerComponent}</section>
      <section className="error-description">{textComponent}</section>
    </div>
  );
};

export default NotFound404;
