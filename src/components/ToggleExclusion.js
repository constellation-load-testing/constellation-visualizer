import React, { useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

function ToggleExclusion({ toggleExclusion, setToggleExclusion }) {
  return (
    <>
      <ToggleButton
        className="mb-2"
        id="toggle-check"
        type="checkbox"
        variant="outline-primary"
        checked={toggleExclusion}
        value="1"
        onClick={(e) => setToggleExclusion(!toggleExclusion)}
        style={{ height: "38px", marginRight: "20px", borderColor: "#002e79", backgroundColor: "#002e79" }}
      >
        Exclude First 2%
      </ToggleButton>
    </>
  );
}

export default ToggleExclusion;
