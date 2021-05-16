import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from "react-redux"
import {toast} from "react-toastify"
import SearchLocationComponent from "../components/common/SearchLocationComponent"

import {logoutAction, newPostAction} from "../redux/actions"
import Post from './../components/layout/Post'

const Profile = props => {
  const [description, changeDescription] = useState("")
  const [image, changeImage] = useState(null)

  const [location, changeLocation] = useState("")
  const [coords, changeCoords] = useState("")

  if (!props.user) return <p>loading</p>

  const createPost = event => {
    event.preventDefault()

    if (!image) {
      toast.error("Изображение не загруженно")
      return
    }

    const formData = new FormData()
    formData.append('post', image, image.name)
    props.newPostAction(description, formData, coords)
  }

  if (props.user.isAdmin) return <Redirect to="/admin" />

  return (
    <main>
      <h4>Hello, {props.user.name}</h4>
      <button onClick={props.logoutAction}>Logout</button>

      <br/><br/><br/>

      <form onSubmit={createPost} encType="multipart/form-data">
        <input type="file" name="post" accept=".jpg, .jpeg, .png" onChange={e => changeImage(e.target.files[0])}/>
        <textarea placeholder="Описание" cols={10} rows={2} onChange={e => changeDescription(e.target.value)}/>

        <SearchLocationComponent
          location={location}
          changeLocation={changeLocation.bind(this)}
          coords={coords}
          changeCoords={changeCoords.bind(this)}/>

        <input type="submit" value="Создать пост"/>
      </form>

      <div style={{margin: "25px"}}>
        <p>Понравившиеся</p>
        {props.user.liked && props.user.liked.map(post => <Post post={post} fromProfile={true}/>)}
      </div>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    user: state.user.data
  }
}

export default connect(mapStateToProps, {logoutAction, newPostAction})(Profile)