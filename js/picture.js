class Picture{
  constructor(picture) {
    this.pictureId = picture.id
    this.name = picture.name,
    this.description = picture.description,
    this.photographerId = picture.photographer_id
    this.url = picture.image
    this.divElement = document.createElement('div')
    this.divElement.className = "row"
    this.divElement.addEventListener('click', (event) => {
      console.log(event.target)
      if (event.target.textContent == 'delete') {
        console.log('deleting!')
        Picture.handleDeletePicture(event.target)
      }
    })

  }

  render() {
    // console.log(this.divElement)

    //     <div class="col s12 m6">
    const containerDiv = document.createElement('div')
    containerDiv.className = 'col s12 m6'

    //       <div class="card" data-photographer-id="${this.photographerId}" data-picture-id="${this.pictureId}">
    const cardDiv = document.createElement('div')
    cardDiv.className = "card"
    cardDiv.dataset.photographerId = `${this.photographerId}`
    cardDiv.dataset.pictureId = `${this.pictureId}`

    //         <div class="card-image">
    const cardImageDiv = document.createElement('div')
    cardImageDiv.className = "card-image"

    //           <img src="http://localhost:3000/${this.url}">
    const img = document.createElement('img')
    img.src = `http://localhost:3000/${this.url}`

    //           <span class="card-title">${this.name}</span>
    const imageSpan = document.createElement('span')
    imageSpan.className = "card-title"
    imageSpan.textContent = `${this.name}`

    //           <a class="btn-floating waves-effect waves-light blue" id="edit"><i class="material-icons">edit</i></a>
    const editBtnA = document.createElement('a')
    editBtnA.className = 'btn-floating halfway-fab waves-effect waves-light blue left'
    editBtnA.id = 'edit'
    const editBtnI = document.createElement('i')
    editBtnI.className = 'material-icons'
    editBtnI.id = `${this.pictureId}`
    editBtnI.textContent = 'edit'
    editBtnA.append(editBtnI)

    //           <a class="btn-floating halfway-fab waves-effect waves-light red" id="delete"><i class="material-icons">delete</i></a>

    const deleteBtnA = document.createElement('a')
    deleteBtnA.className = 'btn-floating halfway-fab waves-effect waves-light red right'
    deleteBtnA.id = 'delete'
    const deleteBtnI = document.createElement('i')
    deleteBtnI.className = 'material-icons'
    deleteBtnI.id = `${this.pictureId}`
    deleteBtnI.textContent = 'delete'
    deleteBtnA.append(deleteBtnI)

    cardImageDiv.append(img, imageSpan, editBtnA, deleteBtnA)

    //         <div class="card-content">

    const cardContentDiv = document.createElement('div')
    cardContentDiv.className = 'card-content'
    //           <p>${this.description}</p>
    const cardContentP = document.createElement('p')
    cardContentP.textContent = `${this.description}`

    cardContentDiv.append(cardContentP)


    cardDiv.append(cardImageDiv, cardContentDiv)
    containerDiv.append(cardDiv)
    this.divElement.append(containerDiv)
    console.log(this.divElement)
    return this.divElement

    // return this.divElement.innerHTML = (`
    //     <div class="col s12 m6">
    //       <div class="card" data-photographer-id="${this.photographerId}" data-picture-id="${this.pictureId}">
    //         <div class="card-image">
    //           <img src="http://localhost:3000/${this.url}">
    //           <span class="card-title">${this.name}</span>
    //           <a class="btn-floating waves-effect waves-light blue" id="edit"><i class="material-icons">edit</i></a>
    //           <a class="btn-floating halfway-fab waves-effect waves-light red" id="delete"><i class="material-icons">delete</i></a>
    //         </div>
    //         <div class="card-content">
    //           <p>${this.description}</p>
    //         </div>
    //       </div>
    //     </div>
    //     `)
  }

  renderUpdateForm() {
    return (`
      <div class="row">
        <form class="col s12" id="upload-image-form">
          <div class="row">
            <div class="input-field col s12">
              <input id="name" type="text" value="${this.name}">
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input id="description" type="text" value="${this.description}">
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

  static handleDeletePicture(target) {
    console.log(target.parentNode.parentNode.parentNode.parentNode.parentNode)
    const reqObj = {
      method: 'DELETE'
    }
    const pictureId = target.id
    console.log(pictureId)
    fetch(`http://localhost:3000/pictures/${pictureId}`, reqObj)
      .then(resp => resp.json() )
      .then(data => {
        console.log('deleted', data)
        // console.log(target)
        target.parentNode.parentNode.parentNode.parentNode.parentNode.remove()
      })
  }

}
