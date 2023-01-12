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

type KcContext_Login_Otp = Extract<KcContext, { pageId: "login-otp.ftl" }>;

const LoginOtp = memo(
  ({
    kcContext,
    i18n,
    ...props
  }: { kcContext: KcContext_Login_Otp; i18n: I18n } & KcProps) => {
    const { msg, msgStr } = i18n;

    const { url, messagesPerField,} = kcContext;

    const [codeFieldValue, setCodeFieldValue] = useState("");

    const validate = () => {
      return codeFieldValue.length;
    };

    return (
      <Template
        {...{ kcContext, i18n, ...props }}
        doFetchDefaultThemeResources={true}
        headerNode={msg("mfaAuthTitle")}
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
                    <label htmlFor="code" className={clsx(props.kcLabelClass)}>
                      {msg("mfaAuthSubject")}
                    </label>
                  </div>
                  <div className={clsx(props.kcInputWrapperClass)}>
                    <input
                      type="text"
                      id="code"
                      className={clsx(
                        props.kcInputClass,
                      )}
                      name="code"
                      onChange={(e) => setCodeFieldValue(e.target.value)}
                    />
                  </div>
                </div>

                {messagesPerField.existsError("totp") && (
                  <div className="alert-casumo">
                    <span className="pficon material-symbols-outlined">
                      error
                    </span>
                    <span
                      id="input-error"
                      className={clsx(props.kcInputErrorMessageClass)}
                      aria-live="polite"
                    >
                      {messagesPerField.get("totp")}
                    </span>
                  </div>
                )}

                <span id="forgot-password-instructions">
                  {msg("mfaInstructions")}
                </span>

                <div
                  id="kc-form-buttons"
                  className={clsx(props.kcFormGroupClass)}
                >
                  <input
                    name="button"
                    className={clsx(
                      props.kcButtonClass,
                      props.kcButtonPrimaryClass,
                      props.kcButtonBlockClass,
                      props.kcButtonLargeClass
                    )}
                    type="submit"
                    value={msgStr("doSubmit")}
                    disabled={!validate()}

                  />

                  <a href={url.loginUrl}>
                    <span
                      className={clsx(
                        "back-to-login-btn",
                        // props.kcButtonClass,
                        // props.kcButtonPrimaryClass,
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

export default LoginOtp;
