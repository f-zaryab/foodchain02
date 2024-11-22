import { useState } from "react";
import { FloatingIndicator, Tabs } from "@mantine/core";
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
    <section className={classes.layout}>
      <Tabs variant="none" value={value} onChange={setValue}>
        <Tabs.List ref={setRootRef} className={classes.list}>
          <Tabs.Tab value="1" ref={setControlRef("1")} className={classes.tab}>
            Signup
          </Tabs.Tab>
          <Tabs.Tab value="2" ref={setControlRef("2")} className={classes.tab}>
            Login
          </Tabs.Tab>

          <FloatingIndicator
            target={value ? controlsRefs[value] : null}
            parent={rootRef}
            className={classes.indicator}
          />
        </Tabs.List>

        <Tabs.Panel value="1">Sign up form here</Tabs.Panel>
        <Tabs.Panel value="2">login form here</Tabs.Panel>
      </Tabs>
      <div id='image'>
      dcsa
      </div>
    </section>
  );
};

export default LoginPage;
