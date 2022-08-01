import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const user = {
  email: "user@mail.com",
  password: "123456",
};

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    if (payload.email === user.email && payload.password === user.password) {
      localStorage.setItem("_isLoggedIn", true);
      history.push('/produk');
    } else {
      setErrorMessage("Email atau password salah");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("_isLoggedIn")) {
      history.push('/produk')
    }
  }, [])

  return (
    <div
      className="App container-fluid p-0 bg-dark d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card" style={{ width: '500px' }}>
        <div className="card-body p-5">
          <h3 className="mb-3">Login</h3>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                placeholder="Masukan email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Masukan password"
              />
            </div>
            <div className="d-grid mb-3">
              <button className="btn btn-primary" type="submit">
                LOGIN
              </button>
            </div>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home