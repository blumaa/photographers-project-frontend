document.addEventListener('DOMContentLoaded', () => {
  let allPhotographers = []
  let user
  let URL = 'http://localhost:3000/'
  const myPics = document.getElementById('my-pics-btn')

  getProfileInfo()

  function getProfileInfo() {
    user = 2
    fetch(URL + `/photographers/${user}`)
      .then(resp => resp.json())
      .then(photogData => renderProfileInfo(photogData))
  }

  function renderProfileInfo(photogData) {
    const profileInfoDiv = document.getElementById('profile-info')
    console.log(profileInfoDiv)
    const newPhotog = new Photographer(photogData)
    const newPhotogHtml = newPhotog.render()
    profileInfoDiv.innerHTML = newPhotogHtml
  }

  myPics.addEventListener('click', (event) => {
    console.log(event.target)
    handleMyPictures
  })

})
