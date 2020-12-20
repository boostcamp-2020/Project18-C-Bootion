import { useSetRecoilState } from 'recoil';
import { blockMapState, pagesState, focusState } from '@/stores';
import { pageIO, pageListIO } from '@/socket';
import { BlockMap, Page } from '@/schemes';
import { useEffect } from 'react';

const useSocket = () => {
  const setBlockMap = useSetRecoilState(blockMapState);
  const setPages = useSetRecoilState(pagesState);

  useEffect(() => {
    pageListIO.on('PageListUpdate', (pages: Page[]) => {
      console.log(pages);
      setPages(pages);
    });

    pageListIO.on('allUserCount', (count: number) => {
      console.log(`allUserCount: ${count}`);
    });

    pageIO.on('connect', () => {
      console.log('pageIO connect');
    });

    pageIO.on('connect_error', () => {
      setTimeout(() => {
        pageIO.connect();
      }, 1000);
    });

    pageIO.on('disconnect', (reason: any) => {
      console.log(reason);
    });

    pageIO.on('PageUpdate', (updatedBlockMap: BlockMap) => {
      setBlockMap(updatedBlockMap);
    });

    pageIO.on('pageUserCount', (count: number) => {
      console.log(`pageUserCount: ${count}`);
    });
  }, []);
};

export default useSocket;
