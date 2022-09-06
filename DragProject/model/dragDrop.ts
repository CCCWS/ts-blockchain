export interface DragAble {
  dragStartHandler(e: DragEvent): void;
  dragEndHandler(e: DragEvent): void;
}

export interface DragTarget {
  dragOverHandler(e: DragEvent): void; //드래그가 유효한 타겟임을 알림
  dropHandler(e: DragEvent): void; //드롭시 발생
  dragLeaveHandler(e: DragEvent): void;
}
