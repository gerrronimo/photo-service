import React, {useEffect, useState} from 'react'
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import {likePost, verifyPost, deletePost} from "../../redux/actions"
import { makeStyles } from '@material-ui/core/styles'
import {Card, CardContent, CardHeader, CardMedia, Button, Chip} from "@material-ui/core"
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'

const useStyles = makeStyles({
  root: {
    width: 350,
    marginBottom: 25
  },
  media: {
    height: 140,
  },
  button: {
    marginTop: 10,
    marginRight: 15
  },
  chip: {
    marginRight: 5
  }
});

const Post = props => {
  const [liked, changeLiked] = useState(false)

  useEffect(() => {
    if (props.userData && props.post && props.post.likedBy) {
      changeLiked(props.post.likedBy.filter(user => user === props.userData.login).length > 0)
    }
  }, [props.userData, props.post])

  const likeSomePost = () => {
    props.likePost(props.posts, props.post._id)
  }

  const verifyPost = () => {
    props.verifyPost(props.unverifiedPosts, props.post._id)
  }

  const deletePost = () => {
    props.deletePost(props.unverifiedPosts, props.post._id)
  }

  const classes = useStyles()

  if (!props.post) return ""

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          title={`Автор ${props.post.author}`}
        />

        <CardContent>
          <Link to={`/post/${props.post._id}`}>
            <CardMedia
              className={classes.media}
              image={props.post.imagePath}
              title={props.post.author}
            />
          </Link>
        </CardContent>

        <CardContent>
          {props.post && props.post.description && props.post.description.length > 0 ? `Описание: ${props.post.description}` : "Описание отсутствует"}
        </CardContent>

        <CardContent>
          {props.post && props.post.tags && props.post.tags.map(tag => <Chip size="small" label={tag} className={classes.chip}/>)}

          {props.loggedIn && !props.fromProfile && !props.unverified && <div>
            <p>Понравилось <b>{props.post.likes}</b> людям</p>
            
            <div className="likesButton">
            {liked ? 
              <Button variant="contained" color="secondary" disabled className={classes.button}>
                Нравится
              </Button> : 
              <Button variant="contained" color="secondary" onClick={likeSomePost} className={classes.button}>
                Нравится
              </Button>
            }
            </div>
          </div>}

          {props.loggedIn && !props.fromProfile && props.unverified && <div>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={verifyPost}
              startIcon={<SaveIcon />}
            >
              Одобрить
            </Button>
                
            <Button
              variant="contained"
              color="secondary"
              onClick={deletePost}
              className={classes.button}
              startIcon={<DeleteIcon />}
            >
              Удалить
            </Button>
          </div>}
        </CardContent>
      </Card>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    userData: state.user.data,
    posts: state.posts,
    unverifiedPosts: state.unverifiedPosts
  }
}

export default connect(mapStateToProps, {likePost, verifyPost, deletePost})(Post)