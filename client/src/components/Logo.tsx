import { ReactSVG } from "react-svg";

export default function Logo() {
  return (
    <ReactSVG
      src="./logo.svg"
      beforeInjection={(svg) => {
        svg.classList.add('h-10', 'w-auto'); // <- Höhe fixieren!
      }}
      className="flex items-center"
    />
  );
}
