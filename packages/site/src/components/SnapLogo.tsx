export const SnapLogo = ({
  color,
  size,
}: {
  color?: string | undefined;
  size: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 256 256"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M64 176 L106 80 H150 L192 176 H160 L146 144 H110 L96 176 Z"
      fill={color ?? 'currentColor'}
    />
    <rect
      x="78"
      y="190"
      width="100"
      height="10"
      rx="5"
      fill={color ?? 'currentColor'}
      opacity="0.9"
    />
  </svg>
);
