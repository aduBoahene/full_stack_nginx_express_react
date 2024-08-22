import {
  Banknote,
  BarChart3,
  Briefcase,
  Coins,
  CreditCard,
  HandCoinsIcon,
  Landmark,
  LayoutDashboard,
  LineChart,
  LucideIcon,
  Megaphone,
  PiggyBank,
  Shield,
  Speech,
  Users2,
  WalletCards,
} from "lucide-react";

type Sublink = {
  name: string;
  path: string;
};

export type MenuItem = {
  name: string;
  icon: LucideIcon;
  path: string;
  sublinks?: Sublink[];
};

export const menus: MenuItem[] = [
  // {
  //   name: "Overview",
  //   icon: BarChart3,
  //   path: "/insurance",
  // },
  {
    name: "Students",
    icon: Users2,
    path: "/insurance/school",
  },
  {
    name: "Departments",
    icon: WalletCards,
    path: "/#",
  },
  {
    name: "Settings",
    icon: HandCoinsIcon,
    path: "#",
  },
];
