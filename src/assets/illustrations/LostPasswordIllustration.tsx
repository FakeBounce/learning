import { Box } from '@mui/material';
import { memo } from 'react';

function LostPasswordIllustration({ ...other }) {
  return (
    <Box {...other}>
      <svg id="ic_password" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 96 96">
        <defs>
          <filter id="Path">
            <feOffset dx="-2" dy="-2" />
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feFlood floodOpacity="0.4" result="color" />
            <feComposite operator="out" in="SourceGraphic" in2="blur" />
            <feComposite operator="in" in="color" />
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
          <filter id="Shape">
            <feOffset dx="-2" dy="-2" />
            <feGaussianBlur stdDeviation="2" result="blur-2" />
            <feFlood floodOpacity="0.4" result="color-2" />
            <feComposite operator="out" in="SourceGraphic" in2="blur-2" />
            <feComposite operator="in" in="color-2" />
            <feComposite operator="in" in2="SourceGraphic" />
          </filter>
        </defs>
        <rect id="mask" width="96" height="96" fill="none" />
        <path id="Path-2" data-name="Path"
              d="M9.606,21.391v7.76A4.8,4.8,0,0,1,0,29.15v-7.76A21.416,21.416,0,0,1,21.037,0l.353,0A21.415,21.415,0,0,1,42.778,21.037l0,.353v7.76a4.8,4.8,0,0,1-9.606,0v-7.76A11.8,11.8,0,0,0,21.585,9.608l-.195,0A11.8,11.8,0,0,0,9.606,21.391Z"
              transform="translate(26.718 8)" fill="#ffd666" />
        <g id="Path-3" data-name="Path" style={{ mixBlendMode: 'overlay', isolation: 'isolate'}}>
          <path id="Path-4" data-name="Path"
                d="M9.606,21.391V33.953H0V21.391A21.416,21.416,0,0,1,21.037,0l.353,0A21.415,21.415,0,0,1,42.778,21.037l0,.353V33.953H33.175V21.391A11.8,11.8,0,0,0,21.585,9.608l-.195,0A11.8,11.8,0,0,0,9.606,21.391Z"
                transform="translate(26.718 8)" fill="rgba(255,255,255,0.04)" />
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path)">
            <path id="Path-5" data-name="Path"
                  d="M9.606,21.391V33.953H0V21.391A21.416,21.416,0,0,1,21.037,0l.353,0A21.415,21.415,0,0,1,42.778,21.037l0,.353V33.953H33.175V21.391A11.8,11.8,0,0,0,21.585,9.608l-.195,0A11.8,11.8,0,0,0,9.606,21.391Z"
                  transform="translate(26.72 8)" fill="#fff" />
          </g>
        </g>
        <path id="Shape-2" data-name="Shape"
              d="M19.877,48.4A19.877,19.877,0,0,1,0,28.527V8.276A8.276,8.276,0,0,1,8.277,0H53.94a8.276,8.276,0,0,1,8.277,8.276V28.527A19.877,19.877,0,0,1,42.34,48.4Z"
              transform="translate(17 39.6)" fill="#00ab55" />
        <g id="Shape-3" data-name="Shape" style={{ mixBlendMode: 'overlay', isolation: 'isolate'}}>
          <path id="Shape-4" data-name="Shape"
                d="M19.877,48.4A19.877,19.877,0,0,1,0,28.527V8.276A8.276,8.276,0,0,1,8.277,0H53.94a8.276,8.276,0,0,1,8.277,8.276V28.527A19.877,19.877,0,0,1,42.34,48.4Z"
                transform="translate(17 39.6)" fill="rgba(255,255,255,0.04)" />
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Shape)">
            <path id="Shape-5" data-name="Shape"
                  d="M19.877,48.4A19.877,19.877,0,0,1,0,28.527V8.276A8.276,8.276,0,0,1,8.277,0H53.94a8.276,8.276,0,0,1,8.277,8.276V28.527A19.877,19.877,0,0,1,42.34,48.4Z"
                  transform="translate(17 39.6)" fill="#fff" />
          </g>
        </g>
        <path id="Shape-6" data-name="Shape"
              d="M9.858,32.522h0a3.606,3.606,0,1,1,.063,0H9.857Zm1.39-9.6H9.857a3.6,3.6,0,0,1-3.6-3.6V15.607a2.926,2.926,0,0,1,2.922-2.922h.752a2.706,2.706,0,0,0,1.807-.746l.059-.058.049-.05A2.733,2.733,0,0,0,12.6,9.792,2.783,2.783,0,0,0,9.914,7.2l-.057,0-.07,0-.062,0-.062,0-.128.012-.067.009-.058.008-.058.01c-.041.007-.08.015-.12.024-.076.017-.154.039-.232.064l-.059.02c-.046.016-.091.033-.136.051l-.087.038.021-.01c-.044.02-.09.041-.158.076l-.047.025-.03.016-.049.028L8.413,7.6l-.061.039-.07.047a2.657,2.657,0,0,0-.313.254,2.714,2.714,0,0,0-.621.875l-.028.064c-.011.026-.021.052-.031.078l-.021.057a2.809,2.809,0,0,0-.132.54.008.008,0,0,1-.009.009H.923a.938.938,0,0,1-.706-.315.86.86,0,0,1-.21-.687A9.856,9.856,0,0,1,3.451,2.412,9.974,9.974,0,0,1,9.855,0h.2a9.973,9.973,0,0,1,9.724,9.418,9.906,9.906,0,0,1-4.969,9.136,2.56,2.56,0,0,0-1.359,2.157A2.209,2.209,0,0,1,11.248,22.918Z"
              transform="translate(38.252 47.529)" fill="#fff" />
      </svg>
    </Box>
  )
}

export default memo(LostPasswordIllustration);