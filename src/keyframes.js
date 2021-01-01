import { keyframes } from 'styled-components';

export const slide = {
    in: (direction = 'X', to = '0%', from = '100%') => keyframes`
        0% {
            transform: translate${direction.toUpperCase()}(${from});
        }
        100% {
            transform: translate${direction.toUpperCase()}(${to});
        }
    `,
    out: (direction = 'X', to = '100%', from = '0%') => keyframes`
        0% {
            transform:  translate${direction.toUpperCase()}(${from});
        }
        100% {
            transform:  translate${direction.toUpperCase()}(${to});
        }
    `,
};

export const fade = {
    in: (to = 1, from = 0) => keyframes`
        0% {
            opacity: ${from};
        }
        100% {
            opacity: ${to};
        }
    `,
    out: (to = 0, from = 1) => keyframes`
        0% {
            opacity: ${from};
        }
        100% {
            opacity: ${to};
        }
    `,
};
