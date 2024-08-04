import React, { useState } from 'react';
import HomeSearch from '../../components/ui/HomeSearch';

const HomeScreen = () => {
  const [page, setPage] = useState(1);

  console.log(page);

  return (
    <div className='w-full flex flex-col items-center h-full bg-slate-100'>
      <HomeSearch />
    </div>
  );
};

export default HomeScreen;