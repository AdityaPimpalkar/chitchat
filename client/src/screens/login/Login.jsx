import React from "react";
import GoogleLogin from 'react-google-login';
import config from "../../config.js"

const Login = ({ onSuccess, onFailure }) => {
  return (
    <div className="hidden md:hidden lg:block xl:block">
      <div class="w-full h-screen flex items-center justify-center">
        <form class="w-full md:w-1/3 bg-purple-900 rounded-xl border-2 shadow-xl">
          <div class="flex font-bold justify-center mt-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-white lg:h-16 w-16 mx-2 xl:h-18 w-18"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          </div>
          <h2 class="text-3xl text-center text-white mb-4">chitchat.io</h2>
          <div class="px-8 pb-10">
            <GoogleLogin
              clientId={config.clientId}
              render={renderProps => (
                <div class="w-full ">
                  <button className="w-full flex flex-row px-10 py-3 justify-center items-center rounded-full hover:shadow-xl hover:bg-yellow-500 transition duration-150 ease-in-out"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      className="mx-1"
                      alt="icon"
                    />
                    <div className="flex-col">
                      <span className="text-sm text-white">Login with Google</span>
                    </div>
                  </button>
                </div>
              )}
              buttonText="Login"
              onSuccess={onSuccess}
              onFailure={onFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            />
            
          </div>
        </form>
      </div>
    </div>
    // <div className="card w-100 text-center border-white">
    //   <div className="row">
    //     <div className="col-12">
    //       <h5>Enter Username</h5>
    //     </div>
    //     <div className="d-flex justify-content-center py-1">
    //       <div className="col-4">
    //         <input
    //           type="text"
    //           name="username"
    //           value={user}
    //           className="form-control mb-3"
    //           placeholder="Username"
    //           autoComplete="off"
    //           onChange={({ currentTarget: input }) => logNewUser(input.value)}
    //           onKeyPress={(e) =>
    //             e.code === "Enter" ? authenticateUser() : null
    //           }
    //         />
    //         <button
    //           className="btn btn-success w-100"
    //           onClick={() => authenticateUser()}
    //         >
    //           Join!
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Login;
