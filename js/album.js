class Album {
  constructor(album) {
    this.id = album.id
    this.name = album.name,
    this.description = album.description
  }

  render() {
    return (`<div class="col s12 m6">
        <div class="card blue-grey darken-1" id="${this.id}">
          <div class="card-content white-text">
            <span class="card-title">${this.name}</span>
            <p>${this.description}</p>
          </div>
        </div>
      </div>`)
  }
}
