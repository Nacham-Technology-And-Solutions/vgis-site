/** Leadership from the Company Profile. Add `photo` only with real, approved photographs. */
export type Person = {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: string;
};

export const leadership: Person[] = [
  {
    id: "precious-chikezie",
    name: "Precious Ebubechukwu Chikezie",
    role: "Director / CEO",
    bio: "Combines high-end 3D visualisation expertise with full-stack technical architecture to lead VGIS's digital and visual deployments.",
  },
  {
    id: "joshua-nwambe",
    name: "Joshua John Nwambe",
    role: "3D Artist & Creative Director",
    bio: "More than a decade of experience turning blueprints and designs into photorealistic, immersive 3D environments.",
  },
  {
    id: "henry-ugbogu",
    name: "Henry Chijioke Ugbogu",
    role: "Creative Director, 2D",
    bio: "More than 10 years in the industry, leading all branding, illustration and 2D visual marketing.",
  },
  {
    id: "glory-chikezie",
    name: "Glory Uchechukwu Chikezie",
    role: "Secretary",
    bio: "Oversees operations and administration, with a professional background in photography and a sharp eye for visual standards.",
  },
];
