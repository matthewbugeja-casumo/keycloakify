// This is a copy paste from https://github.com/InseeFrLab/keycloakify/blob/main/src/lib/components/Register.tsx
// It is now up to us to implement a special behavior to leverage the non standard authorizedMailDomains
// provided by the plugin: https://github.com/micedre/keycloak-mail-whitelisting installed on our keycloak server.
// Note that it is no longer recommended to use register.ftl, it's best to use register-user-profile.ftl
// See: https://docs.keycloakify.dev/realtime-input-validation

import { memo } from "react";
import Template from "keycloakify/lib/components/Template";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";
import { clsx } from "keycloakify/lib/tools/clsx";
import type { I18n } from "./i18n";
import { useState } from "react";

type KcContext_Login = Extract<KcContext, { pageId: "login.ftl" }>;

const Login = memo(
  ({
    kcContext,
    i18n,
    ...props
  }: { kcContext: KcContext_Login; i18n: I18n } & KcProps) => {
    const { msg, msgStr } = i18n;

    const {
      social,
      realm,
      url,
      usernameEditDisabled,
      login,
      messagesPerField,
      auth,
      registrationDisabled,
      recaptchaRequired,
      recaptchaSiteKey,
    } = kcContext;

    const [usernameFieldValue, setUsernameFieldValue] = useState("");
    const [passwordFieldValue, setPasswordFieldValue] = useState("");

    const validate = () => {
      return usernameFieldValue.length && passwordFieldValue.length;
    };

    return (
      <Template
        {...{ kcContext, i18n, ...props }}
        doFetchDefaultThemeResources={true}
        headerNode={msg("loginAccountTitle")}
        formNode={
          <div id="kc-form">
            <div id="kc-form-wrapper">
              <form
                // onSubmit={login.disabled = true; return true;}
                id="kc-form-login"
                className={clsx(props.kcFormClass)}
                action={url.loginAction}
                method="post"
              >
                <div className={clsx(props.kcFormGroupClass)}>
                  <div className={clsx(props.kcLabelWrapperClass)}>
                    <label
                      htmlFor="username"
                      className={clsx(props.kcLabelClass)}
                    >
                      {!realm.loginWithEmailAllowed
                        ? msg("username")
                        : !realm.registrationEmailAsUsername
                        ? msg("usernameOrEmail")
                        : msg("email")}
                    </label>
                  </div>
                  <div className={clsx(props.kcInputWrapperClass)}>
                    <input
                      type="text"
                      id="username"
                      className={clsx(
                        props.kcInputClass,
                        messagesPerField.existsError("username") && "inputError"
                      )}
                      name="username"
                      defaultValue={login.username ?? ""}
                      aria-invalid={messagesPerField.existsError("username")}
                      placeholder={msgStr("usernamePlaceholder")}
                      onChange={(e) => setUsernameFieldValue(e.target.value)}
                    />
                    {messagesPerField.existsError("username") && (
                      <div className="error-icon">
                        <span className="pficon material-symbols-outlined">error</span>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={clsx(props.kcFormGroupClass)}
                  id="password-field"
                >
                  <div className={clsx(props.kcLabelWrapperClass)}>
                    <label
                      htmlFor="password"
                      className={clsx(props.kcLabelClass)}
                    >
                      {msg("password")}
                    </label>
                  </div>
                  <div className={clsx(props.kcInputWrapperClass)}>
                    <input
                      type="password"
                      id="password"
                      className={clsx(
                        props.kcInputClass,
                        messagesPerField.existsError("username") && "inputError"
                      )}
                      name="password"
                      aria-invalid={messagesPerField.existsError("password")}
                      placeholder={msgStr("passwordPlaceholder")}
                      onChange={(e) => setPasswordFieldValue(e.target.value)}
                    />
                    {messagesPerField.existsError("username") && (
                      <div className="error-icon">
                        <span  className="pficon material-symbols-outlined">error</span>
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={clsx(
                    props.kcFormGroupClass,
                    props.kcFormSettingClass
                  )}
                >
                  <div className={clsx(props.kcFormOptionsWrapperClass)}>
                    {realm.resetPasswordAllowed && (
                      <span>
                        <a href={url.loginResetCredentialsUrl}>
                          {msg("doForgotPassword")}
                        </a>
                      </span> 
                    )}
                  </div>
                </div>

                {messagesPerField.existsError("username") && (
                  <div className="alert-casumo">
                    <span className="pficon material-symbols-outlined">error</span>
                    <span
                      id="input-error"
                      className={clsx(props.kcInputErrorMessageClass)}
                      aria-live="polite"
                    >
                      {messagesPerField.get("username")}
                    </span>
                  </div>
                )}
                {/* {recaptchaRequired && ( */}
                  <div className="form-group-casumo">
                    <div className={clsx(props.kcInputWrapperClass)}>
                      <div
                        className="g-recaptcha"
                        data-size="compact"
                        data-sitekey={recaptchaSiteKey}
                      ></div>
                    </div>
                  </div>
                {/* )} */}

                <div
                  id="kc-form-buttons"
                  className={clsx(props.kcFormGroupClass)}
                >
                  <input
                    type="hidden"
                    id="id-hidden-input"
                    name="credentialId"
                    value={
                      auth.selectedCredential ? auth.selectedCredential : ""
                    }
                  />
                  <input
                    className={clsx(
                      props.kcButtonClass,
                      props.kcButtonPrimaryClass,
                      props.kcButtonBlockClass,
                      props.kcButtonLargeClass
                    )}
                    name="login"
                    id="kc-login"
                    type="submit"
                    value={msgStr("doLogIn")}
                    disabled={!validate()}
                  />
                </div>
              </form>
            </div>
          </div>
        }
      />
    );
  }
);

export default Login;
