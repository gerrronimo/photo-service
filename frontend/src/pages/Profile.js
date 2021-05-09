import React, {useState} from 'react'
import {connect} from "react-redux"
import {toast} from "react-toastify"
import {logoutAction, newPost} from "../redux/actions"

const Profile = props => {
  const [description, changeDescription] = useState("")
  const [image, changeImage] = useState(null)

  if (!props.user) return <p>loading</p>

  const createPost = event => {
    event.preventDefault()

    if (!image) {
      toast.error("Изображение не загруженно")
      return
    }

    const formData = new FormData()
    formData.append('post', image, image.name)
    props.newPost(description, formData)
  }

  return (
    <main>
      <h4>Hello, {props.user.name}</h4>
      <button onClick={props.logoutAction}>Logout</button>

      <br/><br/><br/>

      <form onSubmit={createPost} encType="multipart/form-data">
        <input type="file" name="post" accept=".jpg, .jpeg, .png" onChange={e => changeImage(e.target.files[0])}/>
        <textarea placeholder="Описание" cols={10} rows={2} onChange={e => changeDescription(e.target.value)}/>
        <input type="submit" value="create post"/>
      </form>
    </main>
  )
}

const mapStateToProps = state => {
  return {
    loggedIn: state.user.loggedIn,
    user: state.user.data
  }
}

export default connect(mapStateToProps, {logoutAction, newPost})(Profile)