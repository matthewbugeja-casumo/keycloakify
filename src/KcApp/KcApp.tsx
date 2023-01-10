import "./KcApp.css";
import { lazy, Suspense } from "react";
import type { KcContext } from "./kcContext";
import KcAppBase, { defaultKcProps } from "keycloakify";
import { useI18n } from "./i18n";
import LoginOtp from "./login-otp";

const Register = lazy(() => import("./Register"));
const Terms = lazy(() => import("./Terms"));
const MyExtraPage1 = lazy(() => import("./MyExtraPage1"));
const MyExtraPage2 = lazy(() => import("./MyExtraPage2"));
const Login = lazy(() => import("./Login"));
const LoginResetPassword = lazy(() => import("./LoginResetPassword"));

export type Props = {
  kcContext: KcContext;
};

export default function KcApp({ kcContext }: Props) {
  const i18n = useI18n({ kcContext });

  //NOTE: Locales not yet downloaded
  if (i18n === null) {
    return null;
  }

  const props = {
    i18n,
    ...defaultKcProps,
    kcFormOptionsWrapperClass: "form-options-casumo",
    kcHeaderWrapperClass: "header-wrapper-casumo",
    kcHtmlClass: "login-new",
    kcFormCardClass: "card-pf-casumo",
    kcFormHeaderClass: "header-casumo",
    kcSelectOTPItemHeadingClass: "header-text-casumo",
    kcLabelClass: "label-casumo",
    kcInputClass: "form-control-casumo",
    kcFormGroupClass: "form-group-casumo",
    kcFormSettingClass: "login-pf-settings",
    kcSignUpClass: "sign-up-link-casumo",
    kcButtonPrimaryClass: "btn-primary-casumo",
    kcUsernamePassword: "username-password-fields",
    kcButtonClass: "btn",
    // NOTE: The classes are defined in ./KcApp.css
  };

  return (
    <Suspense>
      {(() => {
        switch (kcContext.pageId) {
          case "login.ftl":
            return (
              <Login
                {...{
                  kcContext,
                  ...props,
                  kcFormOptionsWrapperClass: "form-options-casumo",
                  kcHeaderWrapperClass: "header-wrapper-casumo",
                  kcHtmlClass: "login-new",
                  kcFormCardClass: "card-pf-casumo",
                  kcFormHeaderClass: "header-casumo",
                  kcSelectOTPItemHeadingClass: "header-text-casumo",
                  kcLabelClass: "label-casumo",
                  kcInputClass: "form-control-casumo",
                  kcFormGroupClass: "form-group-casumo",
                  kcFormSettingClass: "login-pf-settings",
                  kcSignUpClass: "sign-up-link-casumo",
                  kcButtonPrimaryClass: "btn-primary-casumo",
                  kcUsernamePassword: "username-password-fields",
                  kcButtonClass: "btn",
                }}
              />
            );
          case "register.ftl":
            return <Register {...{ kcContext, ...props }} />;
          case "terms.ftl":
            return <Terms {...{ kcContext, ...props }} />;
          case "my-extra-page-1.ftl":
            return <MyExtraPage1 {...{ kcContext, ...props }} />;
            case "my-extra-page-2.ftl":
              return <MyExtraPage2 {...{ kcContext, ...props }} />;
          case "login-otp.ftl":
            return <LoginOtp {...{ kcContext, ...props }} />;
          case "login-reset-password.ftl":
            return <LoginResetPassword {...{ kcContext, ...props }} />;
          default:
            return <KcAppBase {...{ kcContext, ...props }} />;
        }
      })()}
    </Suspense>
  );
}
