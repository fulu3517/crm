import React, { useState } from 'react';
import '../styles/loginRegister.scss';
import { Link } from "react-router-dom"
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { inject, observer } from 'mobx-react';

const Login = (props) => {
    console.log("props", props)
    const [errors, setErrors] = useState([]);

    const handleFormSubmit = (values) => {
        //burda values formikten geliyor
        axios.post('api/auth/login',
            { ...values }
        ).then(res => {
            if (res.data.success) {
                const userData = {
                    id: res.data.id,
                    name: res.data.name,
                    email: res.data.email,
                    access_token: res.data.access_token
                }
    
                const appState = {
                    isLoggedIn: true,
                    user: userData
                }
                props.AuthStore.saveToken(appState);
                props.history.push('/');
            } else {
                alert("giriş Yapamadınız")
            }
            console.log(res);
        }).catch((error) => {
            console.log("error", error);
            if (error.response) {
                let err = error.response.data;
                console.log(err.errors);
                setErrors(err.errors)
            } else if (error.request) {
                let err = error.request;
                alert(err);
            } else {
                
            }
        });
    }
    

    let errorsArr = [];
    Object.values(errors).forEach(value => {
        errorsArr.push(value);
    })
    return (<div>
        <div className="text-center">
            <div className="text-center">
            <div className="form-signin">
                <img className="mb-4" src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                    <h1 className="h3 mb-3 font-weight-normal">Giriş Yap</h1>
                    {errors.length != 0 &&
                        errorsArr.map((item, i )=> <p key={ i++ } className="text-danger">{ item }</p>)
                        // console.log(errorsArr)
                    }
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                        }}
                        onSubmit={handleFormSubmit}
                        validationSchema={
                            Yup.object().shape({
                                email: Yup
                                    .string()
                                    .email('Email Formatı Hatalı')
                                    .required('Email Zorunlu Alandır'),
                                password: Yup.string().required("Şifre Zorunludur"),
                            })
                        }
                    >
                        {({// Bu kısım formikden geliyor
                            values,
                            handleChange,
                            handleSubmit,
                            handleBlur,
                            errors,
                            isValid,
                            isSubmitting,
                            touched

                        }) => (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="inputEmail" className="sr-only">Email </label>
                                    <input
                                        type="email"
                                        id="inputEmail"
                                        className="form-control"
                                        placeholder="Email address"
                                        value={values.email}
                                        onChange={handleChange('email')}
                                        onBlur={handleBlur}
                                        name="email"
                                    />
                                    {(errors.email && touched.email) && <p>{ errors.email }</p>}
                                </div>
                                
                                <div className="form-group">
                                    <label htmlFor="inputPassword" className="sr-only">Şifre</label>
                                    <input type="password"
                                        id="inputPassword"
                                        className="form-control"
                                        placeholder="Password"
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        onBlur={handleBlur}
                                        name="password"
                                    />
                                    {(errors.password && touched.password) && <p>{ errors.password }</p>}
                                </div>
                                
                                <div className="checkbox mb-3">
                                    <label>
                                    <input type="checkbox" value="remember-me"/> Remember me
                                    </label>
                                </div>
                                <button
                                    className="btn btn-lg btn-primary btn-block"
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled= {!isValid || isSubmitting}
                                >Giriş Yap</button>
                            </div>
)
                        }
                </Formik>
                <Link to="/register" className="mt-3 d-block">Kayıt Ol</Link>
                <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
            </div>
        </div>
        </div>
    </div>)
}

export default inject("AuthStore")(observer(Login));