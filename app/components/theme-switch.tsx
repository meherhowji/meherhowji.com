import React from "react";
import { useTheme } from "next-themes";
import css from "@/styles/component-css/theme-switch.module.scss";

const ThemeSwitch: React.FC = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  return (
    <label className={css.dayNight}>
      <input
        type="checkbox"
        defaultChecked={theme === "dark" || systemTheme === "dark"}
        onClick={() => {
          if (theme === "system") {
            systemTheme === "light" ? setTheme("dark") : setTheme("light");
          } else {
            theme === "light" ? setTheme("dark") : setTheme("light");
          }
        }}
      />
      <div />
    </label>
  );
};

export default ThemeSwitch;
