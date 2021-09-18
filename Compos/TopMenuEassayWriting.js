import { Button, ButtonGroup } from '@material-ui/core'
import SaveIcon from "@material-ui/icons/Save";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import React from 'react'

function TopMenuEassayWriting({reset, save}) {
    return (
        <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
        className="mb-4"
      >
        <Button onClick={() => reset()}>
          <RotateLeftIcon /> Reset
        </Button>
        <Button> </Button>
        <Button onClick={() => save()}>
          <SaveIcon /> Save{" "}
        </Button>
      </ButtonGroup>
    )
}

export default TopMenuEassayWriting
