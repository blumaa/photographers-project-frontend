class Picture{
  constructor(picture) {
    this.name = picture.name,
    this.description = picture.description,
    this.photographerId = picture.photographer_id
    this.url = picture.image
  }

  render() {
    return (`
        <div class="col s12 m6">
          <div class="card" data-photographer-id="${this.photographerId}">
            <div class="card-image">
              <img src="http://localhost:3000/${this.url}">
              <span class="card-title">${this.name}</span>
              <a class="btn-floating waves-effect waves-light blue"><i class="material-icons">edit</i></a>
              <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">delete</i></a>
            </div>
            <div class="card-content">
              <p>${this.description}</p>
            </div>
          </div>
        </div>
        `)
  }

  renderUpdateForm() {
    (`
      <div class="row">
        <form class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="name" id="name" type="text" class="validate">
              <label for="name">Name</label>
            </div>
          </div>
          <div class="row">
            <div class="input-field col s12">
              <input placeholder="description" id="description" type="text" class="validate">
              <label for="disabled">Disabled</label>
            </div>
          </div>
          <div class="row">
            <div class="col s12">
              <div class="file-field input-field">
                 <div class="btn">
                   <span>File</span>
                   <input type="file">
                 </div>
                 <div class="file-path-wrapper">
                   <input class="file-path validate" type="text">
                 </div>
               </div>
            </div>
          </div>
        </form>
      </div>
      `)
  }
  
}
