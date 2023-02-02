import { useQuery } from '@tanstack/react-query';
import { getMissingDogListOfUser } from 'apis/api/report';
import React from 'react';
import styles from './MissingDogList.module.scss';
import MissingDogItem from '../Items/MissingDogItem';

export default function MissingDog() {
  const { data, isLoading } = useQuery({
    queryKey: ['myMissingDogList'],
    queryFn: () => getMissingDogListOfUser(1),
  });

  if (isLoading) return;

  return (
    <div className={styles.container}>
      {data.map(item => (
        <MissingDogItem key={item.missingId} item={item} />
      ))}
    </div>
  );
}