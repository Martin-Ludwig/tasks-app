
interface CircleProps {
    color: string;
    size: number;
    x: number;
    y: number;
}

export default function Circle({color, size, x, y}: CircleProps) {
    return (
    <div
      className={`absolute rounded-full backdrop-blur-lg ${color}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${y}px`,
        left: `${x}px`,
        zIndex: 21,
      }}
    ></div>
    )
} 

export {Circle};