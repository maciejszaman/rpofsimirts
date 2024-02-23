import * as SharedTypes from "../../shared/SharedTypes.types";

export interface ViewerProps {
  fileRefs: (React.RefObject<HTMLDivElement> | null)[];
  setFileRefs: React.Dispatch<
    React.SetStateAction<(React.RefObject<HTMLDivElement> | null)[]>
  >;
}
