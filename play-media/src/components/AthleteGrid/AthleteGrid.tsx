import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getInitialData, mockFetchData } from '../../helpers/mockPagination';
import { Athlete } from '../../interfaces/athlete';
import { InfiniteScroll } from '../Common/InfiniteScroll';
import { AthleteCard } from './AthleteCard';

export const AthleteGrid = ({
  athletes,
  className,
}: {
  athletes: Athlete[];
  className?: string;
}) => {
  const initialAthletes = useMemo(() => getInitialData(athletes), [athletes]);
  const [displayedAthletes, setDisplayedAthletes] = useState(initialAthletes);

  const fetchData = useCallback(
    () => mockFetchData(athletes, displayedAthletes, setDisplayedAthletes),
    [displayedAthletes, athletes]
  );

  // On filtered athletes change, reset displayed athletes
  //
  useEffect(() => {
    setDisplayedAthletes(getInitialData(athletes));
  }, [athletes]);

  return (
    <InfiniteScroll
      dataLength={displayedAthletes.length}
      fetchData={fetchData}
      hasMore={displayedAthletes.length < athletes.length}
      className={className}
    >
      <section className="athlete-grid">
        {!displayedAthletes?.length && <h2>No athletes to show.</h2>}
        {!!displayedAthletes?.length &&
          displayedAthletes?.map((athlete) => <AthleteCard key={athlete.id} athlete={athlete} />)}
      </section>
    </InfiniteScroll>
  );
};
