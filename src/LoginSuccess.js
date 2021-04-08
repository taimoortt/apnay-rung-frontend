import Logo from "./css/logo.png";

const LoginSuccess = () => {
  return (
    <div className="form-content-right">
      <div className="form-success">We have received your request!</div>
      <img src={Logo} alt="Apnay-rung-logo" />
    </div>
  );
};

export default LoginSuccess;