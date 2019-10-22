class Picture{
  constructor(picture) {
    this.name = picture.name,
    this.description = picture.description,
    this.pohtographerId = picture.photographer_id
  }

  render() {
    (``)
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
