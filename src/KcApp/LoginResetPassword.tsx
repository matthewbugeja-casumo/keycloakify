import { memo } from "react";
import Template from "keycloakify/lib/components/Template";
import type { KcProps } from "keycloakify";
import type { KcContext } from "./kcContext";
import { clsx } from "keycloakify/lib/tools/clsx";
import type { I18n } from "./i18n";
import { useState } from "react";

type KcContext_Login_Reset_Password = Extract<
  KcContext,
  { pageId: "login-reset-password.ftl" }
>;

const LoginResetPassword = memo(
  ({
    kcContext,
    i18n,
    ...props
  }: { kcContext: KcContext_Login_Reset_Password; i18n: I18n } & KcProps) => {
    const { msg, msgStr } = i18n;

    const { realm, url, messagesPerField, auth } = kcContext;

    const [usernameFieldValue, setUsernameFieldValue] = useState("");

    const validate = () => {
      return usernameFieldValue.length;
    };

    return (
      <Template
        {...{ kcContext, i18n, ...props }}
        doFetchDefaultThemeResources={true}
        headerNode={msg("emailForgotTitle")}
        formNode={
          <div id="kc-form">
            <div id="kc-form-wrapper">
              <form
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
                      aria-invalid={messagesPerField.existsError("username")}
                      placeholder={msgStr("usernamePlaceholder")}
                      onChange={(e) => setUsernameFieldValue(e.target.value)}
                    />
                    {messagesPerField.existsError("username") && (
                      <div className="error-icon">
                        <span className="pficon material-symbols-outlined">
                          error
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {messagesPerField.existsError("username") && (
                  <div className="alert-casumo">
                    <span className="pficon material-symbols-outlined">
                      error
                    </span>
                    <span
                      id="input-error"
                      className={clsx(props.kcInputErrorMessageClass)}
                      aria-live="polite"
                    >
                      {messagesPerField.get("username")}
                    </span>
                  </div>
                )}
                <span id='forgot-password-instructions'>
                 {msg("forgotPasswordInstructions")}
                </span>

                <div
                  className={clsx(
                    props.kcFormGroupClass,
                    props.kcFormSettingClass
                  )}
                ></div>
                <div
                  className={clsx(props.kcFormGroupClass)}
                >
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
                    value={msgStr("doSubmit")}
                    disabled={!validate()}
                  />
                </div>
                <div className={clsx(props.kcFormOptionsWrapperClass)}>
                  <a href={url.loginUrl}>
                    <span
                      className={clsx(
                        "back-to-login-btn",
                        props.kcButtonBlockClass,
                        props.kcButtonLargeClass
                      )}
                    >
                      {msg("backToLogin")}
                    </span>
                  </a>
                </div>
              </form>
            </div>
          </div>
        }
      />
    );
  }
);

export default LoginResetPassword;
