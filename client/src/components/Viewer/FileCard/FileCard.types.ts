import * as SharedTypes from "../../../shared/SharedTypes.types";

export interface FileCardProps {
  file: SharedTypes.File;
  /*   setFilesLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFiles: React.Dispatch<React.SetStateAction<SharedTypes.File[][]>>;
  setFailedLoading: React.Dispatch<React.SetStateAction<boolean>>; */
  filesLoading: boolean;
  index: number;
}
