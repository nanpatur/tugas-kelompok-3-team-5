import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Layout = ({children}) => {
  const history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("_isLoggedIn")) {
      history.push("/");
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("_isLoggedIn");
    history.push("/");
  }
  
  return (
    <div className="App container-fluid p-0" style={{ minHeight: "100vh" }}>
      <nav class="navbar navbar-expand-lg bg-light px-5">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Tugas Kelompok 3 - Team 5
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="d-flex ms-auto">
              <button class="btn btn-outline-danger" onClick={logout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  )
}

export default Layout;