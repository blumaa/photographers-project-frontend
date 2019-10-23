document.addEventListener('DOMContentLoaded', () => {
  // Variables
  let allPhotographers = []
  let user
  user = 5
  let URL = 'http://localhost:3000/'
  const myPics = document.getElementById('my-pics-btn')
  const showPanel = document.getElementById('show-panel')
  const myAlbums = document.getElementById('my-album-btn')


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
  
  myAlbums.addEventListener('click', (event) => {
    getAlbums()
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
    console.log(albumHtml)
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

    const imageBut = document.createElement('button')
    imageBut.setAttribute('class', 'waves-effect waves-light btn')
    imageBut.innerHTML = 'Add image'

    const deleteBut = document.createElement('button')
    deleteBut.setAttribute('class', 'waves-effect waves-light btn')
    deleteBut.innerHTML = 'Delete'
    deleteBut.onclick = (event) => {
      deleteAlb(album)
    }

    showPanel.append(editBut, imageBut, deleteBut, form)
  }
  

  function updateAlbum(form, album) {
    let name, description

    if(form[0].value) {
      name = form[0].value
    } else {
      name = album.name
    }
    if(form[1].value) {
      description = from[1].value
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
