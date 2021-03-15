import React from 'react';
const Profile = () => {
  return (
    <div className="profile">
      <div className="screensaver"><img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"></img></div>
      <div className="profileDate">
        <div className="ava">
          <img src="https://sun9-4.userapi.com/impg/ypBX4Cuuay8qJHUiOb_zlSr5EMhD0gvBcg02EA/tVlfxRvap6A.jpg?size=969x1080&quality=96&sign=673421d4f37e4b2bc82f2e6f83e834e1&type=album"></img>
        </div>
        <div className="userData">
          <h4>Name</h4>
          <p>Date of Birth</p>
          <p>adress</p>
        </div>
      </div>
      <div className="posts">POSTS</div>
    </div>
  )
}
export default Profile;