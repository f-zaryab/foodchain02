// lib
import { useState } from "react";
import { Link } from "react-router-dom";
import { FloatingIndicator, Tabs } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
// src
import Signup from "../../components/Signup";
import Login from "../../components/Login";
// styles
import classes from "./LoingPage.module.css";

const LoginPage = () => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>("1");
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <section className={classes.layout} id="login-signup-section">
      <div className={classes.backBtnContainer}>
        <Link to="/" className={classes.linkStyles}>
          <IconArrowLeft
            style={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
            }}
          />
          Go Back to home
        </Link>
      </div>

      <div className={classes.formSection}>
        <Tabs variant="none" value={value} onChange={setValue}>
          <Tabs.List ref={setRootRef} className={classes.list}>
            <Tabs.Tab
              value="1"
              ref={setControlRef("1")}
              className={classes.tab}
            >
              Signup
            </Tabs.Tab>
            <Tabs.Tab
              value="2"
              ref={setControlRef("2")}
              className={classes.tab}
            >
              Login
            </Tabs.Tab>

            <FloatingIndicator
              target={value ? controlsRefs[value] : null}
              parent={rootRef}
              className={classes.indicator}
            />
          </Tabs.List>

          <Tabs.Panel value="1">
            <Signup />
          </Tabs.Panel>
          <Tabs.Panel value="2">
            <Login />
          </Tabs.Panel>
        </Tabs>
      </div>
      <div id="image" className={classes.sideGradient} />
    </section>
  );
};

export default LoginPage;
