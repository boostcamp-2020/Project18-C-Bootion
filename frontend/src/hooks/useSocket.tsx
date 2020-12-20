import { useSetRecoilState } from 'recoil';
import { blockMapState, pagesState } from '@/stores';
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
      const { focusOffset: beforeOffset, focusNode } = window.getSelection();
      const length = (focusNode as any)?.length;
      if (length) {
        focusNode.parentElement.blur();
        setTimeout(() => {
          const sel = window.getSelection();
          sel.collapse(
            sel.focusNode,
            beforeOffset < length ? beforeOffset : length,
          );
        });
      }
      setBlockMap(updatedBlockMap);
    });

    pageIO.on('pageUserCount', (count: number) => {
      console.log(`pageUserCount: ${count}`);
    });
  }, []);
};

export default useSocket;
