import type { IconType } from "react-icons";
import {
  FaBolt,
  FaDumbbell,
  FaGamepad,
  FaInstagram,
  FaLifeRing,
  FaLink,
  FaPlane,
  FaProjectDiagram,
  FaRobot,
  FaShoppingBag,
  FaShoppingCart,
  FaTooth,
} from "react-icons/fa";
import type { ProjectIconKey } from "@/lib/data";

export const projectIcons: Record<ProjectIconKey, IconType> = {
  store: FaShoppingCart,
  bot: FaRobot,
  instagram: FaInstagram,
  agents: FaProjectDiagram,
  fitness: FaDumbbell,
  gaming: FaGamepad,
  chain: FaLink,
  affiliate: FaShoppingBag,
  help: FaLifeRing,
  landing: FaBolt,
  dental: FaTooth,
  travel: FaPlane,
};
