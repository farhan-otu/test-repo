import { jsx as t, jsxs as C, Fragment as j } from "react/jsx-runtime";
import { AlertGroup as en, Alert as tn, AlertVariant as Pe, AlertActionCloseButton as nn, Page as rn, Modal as vt, ModalVariant as an, Button as N, TextContent as ln, Text as Me, Spinner as Ct, FormHelperText as Ke, HelperText as He, HelperTextItem as We, Popover as on, Icon as Le, FormGroup as kt, NumberInput as sn, ValidatedOptions as G, InputGroup as ke, InputGroupItem as Ne, TextInput as Ie, Select as we, MenuToggle as ce, MenuToggleStatus as je, SelectList as xe, SelectOption as Ge, TextInputGroup as It, TextInputGroupMain as wt, ChipGroup as ze, Chip as Je, TextInputGroupUtilities as xt, Switch as cn, TextArea as St, Title as dn, Card as un, CardHeader as hn, CardTitle as pn, CardBody as mn, Grid as fn, GridItem as it, PageSection as gn, JumpLinks as yn, JumpLinksItem as bn, ButtonVariant as ve, Checkbox as vn, Radio as Cn, MenuFooter as kn, Dropdown as In, DropdownList as wn, DropdownItem as ot, Masthead as xn, MastheadToggle as Sn, PageToggleButton as Tn, MastheadBrand as An, MastheadContent as En, Toolbar as be, ToolbarContent as Be, ToolbarItem as U, Avatar as Rn, Bullseye as On, EmptyState as Dn, EmptyStateIcon as st, EmptyStateHeader as Fn, EmptyStateBody as Pn, EmptyStateFooter as Mn, EmptyStateActions as Ln, SearchInput as Nn, Divider as Bn, Pagination as Vn, Badge as _n } from "@patternfly/react-core";
import { createContext as Tt, useContext as At, useRef as z, useEffect as re, useCallback as se, useState as S, useMemo as V, forwardRef as qn, useId as Et, Fragment as Rt, Children as Ot, Component as $n, isValidElement as Un } from "react";
import { useTranslation as _ } from "react-i18next";
import { NetworkError as Dt } from "@keycloak/keycloak-admin-client";
import Kn from "keycloak-js";
import { ExclamationCircleIcon as Hn, HelpIcon as ct, EyeIcon as Wn, EyeSlashIcon as jn, TimesIcon as Ft, CubeIcon as Gn, PaypalIcon as zn, InstagramIcon as Jn, BitbucketIcon as Yn, MicrosoftIcon as Qn, TwitterIcon as Xn, StackOverflowIcon as Zn, OpenshiftIcon as er, LinkedinIcon as tr, GoogleIcon as nr, GitlabIcon as rr, FacebookSquareIcon as ar, GithubIcon as lr, MinusCircleIcon as ir, PlusCircleIcon as Pt, EllipsisVIcon as or, BarsIcon as sr, SearchIcon as cr, SyncAltIcon as dr } from "@patternfly/react-icons";
import { useFormContext as Se, Controller as ae, useController as Ye, FormProvider as ur, useWatch as hr } from "react-hook-form";
import { get as L, intersectionBy as pr, cloneDeep as mr } from "lodash-es";
import fe from "@patternfly/react-styles/css/components/Avatar/avatar";
import { css as fr } from "@patternfly/react-styles";
import { Table as gr, TableVariant as yr, Thead as br, Tr as ge, Th as De, Tbody as dt, Td as te, ActionsColumn as vr, ExpandableRowContent as Cr, TableText as kr } from "@patternfly/react-table";
import './main.css';function Qe(e, n) {
  const r = Tt(n);
  return r.displayName = e, r;
}
const Ir = ["error", "errorMessage"], Fe = "error_description";
function wr(e) {
  if (typeof e == "string")
    return e;
  if (e instanceof Dt)
    return Sr(e.responseData);
  if (e instanceof Error)
    return e.message;
  throw new Error("Unable to determine error message.");
}
function xr(e) {
  if (!(e instanceof Dt))
    return;
  const n = e.responseData;
  return Mt(n);
}
function Mt(e) {
  if (typeof e == "object" && e !== null && Fe in e && typeof e[Fe] == "string")
    return e[Fe];
}
function Sr(e) {
  if (!(typeof e != "object" || e === null))
    for (const n of Ir) {
      const r = e[n];
      if (typeof r == "string")
        return r;
    }
}
const Tr = () => Math.floor(Math.random() * 1e3);
function Ar(e) {
  return e != null;
}
function Xe(e) {
  const n = At(e);
  if (Ar(n))
    return n;
  throw new Error(
    `No provider found for ${e.displayName ? `the '${e.displayName}'` : "an unknown"} context, make sure it is included in your component hierarchy.`
  );
}
function Er() {
  const e = z(!1), n = z(/* @__PURE__ */ new Set());
  re(() => (e.current = !1, () => {
    e.current = !0, r();
  }), []);
  function r() {
    n.current.forEach((a) => clearTimeout(a)), n.current.clear();
  }
  return se((a, l) => {
    if (e.current)
      throw new Error("Can't schedule a timeout on an unmounted component.");
    const i = Number(setTimeout(o, l));
    n.current.add(i);
    function o() {
      n.current.delete(i), a();
    }
    return function() {
      clearTimeout(i), n.current.delete(i);
    };
  }, []);
}
function Rr({ alerts: e, onCloseAlert: n }) {
  return /* @__PURE__ */ t(
    en,
    {
      "data-testid": "global-alerts",
      isToast: !0,
      style: { whiteSpace: "pre-wrap" },
      children: e.map(({ id: r, variant: a, message: l, description: i }, o) => /* @__PURE__ */ t(
        tn,
        {
          "data-testid": o === 0 ? "last-alert" : void 0,
          isLiveRegion: !0,
          variant: Pe[a],
          component: "p",
          variantLabel: "",
          title: l,
          actionClose: /* @__PURE__ */ t(
            nn,
            {
              title: l,
              onClose: () => n(r)
            }
          ),
          children: i && /* @__PURE__ */ t("p", { children: i })
        },
        r
      ))
    }
  );
}
const Or = 8e3, Lt = Qe(
  "AlertContext",
  void 0
), Va = () => Xe(Lt), Dr = ({ children: e }) => {
  const { t: n } = _(), r = Er(), [a, l] = S([]), i = (c) => l((h) => h.filter((u) => u.id !== c)), o = se(
    (c, h = Pe.success, u) => {
      const f = {
        id: Tr(),
        message: c,
        variant: h,
        description: u
      };
      l((p) => [f, ...p]), r(() => i(f.id), Or);
    },
    [r]
  ), s = se(
    (c, h) => {
      const u = n(c, { error: wr(h) }), f = xr(h);
      o(u, Pe.danger, f);
    },
    [o, n]
  ), d = V(() => ({ addAlert: o, addError: s }), [o, s]);
  return /* @__PURE__ */ C(Lt.Provider, { value: d, children: [
    /* @__PURE__ */ t(Rr, { alerts: a, onCloseAlert: i }),
    e
  ] });
}, Fr = (e) => {
  const { t: n } = _(), r = e.error, a = Pr(r) || Mt(r)?.replace(/\+/g, " ");
  console.error(r);
  function l() {
    location.href = location.origin + location.pathname;
  }
  return /* @__PURE__ */ t(rn, { children: /* @__PURE__ */ t(
    vt,
    {
      variant: an.small,
      title: a ? "" : n("somethingWentWrong"),
      titleIconVariant: "danger",
      showClose: !1,
      isOpen: !0,
      actions: [
        /* @__PURE__ */ t(N, { variant: "primary", onClick: l, children: n("tryAgain") }, "tryAgain")
      ],
      children: /* @__PURE__ */ t(ln, { children: a ? /* @__PURE__ */ t(Me, { children: n(a) }) : /* @__PURE__ */ t(Me, { children: n("somethingWentWrongDescription") }) })
    }
  ) });
};
function Pr(e) {
  return typeof e == "string" ? e : e instanceof Error ? e.message : null;
}
function Mr(e, n, r) {
  const [a, l] = S(
    () => e.getItem(n) ?? r
  ), i = se((o) => {
    l(o), e.setItem(n, o);
  }, []);
  return re(() => {
    l(e.getItem(n) ?? r), window.addEventListener("storage", o);
    function o(s) {
      s.storageArea === e && (s.key === null || s.key === n) && l(s.newValue ?? r);
    }
    return () => window.removeEventListener("storage", o);
  }, [e, n]), [a, i];
}
function Nt(e, n, r) {
  const a = V(
    () => JSON.stringify(r),
    [r]
  ), [l, i] = Mr(
    e,
    n,
    a
  ), o = V(() => JSON.parse(l), [l]), s = se(
    (d) => i(JSON.stringify(d)),
    []
  );
  return [o, s];
}
const Bt = Qe(
  "HelpContext",
  void 0
), Lr = () => Xe(Bt), Nr = ({ children: e }) => {
  const [n, r] = Nt(localStorage, "helpEnabled", !0);
  function a() {
    r(!n);
  }
  return /* @__PURE__ */ t(Bt.Provider, { value: { enabled: n, toggleHelp: a }, children: e });
}, Br = () => Tt(void 0);
let Ve;
const _a = () => {
  const e = At(Ve);
  if (!e)
    throw Error(
      "no environment provider in the hierarchy make sure to add the provider"
    );
  return e;
}, qa = ({
  environment: e,
  children: n
}) => {
  Ve = Br();
  const r = z(!1), [a, l] = S(!1), [i, o] = S(), s = V(() => {
    const c = new Kn({
      url: e.serverBaseUrl,
      realm: e.realm,
      clientId: e.clientId
    });
    return c.onAuthLogout = () => c.login(), c;
  }, [e]);
  re(() => {
    if (r.current)
      return;
    s.init({
      onLoad: "check-sso",
      pkceMethod: "S256",
      responseMode: "query"
    }).then(() => l(!0)).catch((h) => o(h)), r.current = !0;
  }, [s]);
  const d = new URLSearchParams(window.location.search);
  return i || d.get("error_description") ? /* @__PURE__ */ t(
    Fr,
    {
      error: i || d.get("error_description")
    }
  ) : a ? /* @__PURE__ */ t(Ve.Provider, { value: { environment: e, keycloak: s }, children: /* @__PURE__ */ t(Dr, { children: /* @__PURE__ */ t(Nr, { children: n }) }) }) : /* @__PURE__ */ t(Ct, {});
};
function $a() {
  const n = document.getElementById("environment")?.textContent;
  if (typeof n != "string")
    throw new Error("Environment variables not found in the document.");
  try {
    return JSON.parse(n);
  } catch {
    throw new Error("Unable to parse environment variables as JSON.");
  }
}
const Ua = ({
  modalTitle: e,
  continueLabel: n,
  cancelLabel: r,
  buttonTitle: a,
  isDisabled: l,
  buttonVariant: i,
  buttonTestRole: o,
  onContinue: s,
  component: d = N,
  children: c,
  ...h
}) => {
  const [u, f] = S(!1);
  return /* @__PURE__ */ C(j, { children: [
    /* @__PURE__ */ t(
      d,
      {
        variant: i,
        onClick: () => f(!0),
        isDisabled: l,
        "data-testrole": o,
        children: a
      }
    ),
    /* @__PURE__ */ t(
      vt,
      {
        variant: "small",
        ...h,
        title: e,
        isOpen: u,
        onClose: () => f(!1),
        actions: [
          /* @__PURE__ */ t(
            N,
            {
              id: "modal-confirm",
              variant: "primary",
              onClick: () => {
                f(!1), s();
              },
              children: n
            },
            "confirm"
          ),
          /* @__PURE__ */ t(
            N,
            {
              id: "modal-cancel",
              variant: "secondary",
              onClick: () => f(!1),
              children: r
            },
            "cancel"
          )
        ],
        children: c
      }
    )
  ] });
}, Vt = ({ message: e, ...n }) => /* @__PURE__ */ t(Ke, { ...n, children: /* @__PURE__ */ t(He, { children: /* @__PURE__ */ t(We, { icon: /* @__PURE__ */ t(Hn, {}), variant: "error", children: e }) }) }), _t = ({
  helpText: e,
  fieldLabelId: n,
  noVerticalAlign: r = !0,
  unWrap: a = !1
}) => {
  const { enabled: l } = Lr();
  return l ? /* @__PURE__ */ t(on, { bodyContent: e, children: /* @__PURE__ */ C(j, { children: [
    !a && /* @__PURE__ */ t(
      "button",
      {
        "data-testid": `help-label-${n}`,
        "aria-label": n,
        onClick: (i) => i.preventDefault(),
        className: "pf-v5-c-form__group-label-help",
        children: /* @__PURE__ */ t(Le, { isInline: r, children: /* @__PURE__ */ t(ct, {}) })
      }
    ),
    a && /* @__PURE__ */ t(Le, { isInline: r, children: /* @__PURE__ */ t(ct, {}) })
  ] }) }) : null;
};
function de(e) {
  if (!(typeof e > "u" || e instanceof RegExp))
    return typeof e == "object" ? e.value : e;
}
const ee = ({
  name: e,
  label: n,
  labelIcon: r,
  error: a,
  children: l,
  ...i
}) => /* @__PURE__ */ C(
  kt,
  {
    label: n || e,
    fieldId: e,
    labelIcon: r ? /* @__PURE__ */ t(_t, { helpText: r, fieldLabelId: e }) : void 0,
    ...i,
    children: [
      l,
      a && /* @__PURE__ */ t(Vt, { "data-testid": `${e}-helper`, message: a.message })
    ]
  }
), Ka = ({
  name: e,
  label: n,
  controller: r,
  labelIcon: a,
  ...l
}) => {
  const {
    control: i,
    formState: { errors: o }
  } = Se();
  return /* @__PURE__ */ t(
    ee,
    {
      name: e,
      label: n,
      isRequired: r.rules?.required === !0,
      error: o[e],
      labelIcon: a,
      children: /* @__PURE__ */ t(
        ae,
        {
          ...r,
          name: e,
          control: i,
          render: ({ field: s }) => {
            const d = !!r.rules?.required, c = de(r.rules?.min), h = s.value ?? r.defaultValue, u = (f) => s.onChange(
              c !== void 0 ? Math.max(f, Number(c)) : f
            );
            return /* @__PURE__ */ t(
              sn,
              {
                ...l,
                id: e,
                value: h,
                validated: o[e] ? G.error : G.default,
                required: d,
                min: Number(c),
                max: Number(r.rules?.max),
                onPlus: () => u(h + 1),
                onMinus: () => u(h - 1),
                onChange: (f) => {
                  const p = Number(f.currentTarget.value);
                  u(isNaN(p) ? r.defaultValue : p);
                }
              }
            );
          }
        }
      )
    }
  );
}, Vr = ({
  hasReveal: e = !0,
  innerRef: n,
  ...r
}) => {
  const { t: a } = _(), [l, i] = S(!0);
  return /* @__PURE__ */ C(ke, { children: [
    /* @__PURE__ */ t(Ne, { isFill: !0, children: /* @__PURE__ */ t(
      Ie,
      {
        ...r,
        type: l ? "password" : "text",
        ref: n
      }
    ) }),
    e && /* @__PURE__ */ t(
      N,
      {
        variant: "control",
        "aria-label": a("showPassword"),
        onClick: () => i(!l),
        children: l ? /* @__PURE__ */ t(Wn, {}) : /* @__PURE__ */ t(jn, {})
      }
    )
  ] });
}, qt = qn(
  (e, n) => /* @__PURE__ */ t(Vr, { ...e, innerRef: n })
);
qt.displayName = "PasswordInput";
const Ha = (e) => {
  const { labelIcon: n, ...r } = e, a = !!de(e.rules?.required), l = e.defaultValue ?? "", { field: i, fieldState: o } = Ye({
    ...e,
    defaultValue: l
  });
  return /* @__PURE__ */ C(
    ee,
    {
      name: e.name,
      label: e.label,
      labelIcon: n,
      isRequired: a,
      error: o.error,
      children: [
        /* @__PURE__ */ t(
          qt,
          {
            isRequired: a,
            id: e.name,
            "data-testid": e.name,
            validated: o.error ? G.error : G.default,
            isDisabled: e.isDisabled,
            ...r,
            ...i
          }
        ),
        e.helperText && /* @__PURE__ */ t(Ke, { children: /* @__PURE__ */ t(He, { children: /* @__PURE__ */ t(We, { children: e.helperText }) }) })
      ]
    }
  );
}, _r = ({
  id: e,
  name: n,
  label: r,
  options: a,
  controller: l,
  labelIcon: i,
  ...o
}) => {
  const {
    control: s,
    formState: { errors: d }
  } = Se(), [c, h] = S(!1), u = de(l.rules?.required) === !0;
  return /* @__PURE__ */ t(
    ee,
    {
      name: n,
      label: r,
      isRequired: u,
      error: L(d, n),
      labelIcon: i,
      children: /* @__PURE__ */ t(
        ae,
        {
          ...l,
          name: n,
          control: s,
          render: ({ field: { onChange: f, value: p } }) => /* @__PURE__ */ t(
            we,
            {
              ...o,
              onClick: () => h(!c),
              onOpenChange: () => h(!1),
              selected: oe(a) ? a.filter(
                (g) => Array.isArray(p) ? p.includes(g.key) : p === g.key
              ).map((g) => g.value) : p,
              toggle: (g) => /* @__PURE__ */ t(
                ce,
                {
                  id: e || n.slice(n.lastIndexOf(".") + 1),
                  ref: g,
                  onClick: () => h(!c),
                  isExpanded: c,
                  isFullWidth: !0,
                  status: L(d, n) ? je.danger : void 0,
                  "aria-label": "toggle",
                  children: oe(a) ? a.find(
                    (A) => A.key === (Array.isArray(p) ? p[0] : p)
                  )?.value : p
                }
              ),
              onSelect: (g, A) => {
                const y = A?.toString();
                f(Array.isArray(p) ? [y] : y), h(!1);
              },
              isOpen: c,
              children: /* @__PURE__ */ t(xe, { "data-testid": `select-${n}`, children: a.map((g) => /* @__PURE__ */ t(Ge, { value: X(g), children: Ze(g) ? g : g.value }, X(g))) })
            }
          )
        }
      )
    }
  );
}, ye = (e) => Ze(e) ? e : e.value, qr = ({
  id: e,
  name: n,
  label: r,
  options: a,
  controller: l,
  labelIcon: i,
  placeholderText: o,
  onFilter: s,
  variant: d,
  ...c
}) => {
  const {
    control: h,
    formState: { errors: u }
  } = Se(), [f, p] = S(!1), [g, A] = S(""), [y, b] = S(0), E = z(), R = de(l.rules?.required) === !0, k = a.filter(
    (m) => ye(m).toLowerCase().startsWith(g.toLowerCase())
  ), v = V(
    () => k.map((m, w) => /* @__PURE__ */ t(
      Ge,
      {
        value: X(m),
        isFocused: y === w,
        children: ye(m)
      },
      X(m)
    )),
    [y, k]
  ), x = (m, w) => {
    const T = k[y];
    switch (p(!0), m.key) {
      case "Enter": {
        m.preventDefault(), d !== ne.typeaheadMulti ? A(ye(T)) : A(""), w.onChange(
          Array.isArray(w.value) ? [...w.value, X(T)] : X(T)
        ), p(!1), b(0);
        break;
      }
      case "Tab":
      case "Escape": {
        p(!1), w.onChange(void 0);
        break;
      }
      case "Backspace": {
        d === ne.typeahead && w.onChange("");
        break;
      }
      case "ArrowUp":
      case "ArrowDown": {
        m.preventDefault();
        let O = 0;
        m.key === "ArrowUp" && (y === 0 ? O = a.length - 1 : O = y - 1), m.key === "ArrowDown" && (y === a.length - 1 ? O = 0 : O = y + 1), b(O);
        break;
      }
    }
  };
  return /* @__PURE__ */ t(
    ee,
    {
      name: n,
      label: r,
      isRequired: R,
      error: L(u, n),
      labelIcon: i,
      children: /* @__PURE__ */ t(
        ae,
        {
          ...l,
          name: n,
          control: h,
          render: ({ field: m }) => /* @__PURE__ */ t(
            we,
            {
              ...c,
              onOpenChange: () => p(!1),
              selected: oe(a) ? a.filter(
                (w) => Array.isArray(m.value) ? m.value.includes(w.key) : m.value === w.key
              ).map((w) => w.value) : m.value,
              shouldFocusFirstItemOnOpen: !1,
              toggle: (w) => /* @__PURE__ */ t(
                ce,
                {
                  ref: w,
                  id: e || n.slice(n.lastIndexOf(".") + 1),
                  variant: "typeahead",
                  onClick: () => {
                    p(!f), E.current?.focus();
                  },
                  isExpanded: f,
                  isFullWidth: !0,
                  status: L(u, n) ? je.danger : void 0,
                  children: /* @__PURE__ */ C(It, { isPlain: !0, children: [
                    /* @__PURE__ */ t(
                      wt,
                      {
                        placeholder: o,
                        value: d === ne.typeahead && m.value ? oe(a) ? a.find(
                          (T) => T.key === (Array.isArray(m.value) ? m.value[0] : m.value)
                        )?.value : m.value : g,
                        onClick: () => p(!f),
                        onChange: (T, O) => {
                          A(O), s?.(O);
                        },
                        onKeyDown: (T) => x(T, m),
                        autoComplete: "off",
                        innerRef: E,
                        role: "combobox",
                        isExpanded: f,
                        "aria-controls": "select-typeahead-listbox",
                        children: d === ne.typeaheadMulti && Array.isArray(m.value) && /* @__PURE__ */ t(ze, { "aria-label": "Current selections", children: m.value.map(
                          (T, O) => /* @__PURE__ */ t(
                            Je,
                            {
                              onClick: (D) => {
                                D.stopPropagation(), m.onChange(
                                  m.value.filter(
                                    (M) => M !== X(T)
                                  )
                                );
                              },
                              children: oe(a) ? a.find((D) => T === D.key)?.value : ye(T)
                            },
                            O
                          )
                        ) })
                      }
                    ),
                    /* @__PURE__ */ t(xt, { children: (!!g || m.value) && /* @__PURE__ */ t(
                      N,
                      {
                        variant: "plain",
                        onClick: () => {
                          A(""), m.onChange(""), E?.current?.focus();
                        },
                        "aria-label": "Clear input value",
                        children: /* @__PURE__ */ t(Ft, { "aria-hidden": !0 })
                      }
                    ) })
                  ] })
                }
              ),
              onSelect: (w, T) => {
                w?.stopPropagation();
                const O = T?.toString();
                d === ne.typeaheadMulti && Array.isArray(m.value) ? m.value.includes(O) ? m.onChange(
                  m.value.filter((D) => D !== O)
                ) : m.onChange([...m.value, O]) : (m.onChange(Array.isArray(m.value) ? [O] : O), p(!1));
              },
              isOpen: f,
              children: /* @__PURE__ */ t(xe, { children: v })
            }
          )
        }
      )
    }
  );
};
var ne = /* @__PURE__ */ ((e) => (e.single = "single", e.typeahead = "typeahead", e.typeaheadMulti = "typeaheadMulti", e))(ne || {});
const oe = (e) => typeof e[0] != "string", Ze = (e) => typeof e == "string", X = (e) => Ze(e) ? e : e.key, $r = ({
  variant: e = "single",
  ...n
}) => e === "single" ? /* @__PURE__ */ t(_r, { ...n }) : /* @__PURE__ */ t(qr, { ...n, variant: e }), Wa = ({
  labelOn: e,
  stringify: n,
  defaultValue: r,
  labelIcon: a,
  ...l
}) => {
  const o = r ?? (n ? "false" : !1), { control: s } = Se();
  return /* @__PURE__ */ t(
    ee,
    {
      hasNoPaddingTop: !0,
      name: l.name,
      isRequired: l.rules?.required === !0,
      label: l.label,
      labelIcon: a,
      children: /* @__PURE__ */ t(
        ae,
        {
          control: s,
          name: l.name,
          defaultValue: o,
          render: ({ field: { onChange: d, value: c } }) => /* @__PURE__ */ t(
            cn,
            {
              ...l,
              id: l.name,
              "data-testid": l.name,
              label: e,
              isChecked: n ? c === "true" : c,
              onChange: (h, u) => {
                const f = n ? u.toString() : u;
                l.onChange?.(h, u), d(f);
              }
            }
          )
        }
      )
    }
  );
}, ja = (e) => {
  const n = !!e.rules?.required, r = e.defaultValue ?? "", { field: a, fieldState: l } = Ye({
    ...e,
    defaultValue: r
  });
  return /* @__PURE__ */ t(
    ee,
    {
      isRequired: n,
      label: e.label,
      labelIcon: e.labelIcon,
      name: e.name,
      error: l.error,
      children: /* @__PURE__ */ t(
        St,
        {
          isRequired: n,
          id: e.name,
          "data-testid": e.name,
          validated: l.error ? G.error : G.default,
          isDisabled: e.isDisabled,
          ...a
        }
      )
    }
  );
}, Ga = (e) => {
  const { labelIcon: n, helperText: r, ...a } = e, l = !!de(e.rules?.required), i = e.defaultValue ?? "", { field: o, fieldState: s } = Ye({
    ...e,
    defaultValue: i
  });
  return /* @__PURE__ */ C(
    ee,
    {
      name: e.name,
      label: e.label,
      labelIcon: n,
      isRequired: l,
      error: s.error,
      children: [
        /* @__PURE__ */ t(
          Ie,
          {
            isRequired: l,
            id: e.name,
            "data-testid": e["data-testid"] || e.name,
            validated: s.error ? G.error : G.default,
            isDisabled: e.isDisabled,
            ...a,
            ...o
          }
        ),
        r && /* @__PURE__ */ t(Ke, { children: /* @__PURE__ */ t(He, { children: /* @__PURE__ */ t(We, { children: r }) }) })
      ]
    }
  );
}, Ur = St, za = ({ icon: e }) => {
  const n = Kr(e);
  return /* @__PURE__ */ t(Le, { size: "lg", children: /* @__PURE__ */ t(n, { alt: e }) });
};
function Kr(e) {
  switch (e) {
    case "github":
      return lr;
    case "facebook":
      return ar;
    case "gitlab":
      return rr;
    case "google":
      return nr;
    case "linkedin":
    case "linkedin-openid-connect":
      return tr;
    case "openshift-v3":
    case "openshift-v4":
      return er;
    case "stackoverflow":
      return Zn;
    case "twitter":
      return Xn;
    case "microsoft":
      return Qn;
    case "bitbucket":
      return Yn;
    case "instagram":
      return Jn;
    case "paypal":
      return zn;
    default:
      return Gn;
  }
}
const Hr = "_title_180i0_2", Wr = {
  title: Hr
}, $t = ({
  id: e,
  title: n,
  headingLevel: r = "h1",
  size: a = "xl",
  ...l
}) => /* @__PURE__ */ t(
  dn,
  {
    headingLevel: r,
    size: a,
    className: Wr.title,
    id: e,
    tabIndex: 0,
    ...l,
    children: n
  }
), jr = ({
  title: e,
  children: n,
  scrollId: r,
  className: a
}) => {
  const l = Et();
  return /* @__PURE__ */ C(un, { id: l, className: a, isFlat: !0, children: [
    /* @__PURE__ */ t(hn, { className: "kc-form-panel__header", children: /* @__PURE__ */ t(pn, { tabIndex: 0, children: /* @__PURE__ */ t($t, { id: r, title: e }) }) }),
    /* @__PURE__ */ t(mn, { className: "kc-form-panel__body", children: n })
  ] });
}, Gr = (e) => {
  const { title: n, children: r, scrollId: a, ...l } = e;
  return /* @__PURE__ */ t("section", { ...l, style: { marginTop: "var(--pf-v5-global--spacer--lg)" }, children: /* @__PURE__ */ C(j, { children: [
    /* @__PURE__ */ t($t, { id: a, title: n }),
    r
  ] }) });
}, zr = "_panel_1cdve_1", Jr = "_sticky_1cdve_5", ut = {
  panel: zr,
  sticky: Jr
}, Yr = "kc-main-content-page-container", ht = (e) => e.replace(/\s+/g, "-"), Qr = ({
  label: e,
  sections: n,
  borders: r = !1,
  ...a
}) => {
  const l = V(
    () => n.filter(({ isHidden: i }) => !i),
    [n]
  );
  return /* @__PURE__ */ C(fn, { hasGutter: !0, ...a, children: [
    /* @__PURE__ */ t(it, { md: 8, sm: 12, children: l.map(({ title: i, panel: o }) => {
      const s = ht(i.toLowerCase());
      return /* @__PURE__ */ t(Rt, { children: r ? /* @__PURE__ */ t(
        jr,
        {
          scrollId: s,
          title: i,
          className: ut.panel,
          children: o
        }
      ) : /* @__PURE__ */ t(Gr, { scrollId: s, title: i, children: o }) }, i);
    }) }),
    /* @__PURE__ */ t(it, { md: 4, sm: 12, order: { default: "-1", md: "1" }, children: /* @__PURE__ */ t(gn, { className: ut.sticky, children: /* @__PURE__ */ t(
      yn,
      {
        isVertical: !0,
        scrollableSelector: `#${Yr}`,
        label: e,
        offset: 100,
        children: l.map(({ title: i }) => {
          const o = ht(i.toLowerCase());
          return (
            // note that JumpLinks currently does not work with spaces in the href
            /* @__PURE__ */ t(
              bn,
              {
                href: `#${o}`,
                "data-testid": `jump-link-${o}`,
                children: i
              },
              i
            )
          );
        })
      }
    ) }) })
  ] });
}, Xr = (e, n, r) => (e.isValid || r) && (e.isDirty || n) && !e.isLoading && !e.isValidating && !e.isSubmitting, Ja = ({
  formState: e,
  isDisabled: n = !1,
  allowInvalid: r = !1,
  allowNonDirty: a = !1,
  children: l,
  ...i
}) => /* @__PURE__ */ t(
  N,
  {
    variant: "primary",
    isDisabled: e && !Xr(e, a, r) || n,
    ...i,
    type: "submit",
    children: l
  }
), Zr = (e) => {
  try {
    return new Intl.DisplayNames([e], { type: "language" }).of(e);
  } catch {
    return e;
  }
}, ea = ({
  t: e,
  form: n,
  supportedLocales: r,
  currentLocale: a
}) => {
  const l = V(
    () => r.map((i) => ({
      key: i,
      value: e(`locale_${i}`, Zr(i) ?? i)
    })).sort((i, o) => i.value.localeCompare(o.value, a)),
    [r, a, e]
  );
  return l.length ? /* @__PURE__ */ t(ur, { ...n, children: /* @__PURE__ */ t(
    $r,
    {
      "data-testid": "locale-select",
      name: "attributes.locale",
      label: e("selectALocale"),
      controller: { defaultValue: "" },
      options: l,
      variant: l.length >= 10 ? "typeahead" : "single"
    }
  ) }) : null;
}, _e = (e) => e?.includes("${"), qe = (e) => e.substring(2, e.length - 1), Z = (e, n, r, a) => {
  const l = n || r, i = _e(l) ? qe(l) : l, o = a ? `${a}.${i}` : i;
  return e(o || "");
}, $e = (e, n) => Z(e, n.displayName, n.name), ta = ["username", "firstName", "lastName", "email"], Ut = (e) => e && ta.includes(e), J = (e) => `${Ut(e) ? "" : "attributes."}${e?.replaceAll(
  ".",
  "🍺"
)}`, Ya = (e) => e.replaceAll(".", "🍺"), Qa = (e) => e.replaceAll("🍺", ".");
function Xa(e, n, r) {
  (e.responseData.errors !== void 0 ? e.responseData.errors : [e.responseData]).forEach((a) => {
    const l = Object.assign(
      {},
      a.params?.map((i) => _e(i.toString()) ? r(qe(i)) : i)
    );
    n(J(a.field), {
      message: r(
        _e(a.errorMessage) ? qe(a.errorMessage) : a.errorMessage,
        {
          ...l,
          defaultValue: a.errorMessage || a.field
        }
      ),
      type: "server"
    });
  });
}
function Te({
  required: e,
  validators: n
}) {
  return e || na(n);
}
function na(e) {
  return e && "length" in e && "min" in e.length && typeof e.length.min == "number" ? e.length.min > 0 : !1;
}
function Za(e) {
  if (typeof e != "object" || e === null || !("responseData" in e))
    return !1;
  const { responseData: n } = e;
  return pt(n) ? !0 : typeof n != "object" || n === null || !("errors" in n) || !Array.isArray(n.errors) ? !1 : n.errors.every(pt);
}
function pt(e) {
  return !(typeof e != "object" || e === null || !("field" in e) || typeof e.field != "string" || !("errorMessage" in e) || typeof e.errorMessage != "string");
}
const ue = ({
  t: e,
  form: n,
  attribute: r,
  renderer: a,
  children: l
}) => {
  const i = Z(
    e,
    r.annotations?.inputHelperTextBefore
  ), {
    formState: { errors: o }
  } = n, s = a?.(r), d = L(o, J(r.name));
  return /* @__PURE__ */ C(
    kt,
    {
      label: $e(e, r) || "",
      fieldId: r.name,
      isRequired: Te(r),
      labelIcon: i ? /* @__PURE__ */ t(_t, { helpText: i, fieldLabelId: r.name }) : void 0,
      children: [
        s ? /* @__PURE__ */ C(ke, { children: [
          l,
          s
        ] }) : l,
        d && /* @__PURE__ */ t(
          Vt,
          {
            "data-testid": `${r.name}-helper`,
            message: d.message
          }
        )
      ]
    },
    r.name
  );
}, ra = ({
  t: e,
  form: n,
  attribute: r,
  renderer: a,
  ...l
}) => /* @__PURE__ */ t(ue, { t: e, form: n, attribute: r, renderer: a, children: /* @__PURE__ */ t(
  aa,
  {
    t: e,
    form: n,
    "aria-label": $e(e, r),
    name: J(r.name),
    addButtonLabel: e("addMultivaluedLabel", {
      fieldLabel: $e(e, r)
    }),
    ...l
  }
) }), aa = ({
  t: e,
  name: n,
  inputType: r,
  form: a,
  addButtonLabel: l,
  isDisabled: i = !1,
  defaultValue: o,
  id: s,
  ...d
}) => {
  const { register: c, setValue: h, control: u } = a, f = hr({
    name: n,
    control: u,
    defaultValue: o || ""
  }), p = V(() => Array.isArray(f) && f.length !== 0 ? f : o || [""], [f]), g = (R) => {
    b([...p.slice(0, R), ...p.slice(R + 1)]);
  }, A = () => {
    b([...p, ""]);
  }, y = (R, k) => {
    b([...p.slice(0, R), k, ...p.slice(R + 1)]);
  }, b = (R) => {
    const k = R.flatMap((v) => v);
    h(n, k, {
      shouldDirty: !0
    });
  }, E = r.startsWith("html") ? r.substring(6) : "text";
  return re(() => {
    c(n);
  }, [c]), /* @__PURE__ */ t("div", { id: s, children: p.map((R, k) => /* @__PURE__ */ C(Rt, { children: [
    /* @__PURE__ */ C(ke, { children: [
      /* @__PURE__ */ t(Ne, { isFill: !0, children: /* @__PURE__ */ t(
        Ie,
        {
          "data-testid": n + k,
          onChange: (v, x) => y(k, x),
          name: `${n}.${k}.value`,
          value: R,
          isDisabled: i,
          type: E,
          ...d
        }
      ) }),
      /* @__PURE__ */ t(Ne, { children: /* @__PURE__ */ t(
        N,
        {
          "data-testid": "remove" + k,
          variant: ve.link,
          onClick: () => g(k),
          tabIndex: -1,
          "aria-label": e("remove"),
          isDisabled: p.length === 1 || i,
          children: /* @__PURE__ */ t(ir, {})
        }
      ) })
    ] }),
    k === p.length - 1 && /* @__PURE__ */ C(
      N,
      {
        variant: ve.link,
        onClick: A,
        tabIndex: -1,
        "aria-label": e("add"),
        "data-testid": "addValue",
        isDisabled: !R || i,
        children: [
          /* @__PURE__ */ t(Pt, {}),
          " ",
          e(l || "add")
        ]
      }
    )
  ] }, k)) });
}, mt = (e) => {
  const { form: n, inputType: r, attribute: a } = e, l = Te(a), i = r.startsWith("multiselect"), o = i ? vn : Cn, s = a.validators?.options?.options || [], d = a.annotations?.inputOptionLabels || {}, c = a.annotations?.inputOptionLabelsI18nPrefix;
  return /* @__PURE__ */ t(ue, { ...e, children: /* @__PURE__ */ t(
    ae,
    {
      name: J(a.name),
      control: n.control,
      defaultValue: "",
      render: ({ field: h }) => /* @__PURE__ */ t(j, { children: s.map((u) => /* @__PURE__ */ t(
        o,
        {
          id: u,
          "data-testid": u,
          label: Z(e.t, d[u], u, c),
          value: u,
          isChecked: h.value.includes(u),
          onChange: () => {
            i ? h.value.includes(u) ? h.onChange(
              h.value.filter((f) => f !== u)
            ) : h.onChange([...h.value, u]) : h.onChange([u]);
          },
          readOnly: a.readOnly,
          isRequired: l
        },
        u
      )) })
    }
  ) });
}, la = ({
  toggleId: e,
  onToggle: n,
  onSelect: r,
  selections: a,
  isOpen: l,
  menuAppendTo: i,
  direction: o,
  width: s,
  maxHeight: d,
  toggleIcon: c,
  className: h,
  isDisabled: u,
  children: f,
  ...p
}) => {
  const [g, A] = S(!1), y = z(), b = () => {
    A(!g), n(!g);
  }, E = () => i === "parent" && y.current?.parentElement || "inline", R = Ot.toArray(
    f
  );
  return /* @__PURE__ */ t(
    we,
    {
      ref: y,
      maxMenuHeight: Ce(d),
      isScrollable: !0,
      popperProps: {
        appendTo: E(),
        direction: o,
        width: Ce(s)
      },
      ...p,
      onClick: b,
      onOpenChange: (k) => {
        k !== g && b();
      },
      selected: a,
      onSelect: (k, v) => {
        r?.(v || ""), b();
      },
      toggle: (k) => /* @__PURE__ */ t(
        ce,
        {
          id: e,
          ref: k,
          className: h,
          onClick: b,
          isExpanded: l,
          "aria-label": p["aria-label"],
          icon: c,
          isDisabled: u,
          isFullWidth: !0,
          children: R.find((v) => v.props.value === a)?.props.children || a || p["aria-label"]
        }
      ),
      isOpen: l,
      children: /* @__PURE__ */ t(xe, { children: f })
    }
  );
}, ia = ({
  toggleId: e,
  onSelect: n,
  onToggle: r,
  onFilter: a,
  variant: l,
  validated: i,
  placeholderText: o,
  maxHeight: s,
  width: d,
  toggleIcon: c,
  direction: h,
  selections: u,
  typeAheadAriaLabel: f,
  chipGroupComponent: p,
  chipGroupProps: g,
  footer: A,
  isDisabled: y,
  children: b,
  ...E
}) => {
  const [R, k] = S(""), [v, x] = S(0), m = z(), w = Ot.toArray(
    b
  ), T = () => {
    r?.(!E.isOpen);
  }, O = (D) => {
    const M = w[v];
    switch (r?.(!0), D.key) {
      case "Enter": {
        D.preventDefault(), l !== W.typeaheadMulti ? k(M.props.value) : k(""), n?.(M.props.value), r?.(!1), x(0);
        break;
      }
      case "Escape": {
        r?.(!1);
        break;
      }
      case "Backspace": {
        l === W.typeahead && n?.("");
        break;
      }
      case "ArrowUp":
      case "ArrowDown": {
        D.preventDefault();
        let B = 0;
        D.key === "ArrowUp" && (v === 0 ? B = w.length - 1 : B = v - 1), D.key === "ArrowDown" && (v === w.length - 1 ? B = 0 : B = v + 1), x(B);
        break;
      }
    }
  };
  return /* @__PURE__ */ C(
    we,
    {
      ...E,
      onClick: T,
      onOpenChange: (D) => r?.(D),
      onSelect: (D, M) => n?.(M || ""),
      maxMenuHeight: Ce(s),
      popperProps: { direction: h, width: Ce(d) },
      toggle: (D) => /* @__PURE__ */ t(
        ce,
        {
          ref: D,
          id: e,
          variant: "typeahead",
          onClick: () => r?.(!0),
          icon: c,
          isDisabled: y,
          isExpanded: E.isOpen,
          isFullWidth: !0,
          status: i === "error" ? je.danger : void 0,
          children: /* @__PURE__ */ C(It, { isPlain: !0, children: [
            /* @__PURE__ */ t(
              wt,
              {
                placeholder: o,
                value: l === W.typeahead && u ? u : R,
                onClick: T,
                onChange: (M, B) => {
                  k(B), a?.(B);
                },
                onKeyDown: (M) => O(M),
                autoComplete: "off",
                innerRef: m,
                role: "combobox",
                isExpanded: E.isOpen,
                "aria-controls": "select-typeahead-listbox",
                "aria-label": f,
                children: l === W.typeaheadMulti && Array.isArray(u) && (p || /* @__PURE__ */ t(ze, { ...g, children: u.map((M, B) => /* @__PURE__ */ t(
                  Je,
                  {
                    onClick: (Ae) => {
                      Ae.stopPropagation(), n?.(M);
                    },
                    children: M
                  },
                  B
                )) }))
              }
            ),
            /* @__PURE__ */ t(xt, { children: !!R && /* @__PURE__ */ t(
              N,
              {
                variant: "plain",
                onClick: () => {
                  n?.(""), k(""), a?.(""), m?.current?.focus();
                },
                "aria-label": "Clear input value",
                children: /* @__PURE__ */ t(Ft, { "aria-hidden": !0 })
              }
            ) })
          ] })
        }
      ),
      children: [
        /* @__PURE__ */ t(xe, { children: b }),
        A && /* @__PURE__ */ t(kn, { children: A })
      ]
    }
  );
};
var W = /* @__PURE__ */ ((e) => (e.single = "single", e.typeahead = "typeahead", e.typeaheadMulti = "typeaheadMulti", e))(W || {});
const Ce = (e) => typeof e == "number" ? e + "px" : e, oa = ({
  variant: e = "single",
  ...n
}) => e === "single" ? /* @__PURE__ */ t(la, { ...n }) : /* @__PURE__ */ t(ia, { ...n, variant: e }), ft = (e) => {
  const { t: n, form: r, inputType: a, attribute: l } = e, [i, o] = S(!1), [s, d] = S(""), c = a === "multiselect", h = (y, b) => {
    c ? b.value.includes(y) ? b.onChange(b.value.filter((E) => E !== y)) : Array.isArray(b.value) ? b.onChange([...b.value, y]) : b.onChange([y]) : b.onChange(y === b.value ? "" : y);
  }, u = l.validators?.options?.options || [], f = l.annotations?.inputOptionLabels || {}, p = l.annotations?.inputOptionLabelsI18nPrefix, g = (y) => Z(e.t, f[y], y, p), A = (y) => u.filter(
    (b) => g(b).toLowerCase().includes(s.toLowerCase())
  ).map((b) => /* @__PURE__ */ t(
    Ge,
    {
      selected: y === b,
      value: b,
      children: g(b)
    },
    b
  ));
  return /* @__PURE__ */ t(ue, { ...e, children: /* @__PURE__ */ t(
    ae,
    {
      name: J(l.name),
      defaultValue: "",
      control: r.control,
      render: ({ field: y }) => /* @__PURE__ */ t(
        oa,
        {
          toggleId: l.name,
          onToggle: (b) => o(b),
          onClear: () => h("", y),
          onSelect: (b) => {
            const E = b.toString();
            h(E, y), Array.isArray(y.value) || o(!1);
          },
          selections: c && Array.isArray(y.value) ? y.value.map((b) => g(b)) : g(y.value),
          variant: c ? W.typeaheadMulti : u.length >= 10 ? W.typeahead : W.single,
          "aria-label": n("selectOne"),
          isOpen: i,
          isDisabled: l.readOnly,
          onFilter: (b) => (d(b), A(y.value)),
          children: A(y.value)
        }
      )
    }
  ) });
}, sa = (e) => {
  const { form: n, attribute: r } = e, a = Te(r);
  return /* @__PURE__ */ t(ue, { ...e, children: /* @__PURE__ */ t(
    Ur,
    {
      id: r.name,
      "data-testid": r.name,
      ...n.register(J(r.name)),
      cols: r.annotations?.inputTypeCols,
      rows: r.annotations?.inputTypeRows,
      readOnly: r.readOnly,
      isRequired: a
    }
  ) });
}, q = (e) => {
  const { form: n, inputType: r, attribute: a } = e, l = Te(a), i = r.startsWith("html") ? r.substring(6) : "text";
  return /* @__PURE__ */ t(ue, { ...e, children: /* @__PURE__ */ t(
    Ie,
    {
      id: a.name,
      "data-testid": a.name,
      type: i,
      placeholder: a.readOnly ? "" : Z(
        e.t,
        a.annotations?.inputTypePlaceholder,
        a.name,
        a.annotations?.inputOptionLabelsI18nPrefix
      ),
      readOnly: a.readOnly,
      isRequired: l,
      ...n.register(J(a.name))
    }
  ) });
}, Ue = {
  text: q,
  textarea: sa,
  select: ft,
  "select-radiobuttons": mt,
  multiselect: ft,
  "multiselect-checkboxes": mt,
  "html5-email": q,
  "html5-tel": q,
  "html5-url": q,
  "html5-number": q,
  "html5-range": q,
  "html5-datetime-local": q,
  "html5-date": q,
  "html5-month": q,
  "html5-time": q,
  "multi-input": ra
}, el = ({
  t: e,
  form: n,
  userProfileMetadata: r,
  supportedLocales: a,
  currentLocale: l,
  hideReadOnly: i = !1,
  renderer: o
}) => {
  const s = V(() => {
    if (!r.attributes)
      return [];
    const d = i ? r.attributes.filter(({ readOnly: c }) => !c) : r.attributes;
    return [
      // Insert an empty group for attributes without a group.
      { name: void 0 },
      ...r.groups ?? []
    ].map((c) => ({
      group: c,
      attributes: d.filter(
        (h) => h.group === c.name
      )
    }));
  }, [
    i,
    r.groups,
    r.attributes
  ]);
  return s.length === 0 ? null : /* @__PURE__ */ t(
    Qr,
    {
      label: e("jumpToSection"),
      sections: s.filter((d) => d.attributes.length > 0).map(({ group: d, attributes: c }) => ({
        title: Z(e, d.displayHeader, d.name) || e("general"),
        panel: /* @__PURE__ */ C("div", { className: "pf-v5-c-form", children: [
          d.displayDescription && /* @__PURE__ */ t(Me, { className: "pf-v5-u-pb-lg", children: Z(e, d.displayDescription, "") }),
          c.map((h) => /* @__PURE__ */ t(
            ca,
            {
              t: e,
              form: n,
              supportedLocales: a,
              currentLocale: l,
              renderer: o,
              attribute: h
            },
            h.name
          ))
        ] })
      }))
    }
  );
}, ca = ({
  t: e,
  form: n,
  renderer: r,
  supportedLocales: a,
  currentLocale: l,
  attribute: i
}) => {
  const o = n.watch(
    J(i.name)
  ), s = V(() => ua(i), [i]), d = i.multivalued || pa(o) && i.annotations?.inputType === void 0 ? Ue["multi-input"] : Ue[s];
  return i.name === "locale" ? /* @__PURE__ */ t(
    ea,
    {
      form: n,
      supportedLocales: a,
      currentLocale: l,
      t: e,
      attribute: i
    }
  ) : /* @__PURE__ */ t(
    d,
    {
      t: e,
      form: n,
      inputType: s,
      attribute: i,
      renderer: r
    }
  );
}, da = "text";
function ua(e) {
  if (Ut(e.name))
    return "text";
  const n = e.annotations?.inputType;
  return ha(n) ? n : da;
}
const ha = (e) => typeof e == "string" && e in Ue, pa = (e) => Array.isArray(e) && e.length > 1, ma = ({
  className: e = "",
  border: n,
  size: r = "md"
}) => /* @__PURE__ */ C(
  "svg",
  {
    className: fr(
      fe.avatar,
      fe.modifiers[r],
      n === "light" && fe.modifiers.light,
      n === "dark" && fe.modifiers.dark,
      e
    ),
    enableBackground: "new 0 0 36 36",
    version: "1.1",
    viewBox: "0 0 36 36",
    xmlns: "http://www.w3.org/2000/svg",
    children: [
      /* @__PURE__ */ t(
        "circle",
        {
          style: { fillRule: "evenodd", clipRule: "evenodd", fill: "#FFFFFF" },
          cx: "18",
          cy: "18.5",
          r: "18"
        }
      ),
      /* @__PURE__ */ t("defs", { children: /* @__PURE__ */ t(
        "filter",
        {
          id: "b",
          x: "5.2",
          y: "7.2",
          width: "25.6",
          height: "53.6",
          filterUnits: "userSpaceOnUse",
          children: /* @__PURE__ */ t("feColorMatrix", { values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" })
        }
      ) }),
      /* @__PURE__ */ t(
        "mask",
        {
          id: "a",
          x: "5.2",
          y: "7.2",
          width: "25.6",
          height: "53.6",
          maskUnits: "userSpaceOnUse",
          children: /* @__PURE__ */ t("g", { style: { filter: 'url("#b")' }, children: /* @__PURE__ */ t(
            "circle",
            {
              style: { fillRule: "evenodd", clipRule: "evenodd", fill: "#FFFFFF" },
              cx: "18",
              cy: "18.5",
              r: "18"
            }
          ) })
        }
      ),
      /* @__PURE__ */ t("g", { style: { filter: 'url("#a")' }, children: /* @__PURE__ */ C("g", { transform: "translate(5.04 6.88)", children: [
        /* @__PURE__ */ t(
          "path",
          {
            style: {
              fillRule: "evenodd",
              clipRule: "evenodd",
              fill: "#BBBBBB"
            },
            d: "m22.6 18.1c-1.1-1.4-2.3-2.2-3.5-2.6s-1.8-0.6-6.3-0.6-6.1 0.7-6.1 0.7 0 0 0 0c-1.2 0.4-2.4 1.2-3.4 2.6-2.3 2.8-3.2 12.3-3.2 14.8 0 3.2 0.4 12.3 0.6 15.4 0 0-0.4 5.5 4 5.5l-0.3-6.3-0.4-3.5 0.2-0.9c0.9 0.4 3.6 1.2 8.6 1.2 5.3 0 8-0.9 8.8-1.3l0.2 1-0.2 3.6-0.3 6.3c3 0.1 3.7-3 3.8-4.4s0.6-12.6 0.6-16.5c0.1-2.6-0.8-12.1-3.1-15z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            style: {
              opacity: 0.1,
              fillRule: "evenodd",
              clipRule: "evenodd"
            },
            d: "m22.5 26c-0.1-2.1-1.5-2.8-4.8-2.8l2.2 9.6s1.8-1.7 3-1.8c0 0-0.4-4.6-0.4-5z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            style: {
              fillRule: "evenodd",
              clipRule: "evenodd",
              fill: "#BBBBBB"
            },
            d: "m12.7 13.2c-3.5 0-6.4-2.9-6.4-6.4s2.9-6.4 6.4-6.4 6.4 2.9 6.4 6.4-2.8 6.4-6.4 6.4z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            style: {
              opacity: 0.08,
              fillRule: "evenodd",
              clipRule: "evenodd",
              fill: "#231F20"
            },
            d: "m9.4 6.8c0-3 2.1-5.5 4.9-6.3-0.5-0.1-1-0.2-1.6-0.2-3.5 0-6.4 2.9-6.4 6.4s2.9 6.4 6.4 6.4c0.6 0 1.1-0.1 1.6-0.2-2.8-0.6-4.9-3.1-4.9-6.1z"
          }
        ),
        /* @__PURE__ */ t(
          "path",
          {
            style: {
              opacity: 0.1,
              fillRule: "evenodd",
              clipRule: "evenodd"
            },
            d: "m8.3 22.4c-2 0.4-2.9 1.4-3.1 3.5l-0.6 18.6s1.7 0.7 3.6 0.9l0.1-23z"
          }
        )
      ] }) })
    ]
  }
), gt = ({
  isKebab: e = !1,
  title: n,
  dropDownItems: r,
  ...a
}) => {
  const [l, i] = S(!1);
  return /* @__PURE__ */ t(
    In,
    {
      ...a,
      popperProps: {
        position: "right"
      },
      onOpenChange: (o) => i(o),
      toggle: (o) => /* @__PURE__ */ t(
        ce,
        {
          "data-testid": `${a["data-testid"]}-toggle`,
          ref: o,
          onClick: () => i(!l),
          isExpanded: l,
          variant: e ? "plain" : "default",
          children: e ? /* @__PURE__ */ t(or, {}) : n
        }
      ),
      isOpen: l,
      children: /* @__PURE__ */ t(wn, { children: r })
    }
  );
};
function fa(e, n) {
  if (!e)
    return n("unknownUser");
  const r = e.given_name, a = e.family_name, l = e.preferred_username;
  return r && a ? n("fullName", { givenName: r, familyName: a }) : r || a || l || n("unknownUser");
}
const tl = ({
  keycloak: e,
  brand: { src: n, alt: r, className: a, ...l },
  avatar: i,
  features: {
    hasLogout: o = !0,
    hasManageAccount: s = !0,
    hasUsername: d = !0
  } = {},
  kebabDropdownItems: c,
  dropdownItems: h = [],
  toolbarItems: u,
  ...f
}) => {
  const { t: p } = _(), g = [];
  s && g.push(
    /* @__PURE__ */ t(
      ot,
      {
        onClick: () => e.accountManagement(),
        children: p("manageAccount")
      },
      "manageAccount"
    )
  ), o && g.push(
    /* @__PURE__ */ t(ot, { onClick: () => e.logout(), children: p("signOut") }, "signOut")
  );
  const A = e.idTokenParsed?.picture;
  return /* @__PURE__ */ C(xn, { ...f, children: [
    /* @__PURE__ */ t(Sn, { children: /* @__PURE__ */ t(Tn, { variant: "plain", "aria-label": p("navigation"), children: /* @__PURE__ */ t(sr, {}) }) }),
    /* @__PURE__ */ t(An, { ...l, children: /* @__PURE__ */ t("img", { src: n, alt: r, className: a }) }),
    /* @__PURE__ */ t(En, { children: /* @__PURE__ */ t(be, { children: /* @__PURE__ */ C(Be, { children: [
      u?.map((y, b) => /* @__PURE__ */ t(U, { align: { default: "alignRight" }, children: y }, b)),
      /* @__PURE__ */ t(
        U,
        {
          visibility: {
            default: "hidden",
            md: "visible"
          },
          children: /* @__PURE__ */ t(
            gt,
            {
              "data-testid": "options",
              dropDownItems: [...h, g],
              title: d ? fa(e.idTokenParsed, p) : void 0
            }
          )
        }
      ),
      /* @__PURE__ */ t(
        U,
        {
          align: { default: "alignLeft" },
          visibility: {
            md: "hidden"
          },
          children: /* @__PURE__ */ t(
            gt,
            {
              "data-testid": "options-kebab",
              isKebab: !0,
              dropDownItems: [
                ...c || h,
                g
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ t(
        U,
        {
          variant: "overflow-menu",
          align: { default: "alignRight" },
          className: "pf-v5-u-m-0-on-lg",
          children: A || i?.src ? /* @__PURE__ */ t(Rn, { src: A, alt: p("avatar"), ...i }) : /* @__PURE__ */ t(ma, { ...i })
        }
      )
    ] }) }) })
  ] });
}, Kt = Qe("ErrorBoundaryContext", void 0), Ht = () => Xe(Kt);
class nl extends $n {
  state = {};
  static getDerivedStateFromError = (n) => ({ error: n });
  showBoundary = (n) => {
    this.setState({ error: n });
  };
  render() {
    return /* @__PURE__ */ t(
      Kt.Provider,
      {
        value: { error: this.state.error, showBoundary: this.showBoundary },
        children: this.props.children
      }
    );
  }
}
const rl = ({ children: e, fallback: n }) => {
  const { error: r } = Ht();
  return r ? /* @__PURE__ */ t(n, { error: r }) : e;
};
function ga(e, n, r) {
  const { showBoundary: a } = Ht();
  re(() => {
    const l = new AbortController(), { signal: i } = l;
    return e().then((o) => {
      i.aborted || n(o);
    }).catch((o) => {
      console.error(o), i.aborted || a(o);
    }), () => l.abort();
  }, r);
}
const ya = () => {
  const { t: e } = _();
  return /* @__PURE__ */ t(On, { children: /* @__PURE__ */ t(Ct, { "aria-label": e("spinnerLoading") }) });
}, ba = ({
  message: e,
  instructions: n,
  onPrimaryAction: r,
  hasIcon: a = !0,
  isSearchVariant: l,
  primaryActionText: i,
  secondaryActions: o,
  icon: s,
  isDisabled: d = !1
}) => /* @__PURE__ */ C(Dn, { "data-testid": "empty-state", variant: "lg", children: [
  a && l ? /* @__PURE__ */ t(st, { icon: cr }) : a && /* @__PURE__ */ t(st, { icon: s || Pt }),
  /* @__PURE__ */ t(Fn, { titleText: e, headingLevel: "h1" }),
  /* @__PURE__ */ t(Pn, { children: n }),
  /* @__PURE__ */ C(Mn, { children: [
    i && /* @__PURE__ */ t(
      N,
      {
        "data-testid": `${e.replace(/\W+/g, "-").toLowerCase()}-empty-action`,
        variant: "primary",
        onClick: r,
        isDisabled: d,
        children: i
      }
    ),
    o && /* @__PURE__ */ t(Ln, { children: o.map((c) => /* @__PURE__ */ t(
      N,
      {
        "data-testid": `${c.text.replace(/\W+/g, "-").toLowerCase()}-empty-action`,
        variant: c.type || ve.secondary,
        onClick: c.onClick,
        isDisabled: d,
        children: c.text
      },
      c.text
    )) })
  ] })
] }), va = ({
  toolbarItem: e,
  subToolbar: n,
  toolbarItemFooter: r,
  children: a,
  searchTypeComponent: l,
  inputGroupName: i,
  inputGroupPlaceholder: o,
  inputGroupOnEnter: s
}) => {
  const { t: d } = _(), [c, h] = S(""), u = (p) => {
    h(p.trim()), s?.(p.trim());
  }, f = (p) => {
    p.key === "Enter" && u(c);
  };
  return /* @__PURE__ */ C(j, { children: [
    /* @__PURE__ */ t(be, { children: /* @__PURE__ */ C(Be, { children: [
      i && /* @__PURE__ */ t(U, { children: /* @__PURE__ */ C(ke, { "data-testid": i, children: [
        l,
        o && /* @__PURE__ */ t(
          Nn,
          {
            "data-testid": "table-search-input",
            placeholder: o,
            "aria-label": d("search"),
            value: c,
            onChange: (p, g) => {
              h(g);
            },
            onSearch: () => u(c),
            onKeyDown: f,
            onClear: () => u("")
          }
        )
      ] }) }),
      e
    ] }) }),
    n && /* @__PURE__ */ t(be, { children: /* @__PURE__ */ t(Be, { children: n }) }),
    /* @__PURE__ */ t(Bn, {}),
    a,
    /* @__PURE__ */ t(be, { children: r })
  ] });
}, yt = ({
  id: e,
  variant: n = "top",
  count: r,
  first: a,
  max: l,
  onNextClick: i,
  onPreviousClick: o,
  onPerPageSelect: s
}) => {
  const { t: d } = _(), c = Math.round(a / l);
  return /* @__PURE__ */ t(
    Vn,
    {
      widgetId: e,
      titles: {
        paginationAriaLabel: `${d("pagination")} ${n} `
      },
      isCompact: !0,
      toggleTemplate: ({
        firstIndex: h,
        lastIndex: u
      }) => /* @__PURE__ */ C("b", { children: [
        h,
        " - ",
        u
      ] }),
      itemCount: r + c * l,
      page: c + 1,
      perPage: l,
      onNextClick: (h, u) => i((u - 1) * l),
      onPreviousClick: (h, u) => o((u - 1) * l),
      onPerPageSelect: (h, u, f) => s(f - 1, u),
      variant: n
    }
  );
}, Ca = ({
  count: e,
  searchTypeComponent: n,
  toolbarItem: r,
  subToolbar: a,
  children: l,
  inputGroupName: i,
  inputGroupPlaceholder: o,
  inputGroupOnEnter: s,
  ...d
}) => /* @__PURE__ */ t(
  va,
  {
    searchTypeComponent: n,
    toolbarItem: /* @__PURE__ */ C(j, { children: [
      r,
      /* @__PURE__ */ t(U, { variant: "pagination", children: /* @__PURE__ */ t(yt, { count: e, ...d }) })
    ] }),
    subToolbar: a,
    toolbarItemFooter: e !== 0 ? /* @__PURE__ */ t(U, { variant: "pagination", children: /* @__PURE__ */ t(yt, { count: e, variant: "bottom", ...d }) }) : null,
    inputGroupName: i,
    inputGroupPlaceholder: o,
    inputGroupOnEnter: s,
    children: l
  }
), Wt = (e) => !!e && e.title !== void 0, bt = ({ row: e }) => e.cells.map((n, r) => /* @__PURE__ */ t(te, { children: Wt(n) ? n.title : n }, `cell-${r}`)), ka = ({ row: e }) => e.cells.map((n, r) => /* @__PURE__ */ t("div", { children: Wt(n) ? n.title : n }, `cell-${r}`));
function Ia({
  columns: e,
  rows: n,
  actions: r,
  actionResolver: a,
  ariaLabelKey: l,
  selected: i,
  onSelect: o,
  onCollapse: s,
  canSelectAll: d,
  canSelect: c,
  isNotCompact: h,
  isRadio: u,
  ...f
}) {
  const { t: p } = _(), [g, A] = S(i || []), [y, b] = S([]), E = V(
    () => pr(
      g,
      n.map((v) => v.data),
      "id"
    ),
    [g, n]
  );
  re(() => {
    if (d) {
      const v = document.getElementsByName("check-all").item(0);
      if (v) {
        const x = v;
        x.indeterminate = E.length < n.length && E.length > 0;
      }
    }
  }, [g, d, n]);
  const R = (v) => {
    A(v), o?.(v);
  }, k = (v, x) => {
    if (v === -1) {
      const m = E.map((w) => L(w, "id"));
      R(
        x ? [...g, ...n.map((w) => w.data)] : g.filter(
          (w) => !m.includes(L(w, "id"))
        )
      );
    } else
      R(x ? [...g, n[v].data] : g.filter(
        (m) => L(m, "id") !== n[v].data.id
      ));
  };
  return /* @__PURE__ */ C(
    gr,
    {
      ...f,
      variant: h ? void 0 : yr.compact,
      "aria-label": p(l),
      children: [
        /* @__PURE__ */ t(br, { children: /* @__PURE__ */ C(ge, { children: [
          s && /* @__PURE__ */ t(De, { screenReaderText: p("expandRow") }),
          d && /* @__PURE__ */ t(
            De,
            {
              screenReaderText: p("selectAll"),
              select: u ? void 0 : {
                onSelect: (v, x) => {
                  k(-1, x);
                },
                isSelected: E.length === n.length
              }
            }
          ),
          e.map((v) => /* @__PURE__ */ t(
            De,
            {
              screenReaderText: p("expandRow"),
              className: v.transforms?.[0]().className,
              children: p(v.displayKey || v.name)
            },
            v.displayKey || v.name
          ))
        ] }) }),
        s ? n.map((v, x) => /* @__PURE__ */ t(dt, { children: x % 2 === 0 ? /* @__PURE__ */ C(ge, { children: [
          /* @__PURE__ */ t(
            te,
            {
              expand: {
                isExpanded: !!y[x],
                rowIndex: x,
                expandId: `${x}`,
                onToggle: (m, w, T) => {
                  s(T, w);
                  const O = [...y];
                  O[x] = T, b(O);
                }
              }
            }
          ),
          /* @__PURE__ */ t(bt, { row: v })
        ] }) : /* @__PURE__ */ C(ge, { isExpanded: !!y[x - 1], children: [
          /* @__PURE__ */ t(te, {}),
          /* @__PURE__ */ t(te, { colSpan: e.length, children: /* @__PURE__ */ t(Cr, { children: /* @__PURE__ */ t(ka, { row: v }) }) })
        ] }) }, x)) : /* @__PURE__ */ t(dt, { children: n.map((v, x) => /* @__PURE__ */ C(ge, { isExpanded: y[x], children: [
          c && /* @__PURE__ */ t(
            te,
            {
              select: {
                rowIndex: x,
                onSelect: (m, w, T) => {
                  k(T, w);
                },
                isSelected: !!g.find(
                  (m) => L(m, "id") === v.data.id
                ),
                variant: u ? "radio" : "checkbox"
              }
            }
          ),
          /* @__PURE__ */ t(bt, { row: v }),
          (r || a) && /* @__PURE__ */ t(te, { isActionCell: !0, children: /* @__PURE__ */ t(
            vr,
            {
              items: r || a?.(v, {}),
              extraData: { rowIndex: x }
            }
          ) })
        ] }, x)) })
      ]
    }
  );
}
function wa({
  ariaLabelKey: e,
  searchPlaceholderKey: n,
  isPaginated: r = !1,
  onSelect: a,
  canSelectAll: l = !1,
  isNotCompact: i,
  isRadio: o,
  detailColumns: s,
  isRowDisabled: d,
  loader: c,
  columns: h,
  actions: u,
  actionResolver: f,
  searchTypeComponent: p,
  toolbarItem: g,
  subToolbar: A,
  emptyState: y,
  icon: b,
  isSearching: E = !1,
  ...R
}) {
  const { t: k } = _(), [v, x] = S([]), [m, w] = S(), [T, O] = S(), [D, M] = S(!1), [B, Ae] = Nt(
    localStorage,
    "pageSize",
    10
  ), [K, jt] = S(B), [$, le] = S(0), [H, Ee] = S(""), et = z(), [he, Gt] = S(0), tt = z(), nt = () => Gt(he + 1), zt = Et(), rt = (I, F) => I.map((P) => {
    if ("cellFormatters" in P) {
      const Q = L(F, P.name);
      return P.cellFormatters?.reduce((ie, me) => me(ie), Q);
    }
    if (P.cellRenderer) {
      const Q = P.cellRenderer;
      return { title: /* @__PURE__ */ t(Q, { ...F }) };
    }
    return L(F, P.name);
  }), at = (I) => {
    const F = (P) => s?.[0]?.enabled?.(P);
    return I.map((P, Q) => {
      const ie = d ? d(P) : !1, me = [
        {
          data: P,
          disableSelection: ie,
          disableActions: ie,
          selected: !!v.find((Zt) => L(Zt, "id") === L(P, "id")),
          isOpen: F(P) ? !1 : void 0,
          cells: rt(h, P)
        }
      ];
      return s && me.push({
        parent: Q * 2,
        cells: F(P) ? rt(s, P) : []
      }), me;
    }).flat();
  }, Re = (I) => ["string", "number"].includes(typeof I) ? I.toString() : I instanceof Array ? I.map(Re).join("") : typeof I == "object" ? Re(
    Un(I.title) ? I.title.props : Object.values(I)
  ) : "", lt = V(
    () => H === "" || r ? void 0 : at(T || []).filter(
      (I) => I.cells.some(
        (F) => F && Re(F).toLowerCase().includes(H.toLowerCase())
      )
    ).slice($, $ + K + 1),
    [H, $, K]
  );
  ga(
    async () => {
      M(!0);
      const I = et.current === "" && H !== "";
      return I && le(0), et.current = H, typeof c == "function" ? he === tt.current && T ? T : await c(I ? 0 : $, K + 1, H) : c;
    },
    (I) => {
      tt.current = he, r || (O(I), I.length > $ ? I = I.slice($, $ + K + 1) : le(0));
      const F = at(I);
      w(F), M(!1);
    },
    [
      he,
      $,
      K,
      H,
      typeof c != "function" ? c : void 0
    ]
  );
  const Jt = () => u && mr(u).map((I, F) => (delete I.onRowClick, I.onClick = async (P, Q) => {
    await u[F].onRowClick(
      (lt || m)[Q].data
    ) && (r || Ee(""), nt());
  }, I)), Yt = (I, F) => {
    Y[F].isOpen = I, w([...Y]);
  }, Y = lt || m, pe = !Y || Y.length === 0, Oe = H !== "" || E, Qt = s ? K * 2 : K, Xt = s ? (Y?.length || 0) / 2 : Y?.length || 0;
  return /* @__PURE__ */ C(j, { children: [
    (D || !pe || Oe) && /* @__PURE__ */ C(
      Ca,
      {
        id: zt,
        count: Xt,
        first: $,
        max: K,
        onNextClick: le,
        onPreviousClick: le,
        onPerPageSelect: (I, F) => {
          le(I), jt(F), Ae(F);
        },
        inputGroupName: n ? `${e}input` : void 0,
        inputGroupOnEnter: Ee,
        inputGroupPlaceholder: k(n || ""),
        searchTypeComponent: p,
        toolbarItem: /* @__PURE__ */ C(j, { children: [
          g,
          " ",
          /* @__PURE__ */ t(U, { variant: "separator" }),
          " ",
          /* @__PURE__ */ t(U, { children: /* @__PURE__ */ C(N, { variant: "link", onClick: nt, children: [
            /* @__PURE__ */ t(dr, {}),
            " ",
            k("refresh")
          ] }) })
        ] }),
        subToolbar: A,
        children: [
          !D && !pe && /* @__PURE__ */ t(
            Ia,
            {
              ...R,
              canSelectAll: l,
              canSelect: !!a,
              selected: v,
              onSelect: (I) => {
                x(I), a?.(I);
              },
              onCollapse: s ? Yt : void 0,
              actions: Jt(),
              actionResolver: f,
              rows: Y.slice(0, Qt),
              columns: h,
              isNotCompact: i,
              isRadio: o,
              ariaLabelKey: e
            }
          ),
          !D && pe && Oe && /* @__PURE__ */ t(
            ba,
            {
              hasIcon: !0,
              icon: b,
              isSearchVariant: !0,
              message: k("noSearchResults"),
              instructions: k("noSearchResultsInstructions"),
              secondaryActions: E ? [] : [
                {
                  text: k("clearAllFilters"),
                  onClick: () => Ee(""),
                  type: ve.link
                }
              ]
            }
          ),
          D && /* @__PURE__ */ t(ya, {})
        ]
      }
    ),
    !D && pe && !Oe && y
  ] });
}
const xa = ({ link: e, organization: n }) => {
  const { t: r } = _();
  return /* @__PURE__ */ t(kr, { wrapModifier: "truncate", children: /* @__PURE__ */ C(e, { organization: n, children: [
    n.name,
    !n.enabled && /* @__PURE__ */ t(
      _n,
      {
        isRead: !0,
        className: "pf-v5-u-ml-sm",
        children: r("disabled")
      },
      `${n.id}-disabled`
    )
  ] }) });
}, Sa = (e) => {
  const { t: n } = _();
  return /* @__PURE__ */ t(
    ze,
    {
      numChips: 2,
      expandedText: n("hide"),
      collapsedText: n("showRemaining"),
      children: e.domains?.map((r) => {
        const a = typeof r == "string" ? r : r.name;
        return /* @__PURE__ */ t(Je, { isReadOnly: !0, children: a }, a);
      })
    }
  );
}, al = ({
  loader: e,
  toolbarItem: n,
  isPaginated: r = !1,
  isSearching: a = !1,
  onSelect: l,
  onDelete: i,
  deleteLabel: o = "delete",
  link: s,
  children: d
}) => {
  const { t: c } = _();
  return /* @__PURE__ */ t(
    wa,
    {
      loader: e,
      isPaginated: r,
      isSearching: a,
      ariaLabelKey: "organizationList",
      toolbarItem: n,
      onSelect: l,
      canSelectAll: l !== void 0,
      actions: i ? [
        {
          title: c(o),
          onRowClick: i
        }
      ] : void 0,
      columns: [
        {
          name: "name",
          displayKey: "name",
          cellRenderer: (h) => /* @__PURE__ */ t(xa, { link: s, organization: h })
        },
        {
          name: "domains",
          displayKey: "domains",
          cellRenderer: Sa
        },
        {
          name: "description",
          displayKey: "description"
        },
        {
          name: "membershipType",
          displayKey: "membershipType"
        }
      ],
      emptyState: d
    }
  );
};
export {
  Dr as AlertProvider,
  Ua as ContinueCancelModal,
  rl as ErrorBoundaryFallback,
  nl as ErrorBoundaryProvider,
  Fr as ErrorPage,
  Vt as FormErrorText,
  jr as FormPanel,
  Ja as FormSubmitButton,
  Nr as Help,
  _t as HelpItem,
  za as IconMapper,
  wa as KeycloakDataTable,
  tl as KeycloakMasthead,
  qa as KeycloakProvider,
  oa as KeycloakSelect,
  ya as KeycloakSpinner,
  Ur as KeycloakTextArea,
  ba as ListEmptyState,
  Ka as NumberControl,
  al as OrganizationTable,
  Ca as PaginatingTableToolbar,
  Ha as PasswordControl,
  qt as PasswordInput,
  Qr as ScrollForm,
  $r as SelectControl,
  ne as SelectVariant,
  Wa as SwitchControl,
  va as TableToolbar,
  ja as TextAreaControl,
  Ga as TextControl,
  el as UserProfileFields,
  Ya as beerify,
  Qe as createNamedContext,
  Qa as debeerify,
  Tr as generateId,
  xr as getErrorDescription,
  wr as getErrorMessage,
  $a as getInjectedEnvironment,
  Mt as getNetworkErrorDescription,
  Sr as getNetworkErrorMessage,
  Ar as isDefined,
  Za as isUserProfileError,
  Z as label,
  Yr as mainPageContentId,
  Xa as setUserProfileServerError,
  Va as useAlerts,
  _a as useEnvironment,
  Ht as useErrorBoundary,
  ga as useFetch,
  Lr as useHelp,
  Xe as useRequiredContext,
  Er as useSetTimeout,
  Nt as useStoredState
};
