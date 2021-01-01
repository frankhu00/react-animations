import { useState, useEffect } from 'react';

export const DelayUnmountStage = {
    ENTERING: 'ENTERING',
    EXITING: 'EXITING',
};

/**
 * Adds a time delay when trying to unmount a component
 * @param {number} duration - delay time in ms before the component truly unmounts. Default: 1000
 * @param {boolean} initVis - sets the initial visibility state (visible in the UI). Default: true
 * @returns {[boolean, function, string]} [showing, setShowing, stage]
 * - showing: visibility of the component
 * - setShowing: updates the visibility of the component.
 *   When set to false, the delay will be triggered before `showing` is actually changed to false
 * - stage: value of either `DelayUnmountStage.ENTERING` or `DelayUnmountStage.EXITING`. This is useful
 *   when trying to animate the component based on entering / exiting stage
 */
export const useDelayedUnmount = (duration = 1000, initVis = true) => {
    const getRenderingStage = (state) => {
        if (state) {
            return DelayUnmountStage.ENTERING;
        } else {
            return DelayUnmountStage.EXITING;
        }
    };
    const [showing, setShowing] = useState(initVis);
    const [stage, setStage] = useState(getRenderingStage(initVis));
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
