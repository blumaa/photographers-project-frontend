document.addEventListener('DOMContentLoaded', () => {
  // Variables
  let allPhotographers = []
  let user
  user = 5
  let URL = 'http://localhost:3000/'
  const myPics = document.getElementById('my-pics-btn')
  const showPanel = document.getElementById('show-panel')

// Main Photographer Profile
  getProfileInfo()

// Event listeners for pictures

// get the photographer
  function getProfileInfo() {
    fetch(URL + `photographers/${user}`)
      .then(resp => resp.json())
      .then(photogData => renderProfileInfo(photogData))
  }

  function renderProfileInfo(photogData) {
    const profileInfoDiv = document.getElementById('profile-info')

    const newPhotog = new Photographer(photogData)
    const newPhotogHtml = newPhotog.render()

    profileInfoDiv.innerHTML = newPhotogHtml
  }

// My Pictures side panel button

  myPics.addEventListener('click', (event) => {
    handleMyPictures()
  })

// My pictures show panel

  function handleMyPictures() {
    showPanel.innerHTML = ""
    showPanel.innerHTML = getUploadPictureForm()

    document.getElementById('upload-image-form').onsubmit = (event) => {
      event.preventDefault()
      postImage(event.target)
    }

    getPhotogsPictures()

  }

// Picture Gallery

// get all pictures

function getPhotogsPictures() {
  return fetch(URL + 'pictures')
    .then(resp => resp.json())
    .then(picData => filterPics(picData))
}

function filterPics(picData) {
  // console.log(picData)
  const filteredPics = picData.filter(pic => pic.photographer_id == user)
  // console.log('filtered pics', filteredPics)
  // const renderedPicsHtml = filteredPics.map(picture => renderPicsHtml(picture)).join('')

  filteredPics.forEach(pic => {
    renderPicHtml(pic)
  })

  // console.log(renderedPicsHtml)
  // showPanel.append(renderedPicsHtml)
  // showPanel.insertAdjacentHTML('beforeend', renderedPicsHtml)
}

// map over all pics and return html

function renderPicHtml(picture) {
  const photoHtml = new Picture(picture)
  // console.log(photoHtml)
  const renderedHtmlPhoto = photoHtml.render()
  // console.log(renderedHtmlPhoto)

  showPanel.append(renderedHtmlPhoto)
  // showPanel.insertAdjacentHTML( 'beforeend', renderedHtmlPhoto );
}

// Upload a picture

  function postImage(form) {
    console.log(form)

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

    // console.log('data', data)

    fetch(URL + 'pictures', {
      method: 'POST',
      body: data
    })
      .then(resp => resp.json())
      .then(imageData => {
        showPanel.insertAdjacentHTML('beforeend', renderPicsHtml(imageData))
        form[0].value = ""
        form[1].value = ""
        form[2].value = ""
        form[3].value = ""
      })
  }

// upload picture form

  function getUploadPictureForm() {
    return (`
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
  }

})
