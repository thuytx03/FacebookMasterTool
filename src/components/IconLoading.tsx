import React from 'react';

const IconLoading: React.FC<{ size?: number; speed?: string }> = ({
  size = 50,
  speed = '1.5s',
}) => {
  return (
    <div
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        animation: `spin ${speed} linear infinite`,
      }}
    >
      <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        fill="#000000"
        width={size}
        height={size}
      >
        <g>
          <rect x="232" style={{ fill: '#7AB9E8' }} width="48" height="160" />
          <rect
            x="51.553"
            y="107.545"
            transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 131.5571 317.5824)"
            style={{ fill: '#7AB9E8' }}
            width="159.998"
            height="48"
          />
          <rect y="232" style={{ fill: '#7AB9E8' }} width="160" height="48" />
          <rect
            x="107.558"
            y="300.449"
            transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -44.4344 742.4907)"
            style={{ fill: '#7AB9E8' }}
            width="48"
            height="159.998"
          />
        </g>
        <g>
          <rect x="232" y="352" style={{ fill: '#579ADF' }} width="48" height="160" />
          <rect
            x="300.449"
            y="356.446"
            transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 380.4497 918.4785)"
            style={{ fill: '#579ADF' }}
            width="159.998"
            height="48"
          />
          <rect x="352" y="232" style={{ fill: '#579ADF' }} width="160" height="48" />
          <rect
            x="356.443"
            y="51.54"
            transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 556.4435 493.5648)"
            style={{ fill: '#579ADF' }}
            width="48"
            height="159.998"
          />
        </g>
      </svg>
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default IconLoading;
