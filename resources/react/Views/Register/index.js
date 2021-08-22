import React from 'react';
import '../styles/loginRegister.scss';
import {Link} from "react-router-dom"

const Register = () => {
    return (<div>
        <div className="text-center">
            <div className="text-center">
            <form className="form-signin">
                <img className="mb-4" src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Kayıt Ol</h1>
                <div className="form-group">
                    <label for="inputName" className="sr-only">Ad Soyad </label>
                        <input type="email" id="inputName" className="form-control" placeholder="Ad Soyads" required="" autofocus=""/>
                </div>
                <div className="form-group">
                    <label for="inputEmail" className="sr-only">Email </label>
                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="" autofocus=""/>
                </div>
                
                <div className="form-group">
                    <label for="inputPassword" className="sr-only">Şifre</label>
                    <input type="password" id="inputPassword" className="form-control" placeholder="Password" required=""/>
                </div>
                <div className="form-group">
                    <label for="inputPasswordRepeat" className="sr-only">Şifre Tekrar</label>
                    <input type="password" id="inputPasswordRepeat" className="form-control" placeholder="Password" required=""/>
                </div>
                
                <div className="checkbox mb-3">
                    <label>
                    <input type="checkbox" value="remember-me"/> Remember me
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block" type="submit">Kayıt Ol</button>
                <Link to="/login" className="mt-3 d-block">Giriş Yap</Link>
                <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
            </form>
        </div>
        </div>
    </div>)
}

export default Register;