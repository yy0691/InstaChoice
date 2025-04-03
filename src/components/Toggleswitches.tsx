import React from 'react';
import styled from 'styled-components';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange, className }) => {
  return (
    <StyledWrapper className={className}>
      <label className="switch">
        <input 
          type="checkbox" 
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className="slider">
          <div className="circle">
            <div className="icon-container">
              <svg className="cross" viewBox="0 0 365.696 365.696" height={6} width={6} xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path data-original="#000000" fill="currentColor" d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0" />
                </g>
              </svg>
              <svg className="checkmark" viewBox="0 0 24 24" height={10} width={10} xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path fill="currentColor" d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </label>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .switch {
    /* switch */
    --switch-width: 46px;
    --switch-height: 24px;
    --switch-bg: rgb(131, 131, 131);
    --switch-checked-bg: #506eec;
    --switch-offset: calc((var(--switch-height) - var(--circle-diameter)) / 2);
    --switch-transition: all .2s cubic-bezier(0.27, 0.2, 0.25, 1.51);
    /* circle */
    --circle-diameter: 18px;
    --circle-bg: #fff;
    --circle-shadow: 1px 1px 2px rgba(146, 146, 146, 0.45);
    --circle-checked-shadow: -1px 1px 2px rgba(163, 163, 163, 0.45);
    --circle-transition: var(--switch-transition);
    /* icon */
    --icon-transition: all .2s cubic-bezier(0.27, 0.2, 0.25, 1.51);
    --icon-cross-color: var(--switch-bg);
    --icon-cross-size: 6px;
    --icon-checkmark-color: var(--switch-checked-bg);
    --icon-checkmark-size: 10px;
  }

  .switch input {
    display: none;
  }

  .switch {
    display: inline-block;
  }

  .icon-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .switch svg {
    position: absolute;
    height: auto;
    transition: var(--icon-transition);
  }

  .switch .checkmark {
    width: var(--icon-checkmark-size);
    color: var(--icon-checkmark-color);
    opacity: 0;
    transform: scale(0);
  }

  .switch .cross {
    width: var(--icon-cross-size);
    color: var(--icon-cross-color);
    opacity: 1;
    transform: scale(1);
  }

  .slider {
    box-sizing: border-box;
    width: var(--switch-width);
    height: var(--switch-height);
    background: var(--switch-bg);
    border-radius: 999px;
    display: flex;
    align-items: center;
    position: relative;
    transition: var(--switch-transition);
    cursor: pointer;
  }

  .circle {
    width: var(--circle-diameter);
    height: var(--circle-diameter);
    background: var(--circle-bg);
    border-radius: inherit;
    box-shadow: var(--circle-shadow);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--circle-transition);
    z-index: 1;
    position: absolute;
    left: var(--switch-offset);
  }

  /* actions */
  .switch input:checked+.slider {
    background: var(--switch-checked-bg);
  }

  .switch input:checked+.slider .checkmark {
    opacity: 1;
    transform: scale(1);
  }

  .switch input:checked+.slider .cross {
    opacity: 0;
    transform: scale(0);
  }

  .switch input:checked+.slider .circle {
    left: calc(100% - var(--circle-diameter) - var(--switch-offset));
    box-shadow: var(--circle-checked-shadow);
  }`;

export default ToggleSwitch;
