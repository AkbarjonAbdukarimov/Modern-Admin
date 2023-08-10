const navLinks: Array<NavLink> = [
  { name: "Products", to: "/" },
  { name: "Categories", to: "/categories" },
  { name: "Properties", to: "/props" },
];
export type NavLink = { name: string; to: string };
export default navLinks;
