export interface File {
  name: string;
  type: string;
  size: string;
  uploadedDateShort: string;
  uploadedDateLong: string;
  path: string;
  isFolder: boolean;
  isVideo: boolean;
  uuid: string;
}

export interface ListItemRef {
  current: HTMLElement | null;
}
