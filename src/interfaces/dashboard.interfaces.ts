import type { SvgIconComponent } from "@mui/icons-material";

export interface StatsCardProps {
  title: string;
  value: number;
  icon: SvgIconComponent;
  color: string;
  bgColor: string;
}

export interface SidebarProps {
  drawerOpen: boolean;
  toggleDrawer: () => void;
}

export interface NavItem {
  label: string;
  icon: SvgIconComponent;
  path: string;
}
