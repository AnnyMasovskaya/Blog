import React from "react";
import { ReactComponent as Bookmark } from "./icons/bookmark.svg";
import { ReactComponent as More } from "./icons/more.svg";
import { ReactComponent as ThumbsDown } from "./icons/thumbsDown.svg";
import { ReactComponent as ThumbsUp } from "./icons/thumbsUp.svg";

const icons = {
  bookmark: Bookmark,
  more: More,
  thumbsDown: ThumbsDown,
  thumbsUp: ThumbsUp,
};

export type IconType = keyof typeof icons;

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  type: IconType;
}

const Icon: React.FC<IconProps> = ({ type, ...props }) => {
  const Element = icons[type];
  return <Element {...props} />;
};

export default Icon;
