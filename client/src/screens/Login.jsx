import React from "react";
import GoogleLogin from "react-google-login";
import config from "../config";
import { ChatAlt2Icon } from "@heroicons/react/solid";
const Login = ({ onSuccess, onFailure, isLoading, LoadWidth }) => {
  return (
    <div className="hidden md:hidden lg:block xl:block">
      <div className="w-full h-screen flex items-center justify-center">
        <form className="w-full md:w-1/3 bg-purple-900 rounded-xl border-2 shadow-xl">
          <div className="flex font-bold justify-center mt-6">
            <ChatAlt2Icon className="text-white lg:h-16 w-16 mx-2 xl:h-18 w-18" />
          </div>
          <h2 className="text-3xl text-center text-white mb-4">chitchat.io</h2>
          <div className="px-8 pb-10">
            {isLoading === true && (
              <div className="w-full flex bg-purple-900 justify-start items-center bg-gray-200 h-6">
                <div
                  className={`bg-yellow-600 h-2 transition 2s ${LoadWidth}`}
                ></div>
              </div>
            )}
            {isLoading === false && (
              <GoogleLogin
                clientId={config.clientId}
                render={(renderProps) => (
                  <div className="w-full ">
                    <button
                      className={` w-full flex flex-row px-10 py-3 justify-center items-center rounded-full ${
                        isLoading === false &&
                        "hover:shadow-xl hover:bg-yellow-500 transition duration-150 ease-in-out"
                      }`}
                      onClick={isLoading === false ? renderProps.onClick : null}
                      disabled={renderProps.disabled}
                    >
                      <React.Fragment>
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                          className="mx-1"
                          alt="icon"
                        />
                        <div className="flex-col">
                          <span className="text-sm text-white">
                            Login with Google
                          </span>
                        </div>
                      </React.Fragment>
                    </button>
                  </div>
                )}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
