import { FC, PropsWithChildren, ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import InfiniteScrollComponent from 'react-infinite-scroll-component';
import { Loader } from './Loader';

interface Props {
  children: PropsWithChildren<ReactNode[] | ReactNode>;
  className?: string;
  dataLength: number;
  fetchData: () => void;
  hasMore: boolean;
  loader?: ReactNode;
}

export const InfiniteScroll: FC<Props> = ({
  children,
  className,
  dataLength,
  fetchData,
  hasMore,
  loader = <Loader />,
}) => {
  const classes = useMemo(() => clsx(className, 'infinite-scroll'), [className]);

  return (
    <InfiniteScrollComponent
      className={classes}
      dataLength={dataLength}
      next={fetchData}
      hasMore={hasMore}
      loader={loader}
    >
      {children}
    </InfiniteScrollComponent>
  );
};
