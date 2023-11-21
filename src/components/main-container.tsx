import { ThemeSelect } from "@components/theme-select";
import { useStore } from "@nanostores/react";
import { theme } from "@data/store";

const MainContainer = ({ children, ...props }: React.PropsWithChildren) => {
  const $theme = useStore(theme);
  // darkgray bg-mainBackground
  return (
    <div
      {...props}
      className={`${$theme}
    transition-colors w-[100vw] h-[100vh] flex items-center  justify-between flex-col bg-mainBackground font-nunito text-lg
    `}
    >
      {children}

      <ThemeSelect />
    </div>
  );
};

export default MainContainer;
