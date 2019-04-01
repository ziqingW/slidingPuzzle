import React from 'react'
import {Grid, withStyles, Typography} from '@material-ui/core'
import Puzzle from './Puzzle'
import backImage from '../static/back.jpg'

const styles = {
  frame : {
    backgroundImage: `url(${backImage})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  title: {
    marginTop: "100px",
    fontFamily: "Lobster"
  },
  puzzle: {
    minHeight: "100vh",
    marginTop: "60px",
  },
}

let Main = props =>  {
    const {classes} = props
    return (
      <Grid container className={classes.frame}>
        <Grid container direction="row" justify="center">

          <Typography variant="h4" className={classes.title}>Sliding Puzzle</Typography>

        </Grid>
        <Grid container spacing={0} direction="column" alignItems="center" className={classes.puzzle}>
          <Puzzle />
        </Grid>
      </Grid>
    )
  }


Main = withStyles(styles)(Main)
export default Main
