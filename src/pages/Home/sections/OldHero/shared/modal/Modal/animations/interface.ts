export interface UseAnimation {
  (options: {
    id: string;
    groupId: string;
    wrapperElement: React.RefObject<null | HTMLElement>;
    openDuration: number;
    closeDuration: number;
  }): {
    visible: boolean;
  };
}
