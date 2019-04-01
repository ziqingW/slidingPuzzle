import React , {Component} from 'react'
import {Grid, withStyles, Button} from '@material-ui/core'

const shuffle = () => {
  let tiles = [1,2,3,4,5,6,7,8];
  let j, i;
  for (i = tiles.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      [tiles[i], tiles[j]] = [tiles[j], tiles[i]]
  }
  tiles.push(null)
  return tiles
}

const styles = {
  puzzleWrapper: {
    maxWidth : "250px",
    border: "8px solid rgba(255,255,255,0.8)",
    borderRadius: "8px",
  },
  tiles: {
    '&:hover': {
      cursor: "pointer",
      filter: "brightness(120%)",
      textShadow: "1px 1px 3px gold",
    },
    height: "80px",
    width: "80px",
    border: "1px solid black",
    fontSize: "1.8em",
    fontWeight: "bold",
    boxShadow: "1px 1px 1px black",
    backgroundColor: "rgba(131, 106, 242,0.7)",
    color: "white",
    textShadow: "1px 1px 1px black",

  },
  blank: {
    backgroundColor: "rgba(145,145,145,0.7)",
  },
  button: {
    marginTop: '100px',
  },
  greeting: {
    textShadow: "1px 1px 3px white",
  },
  repeat: {
    color: "rgba(229, 53, 50, 0.8)",
    textShadow: "1px 1px 1px white",
  }
}

class Puzzle extends Component {
  constructor(props) {
    super(props)
    const tiles = shuffle();
    this.state = {
      tiles : tiles,
      blank : 8,
      win : false,
    }
  }

  clickable = blankTile => {
    switch (blankTile) {
      case 0:
        return [1,3]
      case 1:
        return [0,2,4]
      case 2:
        return [1,5]
      case 3:
        return [0,4,6]
      case 4:
        return [1,3,5,7]
      case 5:
        return [2,4,8]
      case 6:
        return [3,7]
      case 7:
        return [4,6,8]
      case 8:
        return [5,7]
      default:
        break
    }
  }

  compare = (arr1, arr2) => {
      return (arr1.length === arr2.length) &&
      arr1.every((num,i) => {
        return num === arr2[i]
      })
  }

  moveTile = tile => {
    let workingTemp = Object.assign([], this.state.tiles);
    let win = false;
    [workingTemp[tile], workingTemp[this.state.blank]] = [workingTemp[this.state.blank], workingTemp[tile]]
    // let workingTemp = [1,2,3,4,5,6,7,8,null];
    if (this.compare(workingTemp, [1,2,3,4,5,6,7,8,null])) {
      win = true
    }
    this.setState({
      tiles: workingTemp,
      blank: tile,
      win: win,
    })
  }

  shuffleTiles = () => {
    const tiles = shuffle();
    this.setState({
      tiles : tiles,
      blank: 8,
      win: false
    })
  }

  replay = () => {
    const tiles = shuffle();
    this.setState({
      tiles : tiles,
      blank : 8,
      win : false,
    })
  }

  render() {
    const {classes} = this.props
    const clickableTiles = this.clickable(this.state.blank)
    return(
       this.state.win ? (
         <Grid container direction="column" justify="center" alignItems="center">
          <h2 className={classes.greeting}><i>Congratulations, you Win!</i></h2>
          <h2 className={classes.repeat}><i>Play one more?</i></h2>
          <Button variant="contained" color="primary" onClick={this.replay}>
            Yeah!
          </Button>
        </Grid>) : (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid container direction="row" justify="center" className={classes.puzzleWrapper}>
          {this.state.tiles.map((tile,i)=>(
            <Grid container justify="center" alignItems="center" className={this.state.blank === i ? (classes.blank + ' ' + classes.tiles): classes.tiles} item xs={4} key={i} onClick={clickableTiles.includes(i)? (()=> this.moveTile(i)) : (()=>null)}>{tile}</Grid>
          ))}
        </Grid>
      <Grid className={classes.button}>
        <Button variant="contained" color="secondary" onClick={this.shuffleTiles}>
          Shuffle
        </Button>
      </Grid>
      </Grid>
    ))
  }
}

Puzzle = withStyles(styles)(Puzzle)
export default Puzzle
