import React from "react";
import classNames from "classnames";
type Props = {
  open: boolean;
  setOpen(open: boolean): void;
};
const Sidebar = ({ open, setOpen }: Props) => {
  return (
    <div className="mySidebar">
        <ul >
          <li>links here</li>
          <li>links here</li>
        </ul>
    </div>
  );
};
export default Sidebar;
