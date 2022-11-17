import create from 'zustand';

export type game = {
  blocksCount: number;
  phase: 'ready' | 'playing' | 'ended';
  start: () => void;
  restart: () => void;
  end: () => void;
};

export const useGame = create<game>(set => {
  return {
    blocksCount: 3,
    phase: 'ready',
    start: () => {
      set(() => {
        return {
          phase: 'playing',
        };
      });
    },
    restart: () => {
      set(() => {
        return {
          phase: 'ready',
        };
      });
    },
    end: () => {
      set(() => {
        return {
          phase: 'ended',
        };
      });
    },
  };
});
