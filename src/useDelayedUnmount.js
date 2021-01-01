import { useState, useEffect } from 'react';

export const DelayUnmountStage = {
    ENTERING: 'ENTERING',
    EXITING: 'EXITING',
};

export const useDelayedUnmount = (duration = 1000, { initial = true } = {}) => {
    const getRenderingStage = (state) => {
        if (state) {
            return DelayUnmountStage.ENTERING;
        } else {
            return DelayUnmountStage.EXITING;
        }
    };
    const [showing, setShowing] = useState(initial);
    const [stage, setStage] = useState(getRenderingStage(initial));
    const [unmounting, setUnmounting] = useState(false);

    useEffect(() => {
        if (unmounting) {
            setStage(getRenderingStage(false));
            setTimeout(() => {
                setShowing(false);
            }, duration);
        }
        return () => {
            setUnmounting(false);
        };
    }, [unmounting]);

    const setRendering = (state) => {
        if (state) {
            setShowing(true);
            setStage(getRenderingStage(true));
        } else {
            setUnmounting(true);
        }
    };

    return [showing, setRendering, stage];
};
