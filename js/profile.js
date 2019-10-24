document.addEventListener('DOMContentLoaded', () => {
  // Variables
  let allPhotographers = []
  let user
  user = 9
  let URL = 'http://localhost:3000/'
  const myPics = document.getElementById('my-pics-btn')
  const showPanel = document.getElementById('show-panel')
  const myAlbums = document.getElementById('my-album-btn')
  // const editProfile = document.getElementById('edit-profile-form')
  // const editProfile = document.getElementsByTagName('form')
  // console.log(editProfile)
  const profileInfoDiv = document.getElementById('profile-info')


  // Main Photographer Profile
  getProfileInfo()

// ***********************************************************************************************
// Event listeners for side panel
// ***********************************************************************************************


  // My Pictures side panel button

  myPics.addEventListener('click', (event) => {
    handleMyPictures()
  })

  myAlbums.addEventListener('click', (event) => {
    getAlbums()
  })


// ************************************************************************************
// Display photographer profile on left panel
// ************************************************************************************

  // get the photographer
  function getProfileInfo() {
    fetch(`http://localhost:3000/photographers/${user}`)
    .then(resp => resp.json())
    .then(photogData => renderProfileInfo(photogData))
  }

  function renderProfileInfo(photogData) {

    const newPhotog = new ProfileCard(photogData)
    const newPhotogHtml = newPhotog.render()

    profileInfoDiv.innerHTML = newPhotogHtml
    const editProfile = document.getElementById('edit-profile-form')
    // console.log(editProfile)

    editProfile.addEventListener('submit', (event) => {
      event.preventDefault()
      updateProfile(event.target)
    })

  }

  // update profile info

  function updateProfile(form){
    const pName = form[0].value
    const pBirthdate = form[1].value
    const pBio = form[2].value
    const pStartDate = form[3].value
    const pCity = form[4].value
    let pImage = form[5].files[0]

    let profileData = new FormData()

    profileData.append('name', pName)
    profileData.append('birthdate', pBirthdate)
    profileData.append('bio', pBio)
    profileData.append('start_date', pStartDate)
    profileData.append('city', pCity)
    profileData.append('image', pImage)

    // console.dir(form)
    // const data = {
    //   id: form.dataset.id,
    //   name: form[0].value,
    //   birthdate: form[1].value,
    //   bio: form[2].value,
    //   start_date: form[3].value,
    //   city: form[4].value
    // }

    // console.log(data)
    //
    reqObj = {
      method: 'PATCH',
      body: profileData
    }

    fetch(`http://localhost:3000/photographers/${form.dataset.id}`, reqObj)
      .then(resp => resp.json())
      .then(newPData => {
        profileInfoDiv.innerHTML = ""
        const updatetPhotog = new ProfileCard(newPData)
        const updatedPhotogHtml = updatetPhotog.render()

        profileInfoDiv.innerHTML = updatedPhotogHtml

      })

  }


// **************************************************************************
//  My pictures show panel
// **************************************************************************

  function handleMyPictures() {
    showPanel.innerHTML = ""


    const buttonAdd = document.createElement('button')
    const buttonRow = document.createElement('div')
    const uploadPicDiv = document.createElement('div')
    buttonRow.setAttribute('class', 'row center-align')
    buttonAdd.setAttribute('class', 'waves - effect waves - light btn')
    buttonAdd.innerHTML = 'Upload Picture'
    buttonRow.append(buttonAdd)
    // buttonRow.append(form)
    // form.innerHTML = ''
    showPanel.append(buttonRow)
    let click = false

    buttonAdd.onclick = (event) => {
      if(click) {
        uploadPicDiv.innerHTML = ''
        click = false
      } else {
        uploadPicDiv.innerHTML = getUploadPictureForm()
        buttonRow.append(uploadPicDiv)
        document.getElementById('upload-image-form').onsubmit = (event) => {
          event.preventDefault()
          postImage(event.target)
        }
        click = true
      }
    }

    showPanel.insertAdjacentHTML('beforeend', getPhotogsPictures())

  }

// Get all of a photographers pictures
// **************************************************************************


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
        renderPicHtml(imageData)
        // showPanel.insertAdjacentHTML('beforeend', renderPicHtml(imageData))
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
          <button class="btn waves-effect waves-light" id="create-form" type="submit" name="action">Submit
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
      `)
  }

  // Handle Albums
  // #######################################

  function getAlbums() {
    return fetch('http://localhost:3000/albums')
      .then(resp => resp.json())
      .then(albums => renderAlbums(albums))
      .catch(error => console.log(error))
  }

  function renderAlbums(albums) {
    console.log(albums)
    showPanel.innerHTML = ""


    const buttonAdd = document.createElement('button')
    const buttonRow = document.createElement('div')
    const form = document.createElement('div')
    buttonRow.setAttribute('class', 'row center-align')
    buttonAdd.setAttribute('class', 'waves - effect waves - light btn')
    buttonAdd.innerHTML = 'Create Album'
    buttonRow.append(buttonAdd)
    buttonRow.append(form)
    form.innerHTML = ''
    showPanel.append(buttonRow)
    let click = false

    buttonAdd.onclick = (event) => {
      if(click) {
        form.innerHTML = ''
        click = false
      } else {
        form.innerHTML = renderAlbumForm()
        buttonRow.append(form)
        document.getElementById('create-album-form').onsubmit = (event) => {
          event.preventDefault()
          createAlbum(event.target)
        }
        click = true
      }
    }

    const renderedAlbumsHtml = albums.map(album => renderAlbum(album)).join('')
    showPanel.insertAdjacentHTML('beforeend', renderedAlbumsHtml)

    document.querySelectorAll('.card').forEach(card => {
      card.onclick = (event) => getAlbum(card.id)
    })
  }

  function renderAlbum(album) {
    const albumHtml = new Album(album)
    const renderalb = albumHtml.render()
    return renderalb
  }

  function renderAlbumForm() {
    return (`
      <div class="row">
        <form class="col s12" id="create-album-form">
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
          <button class="btn waves-effect waves-light" type="submit" name="action">Create
            <i class="material-icons right">send</i>
          </button>
        </form>
      </div>
      `)
  }

  function createAlbum(form) {
    const name = form[0].value
    const description = form[1].value
    const photographerId = user

    fetch('http://localhost:3000/albums', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        description: description,
        photographer_id: photographerId
      })
    })
    .then(resp => resp.json())
    .then(albums => getAlbums(albums))
  }

  function getAlbum(id) {
    return fetch(`http://localhost:3000/albums/${id}`)
      .then(resp => resp.json())
      .then(album => showAlbum(album))
      .catch(error => console.log(error))
  }

  function showAlbum(album) {
    showPanel.innerHTML = ''
    let click = false
    const form = document.createElement('div')
    form.innerHTML = ''

    // display images already in album

    const imageContainer = document.createElement('div')
    imageContainer.innerHTML = ''


    const buttonsRow = document.createElement('div')
    buttonsRow.setAttribute('class', 'row')

    const editBut = document.createElement('button')
    editBut.setAttribute('class', 'waves-effect waves-light btn')
    editBut.innerHTML = 'Edit'
    editBut.onclick = (event) => {
      if(click) {
        form.innerHTML = ''
        click = false

      }else{
        form.innerHTML = renderAlbumForm()
        click = true
        document.getElementById('create-album-form').onsubmit = (event) => {
          event.preventDefault()
          updateAlbum(event, album)
        }
      }
    }

    // add images to album

    let clickToAddImages = false

    const allImages = document.createElement('div')
    allImages.innerHTML = ''

    const imageBut = document.createElement('button')
    imageBut.setAttribute('class', 'waves-effect waves-light btn')
    imageBut.innerHTML = 'Add image'

    imageBut.onclick = (event) => {
      if(clickToAddImages) {
        allImages.innerHTML = ''
        clickToAddImages = false

      }else{
        const pictureDisplay = displayAllPicturesToAdd()
        console.log('picture display', pictureDisplay)
        allImages.innerHTML = pictureDisplay
        clickToAddImages = true




        function displayAllPicturesToAdd() {
          fetch(URL + 'pictures')
            .then(resp => resp.json())
            .then(picData => renderPictures(picData))
        }

        function renderPictures(picData) {
          allImages.innerHTML = ""
          const filteredPics = filterPicsToDisplay(picData)

          filteredPics.forEach(pic => {
            const picToAppend = renderPic(pic)
            allImages.insertAdjacentHTML('beforeend', picToAppend)
          })

          document.querySelectorAll('.btn-floating').forEach(btn => {
            btn.onclick = (event) => addPhotoToAlbum(event.target.parentNode.parentNode.parentNode.id)
          })

          function addPhotoToAlbum(picId) {
            const data = {
              album_id: album.id,
              picture_id: picId
            }
            const reqObj = {
              method: 'POST',
              headers: {'Content-Type' : 'application/json'},
              body: JSON.stringify({
                data
              })
            }
            fetch(`http://localhost:3000/album_pictures`, reqObj)
              .then(resp => resp.json())
              .then(albumData = console.log(albumData))
          }

        }


        function filterPicsToDisplay(picData) {
          // console.log(picData)
          return picData.filter(pic => pic.photographer_id == user)
        }
        //
        // // map over all pics and return html
        //
        function renderPic(picture) {
          const picToAdd = new Picture(picture)
          // console.log(photoHtml)
          const picToAddHtml = picToAdd.renderPictureToAdd()
          // console.log(renderedHtmlPhoto)
          return picToAddHtml
        }


        // document.getElementById('create-album-form').onsubmit = (event) => {
        //   event.preventDefault()
        //   updateAlbum(event, album)
        // }
        }
      }

    const deleteBut = document.createElement('button')
    deleteBut.setAttribute('class', 'waves-effect waves-light btn')
    deleteBut.innerHTML = 'Delete'
    deleteBut.onclick = (event) => {
      deleteAlb(album)
    }

    showPanel.append(editBut, imageBut, deleteBut, form, imageContainer, allImages)
  }


  function updateAlbum(form, album) {
    let name, description

    console.log(form.target)

    if(form.target[0].value) {
      name = form.target[0].value
    } else {
      name = album.name
    }
    if(form.target[1].value) {
      description = form.target[1].value
    } else {
      description = album.description
    }

    fetch(`http://localhost:3000/albums/${album.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          description: description,
        })
      })
  }

  function deleteAlb(album) {
    console.log(album.id)
    fetch(`http://localhost:3000/albums/${album.id}`,{
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(data => getAlbums())
    .catch(error => {
      console.error(error)
    });
  }

})
