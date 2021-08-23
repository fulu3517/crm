import React from 'react';
import '../styles/loginRegister.scss';
import { Link } from "react-router-dom"
import { Formik, Field } from 'formik';
import * as Yup from 'yup';


const handleFormSubmit = () => {
    alert("tıklandı")
}
const Register = () => {
    return (<div>
        <div className="text-center">
            <div className="text-center">
            <div className="form-signin">
                <img className="mb-4" src="https://getbootstrap.com/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72"/>
                <h1 className="h3 mb-3 font-weight-normal">Kayıt Ol</h1>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            password_confirmation: ''
                        }}
                        onSubmit={handleFormSubmit}
                        validationSchema={
                            Yup.object().shape({
                                email: Yup
                                    .string()
                                    .email('Email Formatı Hatalı')
                                    .required('Email Zorunlu Alandır'),
                                name: Yup.string().required('Ad Soyad Zorunlu Alandır'),
                                password: Yup.string().required("Şifre Zorunludur"),
                                password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Şifreler Eşleşmiyor')
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
                                    <label htmlFor="inputName" className="sr-only">Ad Soyad </label>
                                    <input
                                        type="text"
                                        id="inputName"
                                        className="form-control"
                                        placeholder="Ad Soyad"
                                        value={values.name}
                                        onChange={handleChange('name')}
                                        onBlur={handleBlur}
                                        name="name"
                                    />
                                    {(errors.name && touched.name) && <p>{ errors.name }</p>}
                                </div>
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
                                <div className="form-group">
                                    <label htmlFor="inputPasswordRepeat" className="sr-only">Şifre Tekrar</label>
                                    <input
                                        type="password"
                                        id="inputPasswordRepeat"
                                        className="form-control"
                                        placeholder="Password Confirm"
                                        value={values.password_confirmation}
                                        onChange={handleChange('password_confirmation')}
                                        onBlur={handleBlur}
                                        name="password_confirmation"
                                    />
                                    {(errors.password_confirmation && touched.password_confirmation) && <p>{ errors.password_confirmation }</p>}
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
                                >Kayıt Ol</button>
                            </div>
)
                        }
                </Formik>
                <Link to="/login" className="mt-3 d-block">Giriş Yap</Link>
                <p className="mt-5 mb-3 text-muted">© 2017-2019</p>
            </div>
        </div>
        </div>
    </div>)
}

export default Register;