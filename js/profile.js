document.addEventListener('DOMContentLoaded', () => {
  let allPhotographers = []
  let user
  user = 9
  let URL = 'http://localhost:3000/'
  const myPics = document.getElementById('my-pics-btn')
  const showPanel = document.getElementById('show-panel')

  getProfileInfo()

  function getProfileInfo() {
    fetch(URL + `/photographers/${user}`)
      .then(resp => resp.json())
      .then(photogData => renderProfileInfo(photogData))
  }

  function renderProfileInfo(photogData) {
    const profileInfoDiv = document.getElementById('profile-info')
    // console.log(profileInfoDiv)

    const newPhotog = new Photographer(photogData)
    const newPhotogHtml = newPhotog.render()

    profileInfoDiv.innerHTML = newPhotogHtml
  }

  myPics.addEventListener('click', (event) => {
    console.log(event.target)
    handleMyPictures()
  })

  function handleMyPictures() {
    showPanel.innerHTML = ""
    getUploadPicture()
  }

  function getUploadPicture() {
    const uploadImageForm = (`
      <div class="row">
        <form class="col s12" id="upload-image-form">
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="name" id="name" type="text">
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="description" id="description" type="text">
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <div class="file-field input-field">
                 <div class="btn">
                   <span>File</span>
                   <input type="file" name="photo">
                 </div>
                 <div class="file-path-wrapper">
                   <input class="file-path" type="text">
                 </div>
               </div>
            </div>
          </div>
          <button class="btn waves-effect waves-light" type="submit" name="action">Submit
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
      `)

      showPanel.innerHTML = uploadImageForm

      document.getElementById('upload-image-form').onsubmit = (event) => {
        event.preventDefault()
        postImage(event.target)
      }

      function postImage(form) {

        let input = form[2].files[0]
        // console.log('input', input)
        const name = form[0].value
        // console.log('name', name)
        const description = form[1].value
        // console.log('description', description)
        const photographerId = user
        // console.log('photographerId', photographerId)

        let data = new FormData()

        data.append('picture', input)
        data.append('name', name)
        data.append('description', description)
        data.append('photographer_id', photographerId)

        console.log('data', data)

        fetch('http://localhost:3000/pictures', {
          method: 'POST',
          body: data
        })
          .then(resp => resp.json())
          .then(imageData => console.log(imageData))
      }
  }

})
