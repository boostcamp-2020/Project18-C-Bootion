import { useSetRecoilState } from 'recoil';
import { blockMapState, pagesState } from '@/stores';
import { pageIO, pageListIO } from '@/socket';
import { BlockMap, Page } from '@/schemes';
import { useEffect } from 'react';
import { pageUserCountState, lastUpdateState, pageState } from '@/stores/page';

const doSomeThing = () => {};

const useSocket = () => {
  const setBlockMap = useSetRecoilState(blockMapState);
  const setPages = useSetRecoilState(pagesState);
  const setPageUserCount = useSetRecoilState(pageUserCountState);
  const setLastUpdate = useSetRecoilState(lastUpdateState);
  const setPage = useSetRecoilState(pageState);

  useEffect(() => {
    pageListIO.on(
      'PageListUpdate',
      ({ currentPageId, pages }: { currentPageId: string; pages: Page[] }) => {
        setPages(pages);
        const currentPage = pages.find((page) => page.id === currentPageId);
        if (currentPage) {
          setPage(currentPage);
        } else if (pages?.[0]) {
          setPage(pages?.[0]);
        }
      },
    );

    pageListIO.on('allUserCount', (count: number) => {
      console.log(`allUserCount: ${count}`);
    });

    pageIO.on('connect_error', () => {
      setTimeout(() => {
        pageIO.connect();
      }, 1000);
    });

    pageIO.on('PageUpdate', (updatedBlockMap: BlockMap) => {
      const { focusOffset: beforeOffset, focusNode } = window.getSelection();
      const beforeLength = (focusNode as any)?.length;
      if (beforeLength) {
        focusNode.parentElement.blur();
        setTimeout(() => {
          try {
            const sel = window.getSelection();
            const afterLength = (focusNode as any)?.length;
            if (
              focusNode !== sel.focusNode ||
              beforeOffset !== sel.focusOffset
            ) {
              sel.collapse(
                sel.focusNode,
                beforeOffset < afterLength ? beforeOffset : afterLength,
              );
            }
          } catch (e: any) {
            doSomeThing();
          }
        });
      }
      setLastUpdate(new Date());
      setBlockMap(updatedBlockMap);
    });

    pageIO.on('pageUserCount', (count: number) => {
      setPageUserCount(count);
    });
  }, []);
};

export default useSocket;
