"use strict";

function getComent() {}

function setUser() {}

const Coment = () => {
  let data = {};

  const [user, setUser] = React.useState();
  const [star, setStar] = React.useState();
  const [users, setUsers] = React.useState([]);
  const { Rating } = primereact.rating;

  const sendData = (user) => {
    fetch("http://127.0.0.1:8000/api/userRegister", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(function (response) {
      if (response.ok) {
        return response.text();
      } else {
        throw "Error en la llamada Ajax";
      }
    });

    getUsers();
    google.accounts.id.disableAutoSelect();
  };

  const onSubmit = () => {
    let value = document.getElementById("coment");

    user.coment = value.value;

    sendData(user);
    window.location.href = "#reff"
  };

  function handleCredentialResponse(response) {
    const responsePayload = jwt_decode(response.credential);

    data = {
      name: responsePayload.name,
      email: responsePayload.email,
      avatar: responsePayload.picture,
      coment: "",
      starts: 1,
    };

    setUser(data);
  }

  window.onload = function () {
    google.accounts.id.initialize({
      client_id:
        "598216789142-59n7qrm4faj0m82tb09i79onu9it3jkr.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      {
        theme: "outline",
        size: "large",
        logo_alignment: "left",
        text: "$ {button.text}",
        type: "standard",
        shape: "rectangular",
        width: "300px",
      } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  };

  const getUsers = async () => {
    const users = await fetch("http://127.0.0.1:8000/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    });

    setUsers(users);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const style = {
    color: "#fece1a",
    fontSize: "20px",
  };

  const style2 = {
    color: "#fece1a",
    fontSize: "30px",
  };

  const setValue = (value) => {
    setStar(value);
    user.starts = value;
  };

  return (
    <div>
      {!users ? (
        <div>Cargando...</div>
      ) : (
        //esto es donde se muestran los comentarios traidos de la db
        <div className="rowb">
          <div className="grid">
            {users.map((us, index) => {
              return (
                <div className="span4" key={index}>
                  <div className="testimonial tick">
                    <div className="whopic">
                      <img
                        src={us.avatar}
                        className="centered"
                        alt="client 3"
                      />
                      <strong>
                        {us.name}
                        <small>Cliente</small>
                      </strong>
                    </div>
                    <Rating
                      value={us.starts}
                      readOnly
                      stars={5}
                      cancel={false}
                      style={style}
                    />
                    <div className="arrow"></div>
                    <p>"{us.coment}"</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      <hr />
      <div className="rowb">
        <h2>Inicia sesión con google para dejarnos un comentario</h2>
      </div>
      <div id="buttonDiv" data-auto_prompt="false" className="rowb"></div>

      {user && (
        //Aqui se despliega el modal

        <div>
          <div className="rowb"><a className="modal-open" href="#modal">
            Enviar Comentario
          </a></div>
          
          <div className="modal" id="modal">
            <div className="modal-content">
              <a href="#reff" className="modal-close">
                X
              </a>
              <h3>Tu comentario...!</h3>
              <div className="modal-area">
                <img className="img" src="assets/images/comments.svg"></img>
                <form onSubmit={onSubmit}>
                  <textarea
                    id="coment"
                    className="textarea"
                    placeholder="Comentario"
                    maxlength="250"
                    required
                  ></textarea>
                  <div className="center">
                    <Rating
                      value={user.starts}
                      onChange={(e) => setValue(e.value)}
                      stars={5}
                      cancel={false}
                      style={style2}
                    />
                  </div>
                    <button className="btntex">
                      Enviar
                    </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const domContainer = document.getElementById("comentReact");
const root = ReactDOM.createRoot(domContainer);
root.render(<Coment></Coment>);
