import { memo } from "react";

import AddStonePopup from "./AddStonePopup";
import DeleteStonePopup from "./DeleteStonePopup";
import EditStonePopup from "./EditStonePopup";
import LoadingPopup from "./LoadingPopup";

function Popup({ type, ...props }) {
  switch (type) {
    case "AddStone":
      return <AddStonePopup {...props} />;
    case "EditStone":
      return <EditStonePopup {...props} />;
    case "DeleteStone":
      return <DeleteStonePopup {...props} />;
    case "Loading":
      return <LoadingPopup {...props} />;
    default:
      return;
  }
}

export default memo(Popup);
