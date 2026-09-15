import {
  Heart,
  Utensils,
  Sparkles,
  Briefcase,
  Cake,
  Camera,
  Handshake,
  Wallet,
  Clock,
} from "lucide-react";

/** Maps the string names used in data files to Lucide components. */
const ICONS = {
  heart: Heart,
  utensils: Utensils,
  sparkles: Sparkles,
  briefcase: Briefcase,
  cake: Cake,
  camera: Camera,
  handshake: Handshake,
  wallet: Wallet,
  clock: Clock,
};

export function Icon({ name, ...props }) {
  const Component = ICONS[name] || Sparkles;
  return <Component {...props} />;
}

export default Icon;
