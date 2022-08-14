const Nav = () => `
  <nav class="fixed-top navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"><strong>Indogram</strong></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav ms-auto">
          <a class="nav-link active" aria-current="page" href="/beranda"><i class="fa-solid fa-house"></i> Beranda</a>
          <a class="nav-link" href="#"><i class="fa-solid fa-comments"></i> Chat</a>
          <a class="nav-link" href="#"><i class="fa-solid fa-bell"></i> Notification</a>
          <div class="dropdown">
            <a class="nav-link dropdown-toggle" type="button" data-bs-toggle="dropdown">Dashboard</a>
            <ul class="dropdown-menu">
              <li>
                <a href="/dashboard" class="nav-link dropdown-item"><i class="fa-solid fa-user m-2"></i> Account</a>
                <a href="/dashboard/your-post" class="nav-link dropdown-item"><i class="fa-regular fa-square-plus m-2"></i>
                  Your Post</a>
                <a href="/dashboard/setting-profile" class="nav-link dropdown-item"><i
                    class="fa-regular fa-id-card m-2"></i> Setting Profile</a>
                <a href="/" class="nav-link dropdown-item" onclick="Logout()"
                  id="logoutButton"><i class="fa-solid fa-right-from-bracket m-2"></i> Log out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
`

export default Nav;