export default function LoadingDots() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid">
      <g transform="translate(25 50)">
        <circle cx="0" cy="0" r="9" fill="#ffffff">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.37037037037037035s"
            calcMode="spline"
            keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
            values="0;1;0"
            keyTimes="0;0.5;1"
            dur="1.1111111111111112s"
            repeatCount="indefinite"></animateTransform>
        </circle>
      </g>
      <g transform="translate(50 50)">
        <circle cx="0" cy="0" r="9" fill="#ffffff">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="-0.18518518518518517s"
            calcMode="spline"
            keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
            values="0;1;0"
            keyTimes="0;0.5;1"
            dur="1.1111111111111112s"
            repeatCount="indefinite"></animateTransform>
        </circle>
      </g>
      <g transform="translate(75 50)">
        <circle cx="0" cy="0" r="9" fill="#ffffff">
          <animateTransform
            attributeName="transform"
            type="scale"
            begin="0s"
            calcMode="spline"
            keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
            values="0;1;0"
            keyTimes="0;0.5;1"
            dur="1.1111111111111112s"
            repeatCount="indefinite"></animateTransform>
        </circle>
      </g>
    </svg>
  );
}
