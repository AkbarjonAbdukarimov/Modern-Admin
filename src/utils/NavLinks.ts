const navLinks: Array<NavLink> = [
  { name: "Products", to: "/" },
  { name: "Admins", to: "/admins" },
  { name: "Categories", to: "/categories" },
  { name: "Vendors", to: "/vendors" },
  { name: "Properties", to: "/props" },
];
export type NavLink = { name: string; to: string };
export default navLinks;
